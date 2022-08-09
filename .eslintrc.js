module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: [
    // 'prettier',
    'eslint:recommended',
  ],
  env: {
    browser: true,
  },
  globals: {
    process: 'readonly',
  },
  rules: {
    strict: ['error', 'never'],
  },
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      extends: [
        'plugin:@typescript-eslint/recommended'
      ],
      plugins: ['@typescript-eslint'],
    },
    {
      files: ['rollup.config.js', 'web-test-runner.config.js'],
      env: {
        node: true,
      },
    }
  ],
};
