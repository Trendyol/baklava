import { writeFileSync, mkdirSync } from "node:fs";
import { join as pathJoin } from "node:path";

/**
 * @returns {import('@custom-elements-manifest/analyzer').Plugin}
 */
export function generateVueTypes() {
  return {
    name: "generate-vue-types",
    /**
     * @param {object} params
     * @param {import("custom-elements-manifest").Package} params.customElementsManifest
     */
    packageLinkPhase({ customElementsManifest }) {
      const componentNames = customElementsManifest.modules
        .map(mod => {
          return mod.declarations.filter(d => d.customElement || !!d.tagName);
        })
        .flat()
        .map(d => d.name);

      if (!componentNames.length) {
        throw new Error("Component not found!");
      }

      const code = `import type * as Baklava from '@trendyol/baklava/dist/baklava'

declare module 'vue' {
  export interface GlobalComponents {
    ${componentNames
      .map(component => `${component}: import("vue").Component<Baklava.${component}>`)
      .join("\n    ")}
  }
}
`;

      const outputPath = "./dist";
      mkdirSync(outputPath, { recursive: true });
      writeFileSync(pathJoin(outputPath, "baklava-vue.d.ts"), code, { encoding: "utf-8" });
    },
  };
}
