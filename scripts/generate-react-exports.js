import fs from 'fs-extra';
import { format } from 'prettier';
import { pascalCase } from 'pascal-case';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const importStatements = [
  'import React from "react";',
  'import { type EventName, createComponent, ReactWebComponent } from "@lit-labs/react";',

  // FIXME: These types should be determined automatically
  'import { ISelectOption } from "./components/select/bl-select"',
  'export type { BaklavaIcon } from "./components/icon/icon-list"',
];

const exportStatements = [];

function writeBaklavaReactFile(fileContentParts) {
  let fileContentText =
    `/* eslint-disable @typescript-eslint/ban-ts-comment */\n` +
    `// @ts-nocheck\n` +
    `${importStatements.join('\n')}\n\n` +
    `${exportStatements.join('\n')}\n\n` +
    `${fileContentParts.join('\n\n')}\n`;
  const codeResult = format(fileContentText, { parser: 'typescript' });

  fs.writeFileSync(`${__dirname}/../src/baklava-react.ts`, codeResult);
}

function getReactEventName(baklavaEventName) {
  return `on${pascalCase(baklavaEventName)}`;
}

function cleanGenericTypes(typeParameters, eventType) {
  let result = eventType;

  typeParameters?.forEach(param => {
    // TODO: This is a very naive implementation, it should be improved
    result = result
      .replace(`<${param.name}>`, '')
      .replace(`${param.name} | `, '')
      .replace(` | ${param.name}`, '');
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
    ? `, {${events
        .map(
          event =>
            `${getReactEventName(event.name)}: EventName<${cleanGenericTypes(
              componentDeclaration.typeParameters,
              event.type.text
            )}>`
        )
        .join(', ')}}`
    : '';

  const importPath = path.replace(/^src\//, '').replace(/\.ts$/, '');
  const Type = componentName + 'Type';

  importStatements.push(`import type ${Type} from "./${importPath}";`);
  exportStatements.push(`export declare type ${componentName} = ${Type}`);

  const componentDefinition =
    typeParam => `  customElements.whenDefined('${fileName}').then(() => ({
    default: createComponent${typeParam}(
      {
        react: React,
        tagName: '${fileName}',
        elementClass: customElements.get('${fileName}'),
        events: ${JSON.stringify(eventNames)}
      }
    )
  }))`;

  if (componentDeclaration.typeParameters) {
    const typeParamDefinition = componentDeclaration.typeParameters.map((param) =>
    `${param.name}${param.extends ? ` extends ${param.extends}` : ''}${param.default ? ` = ${param.default}` : ''}`
  ).join(', ');

  const typeParam = componentDeclaration.typeParameters.map((param) => `${param.name}`).join(', ');

  const compType = `${Type}<${typeParam}>`;
  const wrapperCompType = `ReactWebComponent<${compType}${eventTypes}>`;
  const componentType = `<${Type}${eventTypes}>`;
  const componentPromise = `() => ${componentDefinition(componentType)}`;
  const componentLazy = `React.lazy<ReactWebComponent${componentType}>(${componentPromise})`;
  const componentExport = `export function ${componentName}<${typeParamDefinition}>(props: React.ComponentPropsWithRef<${wrapperCompType}>): JSX.Element {
    return ${componentLazy}(props)}`;
  baklavaReactFileParts.push(componentExport);
  } else {
    baklavaReactFileParts.push(`export const ${componentName} = React.lazy<ReactWebComponent<${Type}${eventTypes}>>(() => ${componentDefinition(`<${Type}>`)} );`);
  }
}

writeBaklavaReactFile(baklavaReactFileParts);
