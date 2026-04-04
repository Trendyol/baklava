import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join as pathJoin } from "node:path";
import { pascalCase } from "pascal-case";
import { format } from "prettier";
import { resolveImportPath } from "./utils/resolveFilePath.js";
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

      const resolved = components
        .map(([el, path]) => resolveComponent(el, path))
        .filter(c => !!c);

      const importStatements = resolved.map(c => c.importStatement).join("\n");
      const componentBlocks = resolved.map(c => c.componentCode).join("\n");

      const code = `import React from "react";
import { type EventName, createComponent } from "@lit-labs/react";
${importStatements}
${componentBlocks}`;

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
 * @return {{importStatement: string, componentCode: string} | null}
 */
function resolveComponent(el, path) {
  if (!el) return null;

  const importPath = resolveImportPath(path, "./");
  const elementImportName = `${el.name}Element`;
  const { exportCodes, fieldCodes } = resolveEvents(el.events, el.name);

  const importStatement = `import ${elementImportName} from "${importPath}";`;

  const componentCode = `
export type ${el.name} = ${elementImportName};
${exportCodes}

${el.jsDoc || ""}
export const ${el.name} = createComponent({
  react: React,
  displayName: "${el.name}",
  tagName: "${el.tagName}",
  elementClass: ${elementImportName},
  ${fieldCodes ? `events: {${fieldCodes}}` : ""}
});`;

  return { importStatement, componentCode };
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
    fieldCodes.push(`${reactEventName}: "${event.name}" as EventName<${exportedEventName}>`);
  }

  return { exportCodes: exportCodes.join("\n"), fieldCodes: fieldCodes.join("\n,") };
}
