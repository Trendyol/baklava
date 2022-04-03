const destBasePath = 'dist';
module.exports = {
  destBasePath,
  assets: {
    dir: ['src/assets'],
    sync: ['dist', 'src/.storybook/static/dist'],
  },
  css: {
    global: [
      {
        src: 'src/shared.css',
        dest: `${destBasePath}/shared.css`,
      },
      {
        src: 'src/.storybook/storybook.css',
        dest: `${destBasePath}/storybook.css`,
      },
    ],
    fouc: {
      enabled: true,
      dest: `${destBasePath}/fouc.css`,
    },
  },
};
