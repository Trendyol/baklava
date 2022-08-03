const fs = require('fs-extra');
const prettier = require('prettier');

function writeBaklavaReactFile(fileContentParts) {
  let fileContentText = `
    /* eslint-disable @typescript-eslint/ban-ts-comment */
    // @ts-nocheck
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
  componentConverts: [],
  exports: [],
};

for (const module of customElementsModules) {
  const { declarations } = module;
  const { events, name: componentName, tagName: fileName } = declarations[0];

  const eventNames = events
    ? events.reduce((prev, curr) => {
        prev[getReactEventName(curr.name)] = curr.name;
        return prev;
      }, {})
    : {};

  baklavaReactFileParts.componentConverts.push(
    `const _${componentName} = createComponent(
      React,
      '${fileName}',
      customElements.get('${fileName}'),
      ${JSON.stringify(eventNames)}
    );`
  );
  baklavaReactFileParts.exports.push(`export { _${componentName} as ${componentName} };`);
}

writeBaklavaReactFile(baklavaReactFileParts);
