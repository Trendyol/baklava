import {maxLengthValidator} from "@open-wc/form-control";


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
  message:'Please use no more than undefined characters.',
  isValid(instance: HTMLElement & { validationTarget: HTMLTextAreaElement }) {
    if(instance.validationTarget){
      return (Number(instance.attributes.getNamedItem('maxlength')?.value) >= instance.validationTarget.value.length);
    }
    return true;
  }
}
