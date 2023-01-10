import {maxLengthValidator, requiredValidator} from "@open-wc/form-control";


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

export const textareaLengthValidator = {
  ...maxLengthValidator,
  message:'You have exceeded the character limit',
  isValid(instance: HTMLElement & { validationTarget: HTMLTextAreaElement }) {
    if(instance.validationTarget && instance.attributes.getNamedItem('maxLength')){
      return (Number(instance.attributes.getNamedItem('maxlength')?.value) >= instance.validationTarget.value.length);
    }
    return true;
  }
};

export const textAreaValidators = [
    ...innerInputValidators,
  textareaLengthValidator,
  requiredValidator
]
