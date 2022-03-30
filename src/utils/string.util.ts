const LEADING_WHITESPACE_REGEX = /^\s*/g;
const CONSECUTIVE_WHITESPACE_REGEX = /\s\s+/g;

const _removeLeadingSpaces = (string: string): string => {
  return string.replace(LEADING_WHITESPACE_REGEX, '');
};

const _removeConsecutiveSpaces = (string: string): string => {
  return string.replace(CONSECUTIVE_WHITESPACE_REGEX, ' ');
};

export const trimInputValue = (string: string): string => {
  if (typeof string !== 'string') return string;
  let tempString = string;
  tempString = _removeLeadingSpaces(tempString);
  tempString = _removeConsecutiveSpaces(tempString);
  return tempString;
};
