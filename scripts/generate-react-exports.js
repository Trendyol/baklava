import fs from "fs-extra";
import { pascalCase } from "pascal-case";
import path from "path";
import { format } from "prettier";
import { fileURLToPath } from "url";
import prettierConfig from "../.prettierrc.json" assert { type: "json" };
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const importStatements = [
  'import React from "react";',
  'import { type EventName, createComponent } from "@lit-labs/react";',

  // FIXME: These types should be determined automatically
  'import { ISelectOption } from "./components/select/bl-select"',
];

const exportStatements = [];
const eventStatements = [];

const customElements = fs.readJSONSync(`${__dirname}/../dist/custom-elements.json`);
const customElementsModules = customElements.modules;
const baklavaReactFileParts = [];

for (const module of customElementsModules) {
  const { declarations, path } = module;
  const component = declarations.find(declaration => declaration.customElement === true);
  const { name: componentName, tagName: fileName } = component;

  const eventNames = (component.events || []).map(event => {
    const reactEvent = getReactEventName(event.name);
      const reactEventName = `${componentName}${reactEvent.split("onBl")[1]}`;
      return `${reactEvent}: '${event.name}' as EventName<${reactEventName}>`;
    }).join(',\n');


  const importPath = path.replace(/^src\//, "").replace(/\.ts$/, "");
  const typeName = componentName + "Type";

  importStatements.push(`import type ${typeName} from "./${importPath}";`);
  exportStatements.push(`export declare type ${componentName} = ${typeName}`);

  const jsDoc = component.jsDoc || "";

  const source = `
  ${jsDoc}
  export const ${componentName} = React.lazy(() =>
    customElements.whenDefined('${fileName}').then(() => ({
      default: createComponent({
        react: React,
        displayName: "${componentName}",
        tagName: "${fileName}",
        elementClass: customElements.get("${fileName}") as Constructor<${componentName}Type>,
        events: {
          ${eventNames}
        },
      })
    }))
  );
  `;

  baklavaReactFileParts.push(source);
}

writeBaklavaReactFile(baklavaReactFileParts);

function getReactEventName(baklavaEventName) {
  return `on${pascalCase(baklavaEventName)}`;
}

function writeBaklavaReactFile(fileContentParts) {
  const constructorType = `type Constructor<T> = { new (): T };`;

  const content = [
    `/* eslint-disable @typescript-eslint/ban-ts-comment */`,
    `// @ts-nocheck`,
    ...importStatements,
    ...eventStatements,
    constructorType,
    ...exportStatements,
    ...fileContentParts,
  ].join("\n\n");

  const formattedContent = format(content, Object.assign(prettierConfig, { parser: "typescript" }));
  const outputPath = `${__dirname}/../src/baklava-react.ts`;
  fs.writeFileSync(outputPath, formattedContent);
}
