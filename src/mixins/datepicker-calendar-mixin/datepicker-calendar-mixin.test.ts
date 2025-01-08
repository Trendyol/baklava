import { html } from "lit";
import { expect, fixture } from "@open-wc/testing";
import DatepickerCalendarMixin from "./datepicker-calendar-mixin";
import { CALENDAR_TYPES } from "../../components/calendar/bl-calendar.constant";
import sinon from "sinon";

class TestDatepickerCalendar extends DatepickerCalendarMixin {
}

customElements.define("test-datepicker-calendar", TestDatepickerCalendar);

describe("DatepickerCalendarMixin", () => {
  let element: TestDatepickerCalendar;

  beforeEach(async () => {
    element = await fixture<TestDatepickerCalendar>(
      html`
        <test-datepicker-calendar></test-datepicker-calendar>`
    );
  });

  it("should correctly set and get disabledDates from a string", () => {
    element.disabledDates = "2024-01-01,2024-01-15";
    expect(element.disabledDates).to.have.length(2);
    expect(element.disabledDates[0].getTime()).to.equal(new Date("2024-01-01").getTime());
    expect(element.disabledDates[1].getTime()).to.equal(new Date("2024-01-15").getTime());
  });

  it("should correctly set and get disabledDates from an array of dates", () => {
    const disabledDatesArray = [new Date("2024-01-01"), new Date("2024-01-15")];

    element.disabledDates = disabledDatesArray;
    expect(element.disabledDates).to.deep.equal(disabledDatesArray);
  });

  it("should not add invalid dates to disabledDates", () => {
    element.disabledDates = "invalid-date,2024-01-15";
    expect(element.disabledDates).to.have.length(1);
    expect(element.disabledDates[0].getTime()).to.equal(new Date("2024-01-15").getTime());
  });

  it("should set and get minDate correctly", () => {
    const minDate = new Date(2024,1,1);

    element.minDate = minDate;
    expect(element.minDate.getTime()).to.equal(minDate.getTime());
  });

  it("should log a warning if minDate is greater than maxDate", () => {
    const consoleSpy = sinon.spy(console, "warn");

    element.maxDate = new Date("2024-01-01");
    element.minDate = new Date("2024-02-01");
    expect(consoleSpy.calledWith("minDate cannot be greater than maxDate.")).to.be.true;
    consoleSpy.restore();
  });

  it("should set and get maxDate correctly", () => {
    const maxDate = new Date(2024,12,31);

    element.maxDate = maxDate;
    expect(element.maxDate.getTime()).to.equal(maxDate.getTime());
  });

  it("should log a warning if maxDate is smaller than minDate", () => {
    const consoleSpy = sinon.spy(console, "warn");

    element.minDate = new Date("2024-12-31");
    element.maxDate = new Date("2024-01-01");
    expect(consoleSpy.calledWith("maxDate cannot be smaller than minDate.")).to.be.true;
    consoleSpy.restore();
  });

  it("should correctly parse value from a string", () => {
    const valueString = "2024-01-01,2024-01-15";

    element.type = CALENDAR_TYPES.MULTIPLE;
    element.value = valueString;
    expect(element._selectedDates).to.be.an("array");
    expect(element._selectedDates).to.have.length(2);
    expect((element._selectedDates)[0].getTime()).to.equal(new Date("2024-01-01").getTime());
    expect((element._selectedDates)[1].getTime()).to.equal(new Date("2024-01-15").getTime());
  });

  it("should correctly parse value from a Date object", () => {
    const dateValue = new Date("2024-01-01");

    element.type = CALENDAR_TYPES.SINGLE;
    element.value = dateValue;
    expect(element.value).to.equal(dateValue);
  });

  it("should log a warning if value type is invalid for CALENDAR_TYPES.SINGLE", () => {
    const consoleSpy = sinon.spy(console, "warn");

    element.type = CALENDAR_TYPES.SINGLE;
    element.value = [new Date("2024-01-01"), new Date("2024-01-15")];
    expect(consoleSpy.calledWith("'value' must be a single Date for single type selection.")).to.be
      .true;
    consoleSpy.restore();
  });

  it("should log a warning if value type is invalid for CALENDAR_TYPES.RANGE", () => {
    const consoleSpy = sinon.spy(console, "warn");

    element.type = CALENDAR_TYPES.RANGE;
    element.value = [new Date("2024-01-01")];
    expect(
      consoleSpy.calledWith(
        "'value' must be an array of two Date objects when the type selection mode is set to range."
      )
    ).to.be.true;
    consoleSpy.restore();
  });

  it("should update selectedDates when value changes", () => {
    const dateValue = new Date("2024-01-01");

    element.type = CALENDAR_TYPES.SINGLE;
    element.value = dateValue;
    expect(element._selectedDates).to.deep.equal([dateValue]);
  });

  it("should not update selectedDates if value is invalid", () => {
    const originalSelectedDates = [...element._selectedDates];

    element.value = "invalid-date";
    expect(element._selectedDates).to.deep.equal(originalSelectedDates);
  });
});
