export function stringToDateArray(value: string): Date[] {
  const tempValue: Date[] = [];
  const splitDates = value.split(",");

  splitDates?.forEach(date => {
    const isDate = new Date(date.trim());

    if (!isNaN(isDate.getTime())) {
      tempValue.push(isDate);
    }
  });
  return tempValue;
}
