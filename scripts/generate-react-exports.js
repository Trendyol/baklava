const fs = require('fs-extra');
const prettier = require('prettier');

const importStatements = [
  "import React from 'react';",
  "import { createComponent } from '@lit-labs/react';",
];

function writeBaklavaReactFile(fileContentParts) {
  let fileContentText = `
    /* eslint-disable @typescript-eslint/ban-ts-comment */
    // @ts-nocheck
    ${importStatements.join('\n')};
    ${fileContentParts.join('\n\n')}
  `;

  fs.writeFileSync(
    `${__dirname}/../src/baklava-react.ts`,
    prettier.format(fileContentText.trim(), { parser: 'babel', singleQuote: true })
  );
}

function getReactEventName(baklavaEventName) {
  const rawEventName = baklavaEventName.match(/(\w+)/g).at(-1);
  return `on${rawEventName[0].toUpperCase()}${rawEventName.slice(1)}`;
}

const customElements = fs.readJSONSync(`${__dirname}/../dist/custom-elements.json`);
const customElementsModules = customElements.modules;
const baklavaReactFileParts = [];

for (const module of customElementsModules) {
  const { declarations, path } = module;
  const { events, name: componentName, tagName: fileName } = declarations[0];

  const eventNames = events
    ? events.reduce((acc, curr) => {
        acc[getReactEventName(curr.name)] = curr.name;
        return acc;
      }, {})
    : {};

  const importPath = path.replace(/^src\//, '').replace(/\.ts$/, '');
  const Component = componentName + 'Component';

  importStatements.push(`import ${Component} from "./${importPath}";`);

  baklavaReactFileParts.push(
    `
    export const ${componentName} = createComponent(
        React,
        '${fileName}',
        ${Component},
        ${JSON.stringify(eventNames)}
      );`
  );
}

writeBaklavaReactFile(baklavaReactFileParts);
