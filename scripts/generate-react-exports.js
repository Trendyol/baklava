const fs = require('fs-extra');
const prettier = require('prettier');

function getExportData(baklavaFileContent) {
  const imports = {};
  const lines = baklavaFileContent.split(/\r\n|\n/).filter(line => line !== '');

  for (const line of lines) {
    try {
      const {
        groups: { exportName, fileName },
      } = line.match(/as (?<exportName>.*) } from ['`"](?<path>.*\/(?<fileName>[\w-]*))['`"];$/);

      imports[exportName] = fileName;
    } catch (error) {}
  }

  return imports;
}

function addImports(fileContentParts, exportName, fileName) {
  fileContentParts.imports.push(
    `import ${exportName} from '../components/${fileName.replace('bl-', '')}/${fileName}';`
  );
}

function addComponentConverts(fileContentParts, exportName, fileName) {
  const eventOptions = getEventOptions(fileName);

  fileContentParts.componentConverts.push(
    `const _${exportName} = createComponent(
      React,
      '${fileName}',
      ${exportName},
      ${JSON.stringify(eventOptions)}
    );`
  );
}

function addExports(fileContentParts, exportName) {
  fileContentParts.exports.push(`export { _${exportName} as ${exportName} };`);
}

function getEventOptions(fileName) {
  const eventDict = {};
  const componentFileContent = fs.readFileSync(
    `${process.cwd()}/src/components/${fileName.replace('bl-', '')}/${fileName}.ts`,
    {
      encoding: 'utf8',
    }
  );

  const eventMatches = componentFileContent.matchAll(
    /(?<=@event\(')(?<eventName>[\w-]*).*(?<reactEventName>on\w*)/g
  );

  for (const eventMatch of eventMatches) {
    eventDict[eventMatch.groups.reactEventName] = eventMatch.groups.eventName;
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

  fs.mkdirSync(`${process.cwd()}/src/react`, { recursive: true });
  fs.writeFileSync(
    `${process.cwd()}/src/react/index.ts`,
    prettier.format(fileContentText.trim(), { parser: 'babel' })
  );
}

const baklavaFileContent = fs.readFileSync(process.cwd() + '/src/index.ts', {
  encoding: 'utf8',
});

const exportData = getExportData(baklavaFileContent);
const fileContentParts = {
  imports: [],
  componentConverts: [],
  exports: [],
};

for (const exportName in exportData) {
  const fileName = exportData[exportName];

  addImports(fileContentParts, exportName, fileName);
  addComponentConverts(fileContentParts, exportName, fileName);
  addExports(fileContentParts, exportName);
}

writeBaklavaReactFile(fileContentParts);
