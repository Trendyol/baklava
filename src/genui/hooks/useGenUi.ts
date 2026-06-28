import { useEffect, useReducer, useRef } from "react";
import type { GenUiEngine } from "../GenUiEngine";
import type { ComponentSchema } from "../parser/ComponentSchema";

type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; schema: ComponentSchema }
  | { status: "error"; error: Error };

type Action =
  | { type: "LOAD" }
  | { type: "SUCCESS"; schema: ComponentSchema }
  | { type: "ERROR"; error: Error };

function reducer(_: State, action: Action): State {
  switch (action.type) {
    case "LOAD":   return { status: "loading" };
    case "SUCCESS": return { status: "success", schema: action.schema };
    case "ERROR":   return { status: "error", error: action.error };
  }
}

/**
 * React hook — GenUiEngine'i React state lifecycle'ına bağlar.
 * Prompt veya engine değiştiğinde yeni bir LLM çağrısı tetiklenir.
 */
export function useGenUi(engine: GenUiEngine, prompt: string) {
  const [state, dispatch] = useReducer(reducer, { status: "idle" });
  // StrictMode double-invoke'a karşı abort flag
  const abortedRef = useRef(false);

  useEffect(() => {
    abortedRef.current = false;
    dispatch({ type: "LOAD" });

    engine
      .generate(prompt)
      .then((schema) => {
        if (!abortedRef.current) dispatch({ type: "SUCCESS", schema });
      })
      .catch((err: unknown) => {
        if (!abortedRef.current)
          dispatch({ type: "ERROR", error: err instanceof Error ? err : new Error(String(err)) });
      });

    return () => {
      abortedRef.current = true;
    };
  }, [engine, prompt]);

  return state;
}
