/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
/* eslint-disable no-console */
const yargs = require('yargs');
const gaze = require('gaze');
const postcss = require('postcss');
const fs = require('fs');
const glob = require('glob');
const config = require('../postcss.config');
const outline = require('../grace.config');
const components = require('../src/custom-elements.json');
const options = yargs.option('watch', {
  type: 'boolean',
  describe: 'Watch the file system for changes and render automatically',
}).argv;

/**
 * Function declared via watcher to handle looping in any globally focus style generation.
 */
const createCssGlobals = () => {
  globalStylesheets();
  foucStylesheet();
};

/**
 * Function to loop over config declared CSS source files to process.
 */
const globalStylesheets = () => {
  outline.css.global.forEach(style => {
    global(style.src, style.dest);
  });
};

/**
 * Function to generate a project specific stylesheet to correct or minify the FOUC.
 */
const foucStylesheet = () => {
  let style = '/* Prevent FOUC in all custom components */';
  if (outline.css.fouc.enabled && components.tags.length) {
    components.tags.forEach((tag, index) => {
      style += `
${tag.name}:not(:defined),
${tag.name}:not(:defined) *${index !== components.tags.length - 1 ? ',' : ''}`;
    });
    style += ` {
  opacity: 0;
}
    `;
    fs.writeFile(outline.css.fouc.dest, style, () => true);
  }
};

/**
 * Function to process a source file and output to a destination via postcss.
 *
 * @param {string} src
 * @param {string} dest
 */
const global = (src, dest) => {
  fs.readFile(src, (err, css) => {
    postcss([...config.plugins])
      .process(css, { from: src, to: dest })
      .then(result => {
        console.log(`Writing ${src} to ${dest}...`);
        fs.writeFile(dest, result.css, () => true);
        if (result.map) {
          fs.writeFile(`${dest}.map`, result.map.toString(), () => true);
        }
      });
  });
};

/**
 * Function to wrap all generic .css files with CSS template literals suitable for consumption via Lit.
 *
 * @param {string} filepath
 */
const createCssLiterals = filepath => {
  const filename = filepath.replace(/^.*[\\\/]/, '');
  fs.readFile(filepath, (err, css) => {
    const nFilePath = `${filepath}.lit.ts`;
    postcss([...config.plugins])
      .process(css, { from: filepath, to: nFilePath })
      .then(result => {
        fs.writeFile(
          nFilePath,
          `
import { css } from 'lit';
export default css\`
/* Apply standardized box sizing to the component. */
:host {
  box-sizing: border-box;
}
:host *,
:host *::before,
:host *::after {
  box-sizing: inherit;
}
[hidden] {
  display: none !important;
}
/* Apply component specific CSS */
${result.css}\`;`,
          () => true
        );
      });
  });
};

// Ensure dist directory exists.
if (!fs.existsSync(outline.destBasePath)) {
  fs.mkdirSync(outline.destBasePath);
}

// Run the global style generation.
createCssGlobals();

// Run the component style generation.
glob('src/components/**/*.css', (err, files) => {
  files.forEach(createCssLiterals);
});

// Watch mode with --watch in cli.
if (options.watch) {
  // Watch globals.
  gaze('*.css', (err, watcher) => {
    watcher.on('added', createCssGlobals);
    watcher.on('changed', createCssGlobals);
  });

  // Watch components.
  gaze('src/components/**/*.css', (err, watcher) => {
    watcher.on('added', createCssLiterals);
    watcher.on('changed', createCssLiterals);
  });
}
