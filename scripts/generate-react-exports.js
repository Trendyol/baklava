import fs from "fs-extra";
import { pascalCase } from "pascal-case";
import path from "path";
import { format } from "prettier";
import { fileURLToPath } from "url";

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
  const componentDeclaration = declarations.find(declaration => declaration.customElement === true);
  const { events, name: componentName, tagName: fileName, jsDoc } = componentDeclaration;

  const eventNames =
    events?.reduce((acc, curr) => {
      acc[getReactEventName(curr.name)] = curr.name;
      return acc;
    }, {}) || {};

  const eventTypes =
    events?.map(event => {
      const eventName = getReactEventName(event.name);
      const eventType = cleanGenericTypes(componentDeclaration.typeParameters, event.type.text);
      const predefinedEventName = `${componentName}${eventName.split("onBl")[1]}`;

      eventStatements.push(`export declare type ${predefinedEventName} = ${eventType};`);
      return `${eventName}: EventName<${predefinedEventName}>`;
    }) || [];

  const importPath = path.replace(/^src\//, "").replace(/\.ts$/, "");
  const typeName = componentName + "Type";
  const formattedEventTypes = eventTypes.length ? `, {${eventTypes.join(", ")}}` : "";
  const componentType = `${typeName}${formattedEventTypes}`;

  importStatements.push(`import type ${typeName} from "./${importPath}";`);
  exportStatements.push(`export declare type ${componentName} = ${typeName}`);

  const source = `
  ${jsDoc || ""}
  export const ${componentName} = React.lazy(() =>
    customElements.whenDefined('${fileName}').then(() => ({
      default: createComponent<${componentType}>({
        react: React,
        displayName: "${componentName}",
        tagName: "${fileName}",
        elementClass: customElements.get("${fileName}"),
        events: ${JSON.stringify(eventNames)},
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
  const content = [
    `/* eslint-disable @typescript-eslint/ban-ts-comment */`,
    `// @ts-nocheck`,
    ...importStatements,
    ...eventStatements,
    ...exportStatements,
    ...fileContentParts,
  ].join("\n\n");

  const formattedContent = format(content, { parser: "typescript" });
  const outputPath = `${__dirname}/../src/baklava-react.ts`;
  fs.writeFileSync(outputPath, formattedContent);
}

function cleanGenericTypes(typeParameters, eventType) {
  if (!typeParameters?.length || typeParameters.length === 0) return eventType;

  const paramNames = typeParameters.map(param => param.name);
  const paramNamesPattern = paramNames.map(name => `<${name}>|${name} \\| | \\| ${name}`).join("|");
  const regex = new RegExp(paramNamesPattern, "g");

  return eventType.replace(regex, "");
}
