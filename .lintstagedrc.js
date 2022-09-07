module.exports = {
  '*.ts': () => 'tsc -p tsconfig.json --noEmit',
  '*.{ts,js}': () => 'eslint .',
  '*.css': () => 'stylelint src/**/*.css'
};
