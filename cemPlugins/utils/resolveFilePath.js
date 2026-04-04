import { relative } from "path";

/**
 * @param filePath
 * @param typeName
 * @param replace
 * @returns {string}
 */
export function resolveFilePath(filePath, typeName, replace = "<rootPath>/") {
  const relToProject = resolveImportPath(filePath, replace);
  return `import("${relToProject}").${typeName}`;
}

/**
 * @param filePath
 * @param replace
 * @returns {string}
 */
export function resolveImportPath(filePath, replace = "<rootPath>/") {
  return relative(process.cwd(), filePath)
    .replace(/\\/g, "/")
    .replace(/\.ts$/, "")
    .replace(/^src\//, replace);
}
