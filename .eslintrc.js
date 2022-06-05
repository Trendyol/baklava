module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: [
    'prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint'],
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
      files: ['rollup.config.js', 'web-test-runner.config.js'],
      env: {
        node: true,
      },
    },
    {
      files: [
        '*.test.ts',
        '**/custom_typings/*.ts',
        'packages/lit-ssr/src/test/integration/tests/**',
        'packages/lit-ssr/src/lib/util/parse5-utils.ts',
      ],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
};
