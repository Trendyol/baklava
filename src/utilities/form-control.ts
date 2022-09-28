const validityStates: Array<keyof ValidityState> = [
  'valueMissing',
  'typeMismatch',
  'tooLong',
  'tooShort',
  'rangeUnderflow',
  'rangeOverflow',
  'badInput',
  'customError',
];

export const innerInputValidators = validityStates.map(key => ({
  key,
  isValid(instance: HTMLElement & { validationTarget: HTMLInputElement }) {
    if (instance.validationTarget) {
      return !instance.validationTarget.validity[key];
    }
    return true;
  },
}));
