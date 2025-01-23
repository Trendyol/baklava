import { stringToDateArray } from "./string-to-date-converter";

export function normalizeValue(value: string | Date | Date[]): Date[] {
  if (typeof value === "string") {
    return stringToDateArray(value);
  } else if (value instanceof Date) {
    return [value];
  } else {
    return value;
  }
}
