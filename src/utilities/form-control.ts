import { maxLengthValidator, SyncValidator } from "@open-wc/form-control";

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

innerInputValidators.push({
  key: "customError",
  attribute: "error",
  message(instance) {
    return instance.error;
  },
  isValid(instance: HTMLElement & { error: string; validationTarget: HTMLInputElement }) {
    if (instance.error) {
      return false;
    }

    if (instance.validationTarget) {
      return !instance.validationTarget.validity["customError"];
    }

    return true;
  },
});

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
