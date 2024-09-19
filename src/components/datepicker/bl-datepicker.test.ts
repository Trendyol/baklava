import { aTimeout, expect, fixture, html } from "@open-wc/testing";
import BlDatepicker, { blDatepickerChangedEvent } from "./bl-datepicker";
import { BlButton, BlDatePicker } from "../../baklava";
import { blCalendarChangedEvent } from "../calendar/bl-calendar";

describe("BlDatepicker", () => {
  let element : BlDatepicker;

  beforeEach(async () => {
    element = await fixture<BlDatePicker>(html`<bl-datepicker type="single" locale="en"></bl-datepicker>`);
    await element.updateComplete;
  });

  it("should instantiate the component", () => {
    expect(document.createElement("bl-datepicker")).instanceOf(HTMLElement);
  });

  it("should render the datepicker component", () => {
    expect(element).to.exist;
    expect(element.shadowRoot).to.exist;
  });

  it("should have default empty value", () => {
    expect(element._value).to.equal("");
  });

  it("should set placeholder correctly", async () => {
    element.placeholder = "Select a date";
    await element.updateComplete;

    expect(element._inputEl?.placeholder).to.equal("Select a date");
  });

  it("should open the popover when input is clicked", async () => {

    element._inputEl?.click(); // Simulate clicking the input
    await element.updateComplete;

    expect(element._popoverEl).to.exist;
    expect(element._popoverEl?.visible).to.be.true; // Assert that the popover is visible
  });

  it("should close the popover after selecting a date", async () => {

    element._inputEl?.click();
    await element.updateComplete;

    element._calendarEl?.dispatchEvent(new CustomEvent(blCalendarChangedEvent, { detail: [new Date()] }));
    await element.updateComplete;
    await aTimeout(400);
    expect(element._selectedDates.length).to.equal(1);
    expect(element._popoverEl.visible).to.be.false;
  });

  it("should trigger datepicker change event on date selection", async () => {
    const testDate = new Date(2023, 1, 1);

    element.addEventListener(blDatepickerChangedEvent, (event) => {
      const customEvent = event as CustomEvent;

      expect(customEvent).to.exist;
      expect(customEvent.detail).to.deep.equal([testDate]);

    });

    // Simulate the calendar change event that triggers the datepicker change
    element._calendarEl.dispatchEvent(new CustomEvent(blCalendarChangedEvent, { detail: [testDate] }));

    await element.updateComplete;
  });

  it("should clear selected dates when clear button is clicked", async () => {
    element._selectedDates = [new Date(2023, 1, 1)];
    await element.updateComplete;

    const clearButton = element.shadowRoot?.querySelector("bl-button") as BlButton;

    clearButton?.click();
    await element.updateComplete;

    expect(element._selectedDates).to.deep.equal([]);
    expect(element._value).to.equal("");
  });
});
