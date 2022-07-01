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
              classDoc.members = classDoc.members.filter(member => member.privacy !== 'private');
            }
          }
        }
      },
    }
  ],
};
