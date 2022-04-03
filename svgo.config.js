module.exports = {
  multipass: true,
  js2svg: {
    indent: 2, // string with spaces or number of spaces. 4 by default
    pretty: true, // boolean, false by default
  },
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          cleanupNumericValues: {
            floatPrecision: 2,
          },
          // disable plugins
          anotherBuiltinPlugin: false,
          addAttributesToSVGElement: false,
          addClassesToSVGElement: false,
          removeElementsByAttr: false,
          removeAttrs: false,
          removeRasterImages: false,
          removeUnusedNS: false,
          removeViewBox: false,
          removeXMLNS: false,
          sortAttrs: false,
        },
      },
    },
  ],
};
