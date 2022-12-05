module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        'storybook',
        'design',
        // Components as scopes listed below
        'button',
        'icon',
        'input',
        'badge',
        'tab',
        'tooltip',
        'progress-indicator',
        'checkbox',
        'alert',
        'select',
        'pagination',
        'radio',
        'dialog',
        'drawer',
      ],
    ],
  },
};
