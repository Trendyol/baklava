import { Day, Month } from "./bl-calendar.types";

export const MONTHS: Month[] = [
  { name: "January", value: 0 },
  { name: "February", value: 1 },
  { name: "March", value: 2 },
  { name: "April", value: 3 },
  { name: "May", value: 4 },
  { name: "June", value: 5 },
  { name: "July", value: 6 },
  { name: "August", value: 7 },
  { name: "September", value: 8 },
  { name: "October", value: 9 },
  { name: "November", value: 10 },
  { name: "December", value: 11 },
];

export const DAYS: Day[] = [
  { value: 0, name: "Sun" },
  { value: 1, name: "Mon" },
  { value: 2, name: "Tue" },
  { value: 3, name: "Wed" },
  { value: 4, name: "Thu" },
  { value: 5, name: "Fri" },
  { value: 6, name: "Sat" },
];

export const FIRST_MONTH_INDEX = 0;
export const LAST_MONTH_INDEX = 11;
