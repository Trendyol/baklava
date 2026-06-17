import { addJsDoc } from "./cemPlugins/addJsDoc.js";
import { decoratedEventCollector } from "./cemPlugins/decoratedEventCollector.js";
import { generateReactExports } from "./cemPlugins/generateReactExports.js";
import { generateSvelteTypes } from "./cemPlugins/generateSvelteTypes.js";
import { generateVueTypes } from "./cemPlugins/generateVueTypes.js";
import { parsedTypeEnhancerPlugin } from "./cemPlugins/parsedTypeEnhancer.js";

/**
 * @typedef {Object} CommonOptions
 * @property {import("typescript").TypeChecker} typeChecker
 */

/** @type {CommonOptions} */
let opts = {};

/** @type {import('@custom-elements-manifest/analyzer').AnalyzerConfig} */
export default {
  globs: ["src/components/**/!(*.test|*.stories).ts", "src/mixins/**/!(*.test|*.stories).ts"],
  exclude: [
    "src/**/*.css",
    "src/**/*.constant.ts",
    "src/**/*/*.types.ts",
    "src/components/icon/icon-list.ts",
  ],
  outdir: "dist/",
  dev: false,
  watch: false,
  dependencies: false,
  packagejson: true,
  litelement: true,
  overrideModuleCreation({ ts, globs }) {
    const tsConfigFile = ts.findConfigFile(process.cwd(), ts.sys.fileExists, "tsconfig.json");
    const { config } = ts.readConfigFile(tsConfigFile, ts.sys.readFile);
    const compilerOptions = ts.convertCompilerOptionsFromJson(
      config.compilerOptions ?? {},
      "./src/"
    );
    const program = ts.createProgram(globs, compilerOptions);

    opts.typeChecker = program.getTypeChecker();

    return program.getSourceFiles().filter(sf => globs.find(glob => sf.fileName.includes(glob)));
  },
  plugins: [
    decoratedEventCollector(opts),
    parsedTypeEnhancerPlugin(opts),
    addJsDoc(),
    generateSvelteTypes(),
    generateVueTypes(),
    generateReactExports(),
  ],
};
