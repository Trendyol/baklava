import {
  maskitoAddOnFocusPlugin,
  maskitoCaretGuard,
  maskitoPrefixPostprocessorGenerator,
  maskitoRemoveOnBlurPlugin,
} from '@maskito/kit';

export default {
  mask: [
    '+',
    '7',
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
    '-',
    /\d/,
    /\d/,
  ],
  postprocessors: [maskitoPrefixPostprocessorGenerator('+7 ')],
  preprocessors: [createCompletePhoneInsertionPreprocessor()],
  plugins: [
    maskitoAddOnFocusPlugin('+7 '),
    maskitoRemoveOnBlurPlugin('+7 '),
    maskitoCaretGuard((value, [from, to]) => [
      from === to ? '+7 '.length : 0,
      value.length,
    ]),
  ],
};

function createCompletePhoneInsertionPreprocessor() {
  const trimPrefix = (value) => value.replace(/^(\+?7?\s?8?)\s?/, '');
  const countDigits = (value) => value.replaceAll(/\D/g, '').length;

  return ({ elementState, data }) => {
    const { value, selection } = elementState;

    return {
      elementState: {
        selection,
        value: countDigits(value) > 11 ? trimPrefix(value) : value,
      },
      data: countDigits(data) >= 11 ? trimPrefix(data) : data,
    };
  };
}
