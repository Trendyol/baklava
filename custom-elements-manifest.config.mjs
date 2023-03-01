export default {
  globs: ['src/components/**/!(*.test).ts'],
  exclude: ['src/**/*.css', 'src/components/icon/icon-list.ts'],
  outdir: 'dist/',
  dev: false,
  watch: false,
  dependencies: false,
  packagejson: true,
  litelement: true,
  plugins: [
    {
      name: 'filter',
      analyzePhase({ ts, node, moduleDoc }) {

        const getKind = (kind) => {
          switch(kind) {
            case ts.SyntaxKind.StringKeyword: {
              return 'string';
            }
          }

          return 'any';
        }

        switch (node.kind) {
          case ts.SyntaxKind.ClassDeclaration: {
            const className = node.name.getText();
            const classDoc = moduleDoc?.declarations?.find(declaration => declaration.name === className);

            if (node.typeParameters?.length > 0) {
              classDoc.typeParameters = node.typeParameters.map((p) => ({
                name: p.name.escapedText,
                extends: p.constraint?.typeName.escapedText,
                default: getKind(p.default.kind)
              }));
            }

            if (classDoc?.members) {
              const eventMembers = classDoc.members.filter(member => member.type?.text?.startsWith('EventDispatcher'));

              classDoc.events?.push(...eventMembers.map(({description, name, type}) => {
                const eventMemberNode = node.members.find((member) => member.name.getText() === name);
                const eventDecorator = eventMemberNode.decorators.find((decorator) => decorator.expression.expression.getText() === 'event');

                name = eventDecorator.expression.arguments[0]?.text || name;

                return {
                  type: {
                    text: `CustomEvent<${type.text.match(/EventDispatcher<(.*?)>$/s)[1]}>`
                  },
                  description,
                  name
                }
              }));

              // Remove events from properties
              classDoc.members = classDoc.members.filter(member => member.type?.text?.startsWith('EventDispatcher'));

              // Remove private properties
              classDoc.members = classDoc.members.filter(member => member.privacy !== 'private');
            }
            break;
          }
        }
      },
    }
  ],
};
