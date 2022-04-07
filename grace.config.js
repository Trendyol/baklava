const destBasePath = 'dist';
module.exports = {
  destBasePath,
  assets: {
    dir: ['src/assets'],
    sync: ['dist', '.storybook/static/dist'],
  },
  css: {
    global: [
      {
        src: '.storybook/storybook.css',
        dest: `${destBasePath}/storybook.css`,
      },
    ],
    fouc: {
      enabled: true,
      dest: `${destBasePath}/fouc.css`,
    },
  },
};
