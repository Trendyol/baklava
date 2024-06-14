import {
  maskitoAddOnFocusPlugin,
  maskitoPrefixPostprocessorGenerator,
  maskitoRemoveOnBlurPlugin,
} from '@maskito/kit';

export default {
  mask: /^\$?\d*$/,
  postprocessors: [maskitoPrefixPostprocessorGenerator('$')],
  plugins: [maskitoAddOnFocusPlugin('$'), maskitoRemoveOnBlurPlugin('$')],
};
