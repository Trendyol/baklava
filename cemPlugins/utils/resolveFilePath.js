import { relative, sep } from "path";

/**
 * @param filePath
 * @param typeName
 * @param replace
 * @returns {string}
 */
export function resolveFilePath(filePath, typeName, replace = "<rootPath>/") {
  const relToProject = relative(process.cwd(), filePath)
    .split(sep)
    .join("/")
    .replace(/\.ts$/, "")
    .replace(/^src\//, replace);
  return `import("${relToProject}").${typeName}`;
}
