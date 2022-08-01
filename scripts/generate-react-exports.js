const fs = require('fs-extra');
const prettier = require('prettier');

function getComponentNameDict(baklavaFileContent) {
  const componentNameDict = {};
  const lines = baklavaFileContent.split(/\r\n|\n/).filter(line => line !== '');

  for (const line of lines) {
    try {
      const {
        groups: { componentName, fileName },
      } = line.match(/as (?<componentName>.*) } from ['`"](?<path>.*\/(?<fileName>[\w-]*))['`"];$/);

      componentNameDict[componentName] = fileName;
    } catch (error) {}
  }

  return componentNameDict;
}

function addImports(fileContentParts, componentName, fileName) {
  fileContentParts.imports.push(
    `import ${componentName} from '../components/${fileName.replace('bl-', '')}/${fileName}';`
  );
}

function addComponentConverts(fileContentParts, componentName, fileName) {
  const eventOptions = getEventOptions(fileName);

  fileContentParts.componentConverts.push(
    `const _${componentName} = createComponent(
      React,
      '${fileName}',
      ${componentName},
      ${JSON.stringify(eventOptions)}
    );`
  );
}

function addExports(fileContentParts, componentName) {
  fileContentParts.exports.push(`export { _${componentName} as ${componentName} };`);
}

function getEventOptions(fileName) {
  const eventDict = {};
  const componentFileContent = fs.readFileSync(
    `${__dirname}/../src/components/${fileName.replace('bl-', '')}/${fileName}.ts`,
    {
      encoding: 'utf8',
    }
  );

  const eventMatches = componentFileContent.matchAll(
    /(?<=@event\(')(?<eventName>[\w-]*).*(?<reactEventName>on\w*)|CustomEvent\([`'"](?<litEventName>[\w-]*)/g
  );

  for (const eventMatch of eventMatches) {
    const litEventName = eventMatch.groups.litEventName;
    const slicedLitEvent = litEventName?.slice(3);

    if (litEventName) {
      const reactEventName = `on${slicedLitEvent[0].toUpperCase()}${slicedLitEvent.slice(1)}`;
      eventDict[reactEventName] = litEventName;
    } else {
      eventDict[eventMatch.groups.reactEventName] = eventMatch.groups.eventName;
    }
  }

  return eventDict;
}

function writeBaklavaReactFile(fileContentParts) {
  let fileContentText = `
    import React from 'react';
    import { createComponent } from '@lit-labs/react';
  `;

  for (const valueArray of Object.values(fileContentParts)) {
    fileContentText += `${valueArray.join('\n')}\n\n`;
  }

  fs.mkdirSync(`${__dirname}/../src/react`, { recursive: true });
  fs.writeFileSync(
    `${__dirname}/../src/react/index.ts`,
    prettier.format(fileContentText.trim(), { parser: 'babel' })
  );
}

const baklavaFileContent = fs.readFileSync(`${__dirname}/../src/index.ts`, {
  encoding: 'utf8',
});

const componentNameDict = getComponentNameDict(baklavaFileContent);

const fileContentParts = {
  imports: [],
  componentConverts: [],
  exports: [],
};

for (const componentName in componentNameDict) {
  const fileName = componentNameDict[componentName];

  addImports(fileContentParts, componentName, fileName);
  addComponentConverts(fileContentParts, componentName, fileName);
  addExports(fileContentParts, componentName);
}

writeBaklavaReactFile(fileContentParts);