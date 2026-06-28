import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join as pathJoin } from "node:path";
import { pascalCase } from "pascal-case";
import { format } from "prettier";
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

      const importLines = resolved.map(c => c.importCode).join("\n");
      const componentLines = resolved.map(c => c.componentCode).join("\n");

      const code = `import React from "react";
import { type EventName, createComponent } from "@lit-labs/react";
${importLines}

type Constructor<T> = { new (): T };
${componentLines}`;

      const formattedCode = format(code, Object.assign(prettierConfig, { parser: "typescript" }));
      const outputPath = "./src";
      mkdirSync(outputPath, { recursive: true });
      writeFileSync(pathJoin(outputPath, "baklava-react.ts"), formattedCode, { encoding: "utf-8" });
    },
  };
}

/**
 * Derives the static ES import path from the CEM module path.
 * e.g. "src/components/button/bl-button.ts" -> "./components/button/bl-button"
 *
 * @param {string} modPath
 * @returns {string}
 */
function toImportPath(modPath) {
  return modPath.replace(/^src\//, "./").replace(/\.ts$/, "");
}

/**
 * @param el {import("custom-elements-manifest").MixinDeclaration}
 * @param path {string}
 * @return {{ importCode: string, componentCode: string } | null}
 */
function resolveComponent(el, path) {
  if (!el) return null;

  const importPath = toImportPath(path);
  // Use a suffixed alias to avoid collision with the exported const name.
  const elementAlias = `${el.name}Element`;
  const { exportCodes, fieldCodes } = resolveEvents(el.events, el.name);

  const importCode = `import ${elementAlias} from "${importPath}";`;

  const componentCode = `
export type ${el.name} = InstanceType<typeof ${elementAlias}>;
${exportCodes}

${el.jsDoc || ""}
export const ${el.name} = createComponent({
  react: React,
  displayName: "${el.name}",
  tagName: "${el.tagName}",
  elementClass: ${elementAlias} as unknown as Constructor<InstanceType<typeof ${elementAlias}>>,
  ${fieldCodes ? `events: {${fieldCodes}}` : ""}
});`;

  return { importCode, componentCode };
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
