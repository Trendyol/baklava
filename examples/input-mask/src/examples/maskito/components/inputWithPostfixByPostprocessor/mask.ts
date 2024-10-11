import {MaskitoOptions} from "@maskito/core";
import {
  maskitoAddOnFocusPlugin,
  maskitoCaretGuard,
  maskitoPostfixPostprocessorGenerator,
  maskitoPrefixPostprocessorGenerator,
  maskitoRemoveOnBlurPlugin,
} from '@maskito/kit';

export const options = {
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
} as MaskitoOptions;
