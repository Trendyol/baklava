const fs = require('fs-extra');
const prettier = require("prettier");
const { pascalCase } = require('pascal-case');

const importStatements = [
  'import React from "react";',
  'import { type EventName, createComponent, ReactWebComponent } from "@lit-labs/react";',

  // FIXME: These types should be determined automatically
  'import { ISelectOption } from "./components/select/bl-select"',
];

function writeBaklavaReactFile(fileContentParts) {
  let fileContentText = `/* eslint-disable @typescript-eslint/ban-ts-comment */\n` +
    `// @ts-nocheck\n` +
    `${importStatements.join('\n')}\n\n` +
    `${fileContentParts.join('\n\n')}\n`
  ;

  const codeResult = prettier.format(fileContentText, { parser: 'typescript'});

  fs.writeFileSync(`${__dirname}/../src/baklava-react.ts`, codeResult);
}

function getReactEventName(baklavaEventName) {
  return `on${pascalCase(baklavaEventName)}`;
}

function cleanGenericTypes(typeParameters, eventType) {
  let result = eventType;

  typeParameters?.forEach((param) => {
    result = result.replace(`<${param.name}>`, '');
  });

  return result;
}

const customElements = fs.readJSONSync(`${__dirname}/../dist/custom-elements.json`);
const customElementsModules = customElements.modules;
const baklavaReactFileParts = [];

for (const module of customElementsModules) {
  const { declarations, path } = module;
  const componentDeclaration = declarations.find(declaration => declaration.customElement === true);

  const { events, name: componentName, tagName: fileName } = componentDeclaration;

  const eventNames = events
    ? events.reduce((acc, curr) => {
        acc[getReactEventName(curr.name)] = curr.name;
        return acc;
      }, {})
    : {};


  const eventTypes = events
    ? `, {${events.map(event => `${getReactEventName(event.name)}: EventName<${cleanGenericTypes(componentDeclaration.typeParameters, event.type.text)}>`).join(', ')}}`
    : '';

  const importPath = path.replace(/^src\//, '').replace(/\.ts$/, '');
  const Type = componentName + 'Type';

  importStatements.push(`import type ${Type} from "./${importPath}";`);

  const componentDefinition = (typeParam) => `  customElements.whenDefined('${fileName}').then(elem => ({
    default: createComponent${typeParam}(
      {
        react: React,
        tagName: '${fileName}',
        elementClass: elem,
        events: ${JSON.stringify(eventNames)}
      }
    )
  }))`;


  baklavaReactFileParts.push(`export const ${componentName} = React.lazy<ReactWebComponent<${Type}${eventTypes}>>(() => ${componentDefinition(`<${Type}>`)} );`);
}

writeBaklavaReactFile(baklavaReactFileParts);
