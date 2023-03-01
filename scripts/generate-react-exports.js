const fs = require('fs-extra');
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

  fs.writeFileSync(`${__dirname}/../src/baklava-react.ts`, fileContentText);
}

function getReactEventName(baklavaEventName) {
  return `on${pascalCase(baklavaEventName)}`;
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
    ? `, {${events.map(event => `${getReactEventName(event.name)}: EventName<${event.type.text}>`).join(', ')}}`
    : '';

  const importPath = path.replace(/^src\//, '').replace(/\.ts$/, '');
  const Type = componentName + 'Type';

  importStatements.push(`import type ${Type} from "./${importPath}";`);

  baklavaReactFileParts.push(
`export const ${componentName} = React.lazy<ReactWebComponent<${Type}${eventTypes}>>(() =>
  customElements.whenDefined('${fileName}').then(elem => ({
      default: createComponent<${Type}>(
        {
          react: React,
          tagName: '${fileName}',
          elementClass: elem,
          events: ${JSON.stringify(eventNames)}
        }
      )
    })
));`
  );
}

writeBaklavaReactFile(baklavaReactFileParts);
