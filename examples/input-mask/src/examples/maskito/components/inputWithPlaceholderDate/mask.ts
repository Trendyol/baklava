import {MaskitoOptions} from "@maskito/core";
import {
  maskitoDateOptionsGenerator,
  maskitoWithPlaceholder,
} from '@maskito/kit';

export const PLACEHOLDER = 'dd/mm/yyyy';

const dateOptions = maskitoDateOptionsGenerator({
  mode: 'dd/mm/yyyy',
  separator: '/',
});

const { plugins, ...placeholderOptions } = maskitoWithPlaceholder(
  PLACEHOLDER,
  true,
);

export const options = {
  ...dateOptions,
  plugins: plugins.concat(dateOptions.plugins || []),
  preprocessors: [
    ...placeholderOptions.preprocessors,
    ...dateOptions.preprocessors,
  ],
  postprocessors: [
    ...dateOptions.postprocessors,
    ...placeholderOptions.postprocessors,
  ],
} as MaskitoOptions;
