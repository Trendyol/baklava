/** @jsx React.createElement */
import React from "react";
import { useGenUi } from "./hooks/useGenUi";
import { DynamicRenderer } from "./renderer/DynamicRenderer";
import { ComponentRegistry } from "./registry/ComponentRegistry";
import { defaultBuilders } from "./registry/defaultBuilders";
import type { GenUiEngine } from "./GenUiEngine";

// Singleton registry — defaultBuilders ile önceden dolu.
// Uygulama başlarken .register() ile genişletilebilir.
export const baklavaRegistry = new ComponentRegistry();
Object.entries(defaultBuilders).forEach(([type, builder]) =>
  baklavaRegistry.register(type, builder),
);

const defaultRenderer = new DynamicRenderer(baklavaRegistry);

export interface GenUiViewProps {
  engine: GenUiEngine;
  prompt: string;
  /** Özel registry kullanmak isteyenler için */
  renderer?: DynamicRenderer;
  loadingSlot?: React.ReactNode;
  errorSlot?: (error: Error) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Kullanıma hazır React bileşeni.
 *
 * ```tsx
 * <GenUiView
 *   engine={new GenUiEngine(new OpenRouterAdapter({ apiKey: "..." }))}
 *   prompt="Build a login form with email and password"
 * />
 * ```
 */
export const GenUiView: React.FC<GenUiViewProps> = ({
  engine,
  prompt,
  renderer = defaultRenderer,
  loadingSlot,
  errorSlot,
  className,
  style,
}) => {
  const state = useGenUi(engine, prompt);

  return (
    <div className={className} style={style}>
      {state.status === "idle" && null}
      {state.status === "loading" &&
        (loadingSlot ?? (
          <div style={{ display: "flex", justifyContent: "center", padding: 24 }}>
            <bl-spinner />
          </div>
        ))}
      {state.status === "error" &&
        (errorSlot?.(state.error) ?? (
          <bl-alert variant="error" description={state.error.message} />
        ))}
      {state.status === "success" && renderer.render(state.schema)}
    </div>
  );
};
