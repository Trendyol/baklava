import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join as pathJoin } from "node:path";
import { pascalCase } from "pascal-case";
import { format } from "prettier";
import { resolveFilePath } from "./utils/resolveFilePath.js";
import { resolveParsedType } from "./utils/resolveParsedType.js";

const prettierConfig = JSON.parse(readFileSync(".prettierrc.json", "utf-8"));

/**
 * @returns {import('@custom-elements-manifest/analyzer').Plugin}
 */
export function generateReactExports() {
  return {
    name: "generate-react-exports",
    /**
     * @param {object} params
     * @param {import("custom-elements-manifest").Package} params.customElementsManifest
     */
    packageLinkPhase({ customElementsManifest }) {
      const components = customElementsManifest.modules.map(mod => {
        return [mod.declarations.find(d => d.customElement || !!d.tagName), mod.path];
      });

      if (!components.length) {
        throw new Error("Component not found!");
      }

      const componentsCode = components
        .map(([el, path]) => resolveComponent(el, path))
        .filter(c => !!c[0])
        .join("\n");

      const code = `import React from "react";
import { createComponent } from "@lit-labs/react";

type Constructor<T> = { new (): T };
${componentsCode}`;

      const formattedCode = format(code, Object.assign(prettierConfig, { parser: "typescript" }));
      const outputPath = "./src";
      mkdirSync(outputPath, { recursive: true });
      writeFileSync(pathJoin(outputPath, "baklava-react.ts"), formattedCode, { encoding: "utf-8" });
    },
  };
}

/**
 * @param el {import("custom-elements-manifest").MixinDeclaration}
 * @param path string
 * @return string
 */
function resolveComponent(el, path) {
  const resolvedPath = resolveFilePath(path, "default", "./");
  const { exportCodes, fieldCodes } = resolveEvents(el.events, el.name);

  return `
export type ${el.name} = ${resolvedPath};
${exportCodes}

${el.jsDoc || ""}
export const ${el.name} = React.lazy(() =>
  customElements.whenDefined("${el.tagName}").then(() => ({
    default: createComponent({
      react: React,
      displayName: "${el.name}",
      tagName: "${el.tagName}",
      elementClass: customElements.get("${el.name}") as Constructor<${resolvedPath}>,
      ${fieldCodes ? `events: {${fieldCodes}}` : ""}
    })
  }))
);`;
}

/**
 * @param events {(import("custom-elements-manifest").Event & {parsedType: import("custom-elements-manifest").Type})[] | null}
 * @param componentName {string}
 * @return {{exportCodes: string, fieldCodes: string}}
 */
function resolveEvents(events, componentName) {
  if (!events) {
    return { exportCodes: "", fieldCodes: "" };
  }

  const exportCodes = [];
  const fieldCodes = [];
  for (const event of events) {
    const pascalCaseEventName = pascalCase(event.name);
    const exportedEventName = `${componentName}${pascalCaseEventName.replace(/^Bl/, "")}`;
    const reactEventName = `on${pascalCaseEventName}`;
    const resolvedEventType = resolveParsedType(event.parsedType.text, "./") ?? "any";

    exportCodes.push(`export type ${exportedEventName} = CustomEvent<${resolvedEventType}>;`);
  }

  return { exportCodes: exportCodes.join("\n"), fieldCodes: fieldCodes.join("\n,") };
}
