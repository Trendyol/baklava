import {
  maskitoAddOnFocusPlugin,
  maskitoCaretGuard,
  maskitoPostfixPostprocessorGenerator,
  maskitoPrefixPostprocessorGenerator,
  maskitoRemoveOnBlurPlugin,
} from '@maskito/kit';

export default {
  mask: /^\$?\d*(\.0{0,2})?$/,
  postprocessors: [
    maskitoPrefixPostprocessorGenerator('$'),
    maskitoPostfixPostprocessorGenerator('.00'),
  ],
  plugins: [
    maskitoAddOnFocusPlugin('$.00'),
    maskitoRemoveOnBlurPlugin('$.00'),
    maskitoCaretGuard((value) => ['$'.length, value.length - '.00'.length]),
  ],
};
