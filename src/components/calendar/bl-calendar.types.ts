type MonthNames =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

type DayNames = "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";

export type MonthValues = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
export type DayValues = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type CalendarView = "days" | "months" | "years";

export type CalendarType = "single" | "multiple" | "range";
export type Month = { value: MonthValues; name: MonthNames };
export type Day = { value: DayValues; name: DayNames };

export type SelectedDate = { day: number; month: number; year: number };

export type CalendarDay = {
  day: number;
  month: number;
  year: number;
};

export type Calendar = Map<string, CalendarDay[]>;
