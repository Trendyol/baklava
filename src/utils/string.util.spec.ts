import { trimInputValue } from './string.util';

const testCases = [
  'test',
  'test ',
  ' test ',
  ' test  ',
  '  test  ',
  '      test',
  '      test test',
  '      test test ',
  '      test test      ',
  ' test test test ',
];

const expectedResults = [
  'test',
  'test ',
  'test ',
  'test ',
  'test ',
  'test',
  'test test',
  'test test ',
  'test test ',
  'test test test ',
];

describe('string.util', () => {
  it('should trim value given', () => {
    const result = <string[]>[];
    testCases.forEach(string => {
      const formattedString = trimInputValue(string);
      result.push(formattedString);
    });
    expect(result).toStrictEqual(expectedResults);
  });
});
