import { parse } from "comment-parser";

export default {
  globs: ["src/components/**/!(*.test|*.stories).ts"],
  exclude: ["src/**/*.css", "src/**/*.constant.ts","src/**/*/*.types.ts","src/components/icon/icon-list.ts"],
  outdir: "dist/",
  dev: false,
  watch: false,
  dependencies: false,
  packagejson: true,
  litelement: true,
  plugins: [
    {
      name: "filter",
      analyzePhase({ ts, node, moduleDoc }) {
        const getKind = kind => {
          switch (kind) {
            case ts.SyntaxKind.StringKeyword: {
              return "string";
            }
          }

          return "any";
        };

        switch (node.kind) {
          case ts.SyntaxKind.ClassDeclaration: {
            const className = node.name.getText();
            const classDoc = moduleDoc?.declarations?.find(
              declaration => declaration.name === className
            );

            if (node.typeParameters?.length > 0) {
              classDoc.typeParameters = node.typeParameters.map(p => ({
                name: p.name.escapedText,
                extends: p.constraint?.typeName.escapedText,
                default: getKind(p.default.kind),
              }));
            }

            if (classDoc?.members) {
              const eventMembers = classDoc.members.filter(member =>
                member.type?.text?.startsWith("EventDispatcher")
              );

              classDoc.events?.push(
                ...eventMembers.map(({ description, name, type }) => {
                  const eventMemberNode = node.members.find(
                    member => member.name.getText() === name
                  );
                  const eventDecorator = eventMemberNode.decorators.find(
                    decorator => decorator.expression.expression.getText() === "event"
                  );

                  name = eventDecorator.expression.arguments[0]?.text || name;

                  return {
                    type: {
                      text: `CustomEvent<${type.text.match(/EventDispatcher<(.*?)>$/s)[1]}>`,
                    },
                    description,
                    name,
                  };
                })
              );

              // Remove events from properties
              classDoc.members = classDoc.members.filter(member =>
                member.type?.text?.startsWith("EventDispatcher")
              );

              // Remove private properties
              classDoc.members = classDoc.members.filter(member => member.privacy !== "private");
            }
            break;
          }
        }
      },
    },
    {
      name: "custom-tags",
      analyzePhase({ ts, node, moduleDoc }) {
        switch (node.kind) {
          case ts.SyntaxKind.ClassDeclaration: {
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
        }
      },
    },
  ],
};
