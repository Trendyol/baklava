module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  extends: ['eslint:recommended', 'prettier', 'plugin:storybook/recommended'],
  env: {
    browser: true,
    node: true
  },
  globals: {
    process: 'readonly'
  },
  rules: {
    strict: ['error', 'never']
  },
  overrides: [{
    files: ['*.ts'],
    parser: '@typescript-eslint/parser',
    extends: ['plugin:@typescript-eslint/recommended'],
    plugins: ['@typescript-eslint']
  }, {
    files: ['web-test-runner.config.js'],
    env: {
      node: true
    }
  }]
};
