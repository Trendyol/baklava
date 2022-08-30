module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: [
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
      rules: {
        "@typescript-eslint/indent": [
          "error",
          2,
          {
            "ignoredNodes": [
              "PropertyDefinition[decorators]",
              "TSUnionType"
            ]
          }
        ],
      },
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
