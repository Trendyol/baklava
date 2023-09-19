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

const customElements = fs.readJSONSync(`${__dirname}/../dist/custom-elements.json`);
const customElementsModules = customElements.modules;
const baklavaReactFileParts = [];

for (const module of customElementsModules) {
  const { declarations, path } = module;
  const componentDeclaration = declarations.find(declaration => declaration.customElement === true);

  const { events, name: componentName, tagName: fileName, jsDoc } = componentDeclaration;

  const eventNames = events
    ? events.reduce((acc, curr) => {
        acc[getReactEventName(curr.name)] = curr.name;
        return acc;
      }, {})
    : {};

  const eventTypes = events
    ? `, {${events
        .map(
          event =>
            `${getReactEventName(event.name)}: EventName<${cleanGenericTypes(
              componentDeclaration.typeParameters,
              event.type.text
            )}>`
        )
        .join(", ")}}`
    : "";

  const importPath = path.replace(/^src\//, "").replace(/\.ts$/, "");
  const typeName = componentName + "Type";
  const componentType = `${typeName}${eventTypes}`;

  importStatements.push(`import type ${typeName} from "./${importPath}";`);
  exportStatements.push(`export declare type ${componentName} = ${typeName}`);

  const source = `
  ${jsDoc}
  export const ${componentName}: import("@lit-labs/react").ReactWebComponent<${componentType}> = (
    () => createComponent<${componentType}>({
      react: React,
      displayName: "${componentName}",
      tagName: "${fileName}",
      elementClass: customElements.get("${fileName}"),
      events: ${JSON.stringify(eventNames)},
    }));
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
  const paramNamesPattern = paramNames.map(name => `<${name}>|${name} \\| | \\| ${name}`).join('|');
  const regex = new RegExp(paramNamesPattern, 'g');

  return eventType.replace(regex, '');
}
