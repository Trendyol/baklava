import { writeFileSync, mkdirSync } from "node:fs";
import { join as pathJoin } from "node:path";
import { resolveParsedType } from "./utils/resolveParsedType.js";

/**
 * @returns {import('@custom-elements-manifest/analyzer').Plugin}
 */
export function generateSvelteTypes() {
  return {
    name: "generate-svelte-types",
    /**
     * @param {object} params
     * @param {import("custom-elements-manifest").Package} params.customElementsManifest
     */
    packageLinkPhase({ customElementsManifest }) {
      const components = customElementsManifest.modules
        .map(mod => {
          return mod.declarations.filter(d => d.customElement || !!d.tagName);
        })
        .flat();

      if (!components.length) {
        throw new Error("Component not found!");
      }

      const formattedCode = components
        .map(resolveComponent)
        .filter(c => !!c)
        .join("\n    ");

      const code = `declare namespace svelteHTML {
  interface IntrinsicElements {
    ${formattedCode}
  }
}
`;

      const outputPath = "./dist";
      mkdirSync(outputPath, { recursive: true });
      writeFileSync(pathJoin(outputPath, "baklava-svelte.d.ts"), code, { encoding: "utf-8" });
    },
  };
}

/**
 * @param el {import("custom-elements-manifest").MixinDeclaration}
 * @return string
 */
function resolveComponent(el) {
  const hasAttribute = el.attributes && el.attributes.length > 0;
  const hasEvents = el.events && el.events.length > 0;
  if (!hasAttribute && !hasEvents) {
    return "";
  }

  let code = `"${el.tagName}": {`;
  if (hasAttribute) {
    code += "\n" + el.attributes.map(generateAttribute).join("\n");
  }
  if (hasEvents) {
    code += "\n" + el.events.map(generateEvent).join("\n");
  }
  code += "\n\t\t};";

  return code;
}

/**
 * @param attribute {import("custom-elements-manifest").Attribute & {parsedType: import("custom-elements-manifest").Type}}
 * @return string
 */
function generateAttribute(attribute) {
  const tabs = "\t\t\t";
  let code = "";

  const desc = generateComment(attribute.description);
  if (desc) {
    code += `${tabs}${desc}\n`;
  }

  let isOptional = !!attribute.default;
  if (attribute.type?.text.includes("undefined")) {
    isOptional = true;
  }

  const attributeDefinition = `"${attribute.name}"${isOptional ? "?" : ""}: ${
    resolveParsedType(attribute.parsedType?.text) ?? attribute.type?.text
  };`;
  code += `${tabs}${attributeDefinition}`;

  return code;
}

/**
 * @param comment {string | undefined}
 * @return string | null
 */
function generateComment(comment) {
  if (!comment) {
    return null;
  }

  if (comment.includes("\n")) {
    const lb = "\n\t\t\t * ";
    return `/**${lb}${comment.replaceAll("\n", lb)}\n\t\t\t */`;
  }

  return `/** ${comment} */`;
}

/**
 * @param event {import("custom-elements-manifest").Event & {parsedType: import("custom-elements-manifest").Type}}
 * @return string
 */
function generateEvent(event) {
  const tabs = "\t\t\t";
  let code = "";

  let fnType = "() => void;";
  if (event.parsedType?.text) {
    const formattedType = resolveParsedType(event.parsedType.text).replaceAll("\n", "\n\t\t");
    fnType = `(event: CustomEvent<${formattedType}>) => void;`;
  }

  const desc = generateComment(event.description);

  if (desc) {
    code += tabs + desc;
  }
  // svelte 4
  code += `\n${tabs}"on:${event.name}"?: ${fnType}`;

  if (desc) {
    code += "\n" + tabs + desc;
  }
  // svelte 5
  code += `\n${tabs}"on${event.name}"?: ${fnType}`;

  return code;
}
