module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  extends: [
    "prettier",
    "plugin:@typescript-eslint/recommended",
    "eslint:recommended",
    "plugin:storybook/recommended",
    "plugin:lit/recommended",
    "plugin:wc/recommended",
  ],
  plugins: ["prettier", "unused-imports", "@typescript-eslint"],
  env: {
    browser: true,
    node: true,
  },
  globals: {
    process: "readonly",
  },
  rules: {
    "prettier/prettier": "error",
    "strict": ["error", "never"],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "double", { avoidEscape: true }],
    "semi": ["error", "always"],
    "no-empty": "off",
    "unused-imports/no-unused-imports": "error",
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
      { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] },
    ],
    "space-in-parens": "error",
    "no-multiple-empty-lines": "error",
    "no-irregular-whitespace": "error",
    "space-before-function-paren": [
      "error",
      {
        anonymous: "always",
        named: "never",
        asyncArrow: "always",
      },
    ],
  },
  overrides: [
    {
      files: ["*.ts"],
      parser: "@typescript-eslint/parser",
      extends: ["plugin:@typescript-eslint/recommended"],
      plugins: ["@typescript-eslint"],
    },
    {
      files: ["web-test-runner.config.js"],
      env: {
        node: true,
      },
    },
  ],
};
