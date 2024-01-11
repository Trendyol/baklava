import fs from "fs";

const components = JSON.parse(fs.readFileSync("./dist/custom-elements.json", "utf-8"));
const declerations = components.modules.flatMap(module => module.declarations);
const customElements = declerations.filter(declaration => declaration.customElement === true);
const customElementNames = customElements.map(customElement => customElement.name);

const code = `
import type * as Baklava from '@trendyol/baklava/dist/baklava'

declare module 'vue' {
  export interface GlobalComponents {
    ${customElementNames.map(component => `${component}: import("vue").Component<Baklava.${component}>`).join('\n    ')}
  }
}
`

fs.writeFileSync("./dist/baklava-vue.d.ts", code);
