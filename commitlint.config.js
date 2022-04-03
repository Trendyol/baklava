module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Make sure there is never a max-line-length by disabling the rule
    'body-max-line-length': [0, 'always'],
    // @see https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional#subject-case
    'subject-case': [1, 'always', 'sentence-case'],
    // @see https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional#subject-full-stop
    'subject-full-stop': [1, 'always', '.'],
  },
};
