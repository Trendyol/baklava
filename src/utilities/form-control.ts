import { maxLengthValidator, programmaticValidator, SyncValidator } from "@open-wc/form-control";

const validityStates: Array<keyof ValidityState> = [
  "valueMissing",
  "typeMismatch",
  "tooLong",
  "tooShort",
  "rangeUnderflow",
  "rangeOverflow",
  "stepMismatch",
  "badInput",
  "patternMismatch",
];

export const innerInputValidators: SyncValidator[] = validityStates.map(key => ({
  key,
  isValid(instance: HTMLElement & { validationTarget: HTMLInputElement }) {
    if (instance.validationTarget) {
      return !instance.validationTarget.validity[key];
    }
    return true;
  },
  message: "",
}));

innerInputValidators.push(programmaticValidator as SyncValidator);

export const textareaLengthValidator = {
  ...maxLengthValidator,
  isValid(instance: HTMLElement & { validationTarget: HTMLTextAreaElement }) {
    if (instance.validationTarget && instance.getAttribute("maxlength")) {
      return Number(instance.getAttribute("maxlength")) >= instance.validationTarget.value.length;
    }
    return true;
  },
};

export const textAreaValidators = [...innerInputValidators, textareaLengthValidator];
