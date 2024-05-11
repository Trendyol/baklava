export type DayValues = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type CalendarView = "days" | "months" | "years";

export type CalendarType = "single" | "multiple" | "range";
export type CalendarDay = { value: number; name: string };
export type CalendarDate = Date;

export type RangePickerDates = {
  startDate: CalendarDate | undefined;
  endDate: CalendarDate | undefined;
};

export type Calendar = Map<string, CalendarDate[]>;
