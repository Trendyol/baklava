import { html } from "lit";
import { expect, fixture } from "@open-wc/testing";
import DatepickerCalendarMixin from "./datepicker-calendar-mixin";
import { CALENDAR_TYPES } from "../../components/calendar/bl-calendar.constant";
import sinon from "sinon";

class TestDatepickerCalendar extends DatepickerCalendarMixin {}

customElements.define("test-datepicker-calendar", TestDatepickerCalendar);

describe("DatepickerCalendarMixin", () => {
  let element: TestDatepickerCalendar;
  let consoleSpy: sinon.SinonSpy;

  beforeEach(async () => {
    element = await fixture<TestDatepickerCalendar>(
      html`
        <test-datepicker-calendar></test-datepicker-calendar>`
    );
    consoleSpy = sinon.spy(console, "warn");
  });

  afterEach(() => {
    consoleSpy.restore();
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
    const minDate = new Date(2024, 1, 1);

    element.minDate = minDate;
    expect(element.minDate.getTime()).to.equal(minDate.getTime());
  });

  it("should log a warning if minDate is greater than maxDate", () => {
    element.maxDate = new Date("2024-01-01");
    element.minDate = new Date("2024-02-01");
    expect(consoleSpy.calledWith("minDate cannot be greater than maxDate.")).to.be.true;
  });

  it("should set and get maxDate correctly", () => {
    const maxDate = new Date(2024, 12, 31);

    element.maxDate = maxDate;
    expect(element.maxDate.getTime()).to.equal(maxDate.getTime());
  });

  it("should log a warning if maxDate is smaller than minDate", () => {
    element.minDate = new Date("2024-12-31");
    element.maxDate = new Date("2024-01-01");
    expect(consoleSpy.calledWith("maxDate cannot be smaller than minDate.")).to.be.true;
  });

  it("should correctly parse value from a Date object", () => {
    const dateValue = new Date("2024-01-01");

    element.type = CALENDAR_TYPES.SINGLE;
    element.value = dateValue;
    expect(element.value).to.equal(dateValue);
  });

  it("should warn for invalid minDate value", () => {
    element.minDate = new Date("invalid date");
    expect(consoleSpy.calledWith("Invalid minDate value.")).to.be.true;
  });

  it("should warn for invalid maxDate value", () => {
    element.maxDate = new Date("invalid date");
    expect(consoleSpy.calledWith("Invalid maxDate value.")).to.be.true;
  });
});
