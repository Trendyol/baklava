import type {ComplexAttributeConverter} from 'lit';

export const iconConverter = (): ComplexAttributeConverter<string | boolean> => {
  return {
    fromAttribute: (value: string): string | boolean => {
      if (!value || value === 'true') return true;
      if (value === 'false') return false;
      return value;
    },
  }
};
