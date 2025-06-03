import { parse } from "comment-parser";

/**
 * @returns {import('@custom-elements-manifest/analyzer').Plugin}
 */
export function addJsDoc() {
  return {
    name: "add-js-doc",
    /**
     * @param {object} params
     * @param {typeof import("typescript")} params.ts
     * @param {import('typescript').Node} params.node
     * @param {import('@custom-elements-manifest/analyzer').AnalyzePhaseParams.moduleDoc} params.moduleDoc
     */
    analyzePhase({ ts, node, moduleDoc }) {
      if (node.kind === ts.SyntaxKind.ClassDeclaration) {
        const className = node.name.getText();
        const classDoc = moduleDoc?.declarations?.find(
          declaration => declaration.name === className
        );
        const customTags = ["tag", "summary", "cssproperty"];
        let customComments = "/**";

        node.jsDoc?.forEach(jsDoc => {
          jsDoc?.tags?.forEach(tag => {
            const tagName = tag.tagName.getText();

            if (customTags.includes(tagName)) {
              customComments += `\n * @${tagName} ${tag.comment}`;
            }
          });
        });

        // This is what allows us to map JSDOC comments to ReactWrappers.
        classDoc["jsDoc"] = node.jsDoc?.map(jsDoc => jsDoc.getFullText()).join("\n");

        const parsed = parse(`${customComments}\n */`);

        if (!parsed.length) return;

        parsed[0].tags?.forEach(t => {
          if (!Array.isArray(classDoc[t.tag])) {
            classDoc[t.tag] = [];
          }

          classDoc[t.tag].push({
            name: t.name,
            description: t.description,
            type: t.type || undefined,
          });
        });
      }
    },
  };
}
