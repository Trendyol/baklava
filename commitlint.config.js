module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        'storybook',
        'design',
        'react',
        // Components as scopes listed below
        'button',
        'icon',
        'input',
        'badge',
        'tab',
        'tooltip',
        'progress-indicator',
        'checkbox-group',
        'checkbox',
        'alert',
        'select',
        'pagination',
        'radio',
        'dialog',
        'drawer',
        'dropdown',
        'switch',
        'textarea',
      ],
    ],
  },
};
