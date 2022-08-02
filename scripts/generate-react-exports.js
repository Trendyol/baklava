const fs = require('fs-extra');
const prettier = require('prettier');

function writeBaklavaReactFile(fileContentParts) {
  let fileContentText = `
    import React from 'react';
    import { createComponent } from '@lit-labs/react';
  `;

  for (const valueArray of Object.values(fileContentParts)) {
    fileContentText += `${valueArray.join('\n')}\n\n`;
  }

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
const baklavaReactFileParts = {
  imports: [],
  componentConverts: [],
  exports: [],
};

for (const module of customElementsModules) {
  const { path, declarations } = module;
  const { events, name: componentName, tagName: fileName } = declarations[0];
  const relativePath = path.replace('src', '.').replace('.ts', '');

  const eventNames = events
    ? events.reduce((prev, curr) => {
        prev[getReactEventName(curr.name)] = curr.name;
        return prev;
      }, {})
    : {};

  baklavaReactFileParts.imports.push(`import ${componentName} from '${relativePath}'`);
  baklavaReactFileParts.componentConverts.push(
    `const _${componentName} = createComponent(
      React,
      '${fileName}',
      ${componentName},
      ${JSON.stringify(eventNames)}
    );`
  );
  baklavaReactFileParts.exports.push(`export { _${componentName} as ${componentName} };`);
}

writeBaklavaReactFile(baklavaReactFileParts);
