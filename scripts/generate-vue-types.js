import fs from "fs";

const components = fs.readdirSync("./src/components");
const blComponents = components.map(convertToComponentName);

const code = `
import type * as Baklava from '@trendyol/baklava/dist/baklava'

declare module 'vue' {
  export interface GlobalComponents {
    ${blComponents.map(component => `${component}: import("vue").Component<Baklava.${component}>`).join('\n    ')}
  }
}
`

fs.writeFileSync("./dist/baklava-vue.d.ts", code);

function convertToComponentName(componentName) {
  const words = componentName.split("-");
  const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
  return `Bl${capitalizedWords.join("")}`;
}
