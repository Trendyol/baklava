import {MaskitoOptions} from "@maskito/core";
import {
  maskitoAddOnFocusPlugin,
  maskitoPrefixPostprocessorGenerator,
  maskitoRemoveOnBlurPlugin,
} from '@maskito/kit';

export const options = {
  mask: /^\$?\d*$/,
  postprocessors: [maskitoPrefixPostprocessorGenerator('$')],
  plugins: [maskitoAddOnFocusPlugin('$'), maskitoRemoveOnBlurPlugin('$')],
} as MaskitoOptions;
