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
        switch (node.kind) {
          case ts.SyntaxKind.ClassDeclaration: {
            const className = node.name.getText();
            const classDoc = moduleDoc?.declarations?.find(declaration => declaration.name === className);

            if (classDoc?.members) {
              const eventMembers = classDoc.members.filter(member => member.type?.text?.startsWith('EventDispatcher'));

              classDoc.events?.push(...eventMembers.map(({description, name, type}) => {
                const eventMemberNode = node.members.find((member) => member.name.getText() === name);
                const eventDecorator = eventMemberNode.decorators.find((decorator) => decorator.expression.expression.getText() === 'event');

                name = eventDecorator.expression.arguments[0]?.text || name;

                return {
                  type: {
                    text: `CustomEvent<${type.text.replace(/.*<([a-z]+)>/, '$1')}>`
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
