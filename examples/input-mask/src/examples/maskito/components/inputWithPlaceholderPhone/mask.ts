import {MaskitoOptions, maskitoUpdateElement} from '@maskito/core';
import {
  maskitoEventHandler,
  maskitoPrefixPostprocessorGenerator,
  maskitoWithPlaceholder,
} from '@maskito/kit';

const PLACEHOLDER = '+  (   ) ___-____';
const { removePlaceholder, plugins, ...placeholderOptions } =
  maskitoWithPlaceholder(PLACEHOLDER);

export const options = {
  preprocessors: placeholderOptions.preprocessors,
  postprocessors: [
    maskitoPrefixPostprocessorGenerator('+1'),
    ...placeholderOptions.postprocessors,
  ],
  mask: [
    '+',
    '1',
    ' ',
    '(',
    /\d/,
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ],
  plugins: [
    ...plugins,
    maskitoEventHandler('focus', (element) => {
      const initialValue = element.value || '+1 (';

      maskitoUpdateElement(
        element,
        initialValue + PLACEHOLDER.slice(initialValue.length),
      );
    }),
    maskitoEventHandler('blur', (element) => {
      const cleanValue = removePlaceholder(element.value);

      maskitoUpdateElement(element, cleanValue === '+1' ? '' : cleanValue);
    }),
  ],
} as MaskitoOptions;
