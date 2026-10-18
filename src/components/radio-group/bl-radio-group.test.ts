import { elementUpdated, expect, fixture, html } from "@open-wc/testing";
import { sendKeys } from "@web/test-runner-commands";
import BlRadioGroup from "./bl-radio-group";

describe("bl-radio-group", () => {
  it("should be defined radio group instance", () => {
    //when
    const el = document.createElement("bl-radio-group");

    //then
    expect(el).instanceOf(BlRadioGroup);
  });

  it("should be rendered with default values", async () => {
    //when
    const el = await fixture<BlRadioGroup>(
      html`<bl-radio-group label="Payment Type" name="pt">
        <bl-radio value="cc">Credit Card</bl-radio>
        <bl-radio value="ch">Cash</bl-radio>
      </bl-radio-group>`
    );

    //then
    expect(el).shadowDom.equal(
      `<fieldset
        aria-labelledby="label"
        aria-required="false"
        role="radiogroup"
       >
        <legend id="label">Payment Type</legend>
        <div class="options">
          <slot></slot>
        </div>
      </fieldset>`
    );
  });

  it("should set correct option selected with a value", async () => {
    //when
    const el = await fixture<BlRadioGroup>(
      html`<bl-radio-group label="Payment Type" name="pt" value="cc">
        <bl-radio value="cc">Credit Card</bl-radio>
        <bl-radio value="ch">Cash</bl-radio>
      </bl-radio-group>`
    );

    //then
    expect(el.options[0].checked).to.be.true;
    expect(el.options[1].checked).to.be.false;
  });

  describe("keyboard navigation", () => {
    it("should focus first option with tab key", async () => {
      //when
      const el = await fixture(
        html`<div>
          <input id="previnput" /><bl-radio-group label="Payment Type" name="pt" value="cc">
            <bl-radio value="cc">Credit Card</bl-radio>
            <bl-radio value="ch">Cash</bl-radio> </bl-radio-group
          ><input id="nextinput" />
        </div>`
      );

      await elementUpdated(el);

      el.querySelector<HTMLInputElement>("#previnput")?.focus();

      const radioGroup = el.querySelector("bl-radio-group");

      //given
      await sendKeys({
        press: "Tab",
      });

      //then
      expect(document.activeElement).to.equal(radioGroup?.options[0]);
    });

    it("should focus next option with right arrow key", async () => {
      //when
      const el = await fixture(
        html`<div>
          <input id="previnput" /><bl-radio-group label="Payment Type" name="pt" value="cc">
            <bl-radio value="cc">Credit Card</bl-radio>
            <bl-radio value="ch">Cash</bl-radio> </bl-radio-group
          ><input id="nextinput" />
        </div>`
      );

      await elementUpdated(el);

      el.querySelector<HTMLInputElement>("#previnput")?.focus();

      const radioGroup = el.querySelector("bl-radio-group");

      //given
      await sendKeys({
        press: "Tab",
      });
      await sendKeys({
        press: "ArrowRight",
      });

      //then
      expect(document.activeElement).to.equal(radioGroup?.options[1]);
    });

    it("should focus next option with down arrow key", async () => {
      //when
      const el = await fixture(
        html`<div>
          <input id="previnput" /><bl-radio-group label="Payment Type" name="pt" value="cc">
            <bl-radio value="cc">Credit Card</bl-radio>
            <bl-radio value="ch">Cash</bl-radio> </bl-radio-group
          ><input id="nextinput" />
        </div>`
      );

      await elementUpdated(el);

      el.querySelector<HTMLInputElement>("#previnput")?.focus();

      const radioGroup = el.querySelector("bl-radio-group");

      //given
      await sendKeys({
        press: "Tab",
      });
      await sendKeys({
        press: "ArrowDown",
      });

      //then
      expect(document.activeElement).to.equal(radioGroup?.options[1]);
    });

    it("should focus previous option with up arrow key", async () => {
      //when
      const el = await fixture(
        html`<div>
          <input id="previnput" /><bl-radio-group label="Payment Type" name="pt" value="cc">
            <bl-radio value="cc">Credit Card</bl-radio>
            <bl-radio value="ch">Cash</bl-radio> </bl-radio-group
          ><input id="nextinput" />
        </div>`
      );

      await elementUpdated(el);

      el.querySelector<HTMLInputElement>("#previnput")?.focus();

      const radioGroup = el.querySelector("bl-radio-group");

      //given
      await sendKeys({
        press: "Tab",
      });
      await sendKeys({
        press: "ArrowDown",
      });
      await sendKeys({
        press: "ArrowUp",
      });

      //then
      expect(document.activeElement).to.equal(radioGroup?.options[0]);
    });
  });

  it("should focus previous option with left arrow key", async () => {
    //when
    const el = await fixture(
      html`<div>
        <input id="previnput" /><bl-radio-group label="Payment Type" name="pt" value="cc">
          <bl-radio value="cc">Credit Card</bl-radio>
          <bl-radio value="ch">Cash</bl-radio> </bl-radio-group
        ><input id="nextinput" />
      </div>`
    );

    await elementUpdated(el);

    el.querySelector<HTMLInputElement>("#previnput")?.focus();

    const radioGroup = el.querySelector("bl-radio-group");

    //given
    await sendKeys({
      press: "Tab",
    });
    await sendKeys({
      press: "ArrowRight",
    });
    await sendKeys({
      press: "ArrowLeft",
    });

    //then
    expect(document.activeElement).to.equal(radioGroup?.options[0]);
  });

  it("should select current option with space key", async () => {
    //when
    const el = await fixture(
      html`<div>
        <input id="previnput" /><bl-radio-group label="Payment Type" name="pt" value="cc">
          <bl-radio value="cc">Credit Card</bl-radio>
          <bl-radio value="ch">Cash</bl-radio> </bl-radio-group
        ><input id="nextinput" />
      </div>`
    );

    await elementUpdated(el);

    el.querySelector<HTMLInputElement>("#previnput")?.focus();

    const radioGroup = el.querySelector("bl-radio-group");

    //given
    await sendKeys({
      press: "Tab",
    });
    await sendKeys({
      press: "ArrowRight",
    });
    await sendKeys({
      press: " ",
    });

    //then
    expect(radioGroup?.value).to.equal("cc");
  });

  it("should not respond any other keys", async () => {
    //when
    const el = await fixture(
      html`<div>
        <input id="previnput" /><bl-radio-group label="Payment Type" name="pt" value="cc">
          <bl-radio value="cc">Credit Card</bl-radio>
          <bl-radio value="ch">Cash</bl-radio> </bl-radio-group
        ><input id="nextinput" />
      </div>`
    );

    await elementUpdated(el);

    el.querySelector<HTMLInputElement>("#previnput")?.focus();

    const radioGroup = el.querySelector("bl-radio-group");

    //given
    await sendKeys({
      press: "Tab",
    });
    await sendKeys({
      press: "A",
    });

    //then
    expect(document.activeElement).to.equal(radioGroup?.options[0]);
  });

  it("should wrap to first option when navigating past last option with arrow right", async () => {
    //when
    const el = await fixture(
      html`<div>
        <input id="previnput" /><bl-radio-group label="Payment Type" name="pt" value="cc">
          <bl-radio value="cc">Credit Card</bl-radio>
          <bl-radio value="ch">Cash</bl-radio> </bl-radio-group
        ><input id="nextinput" />
      </div>`
    );

    await elementUpdated(el);

    el.querySelector<HTMLInputElement>("#previnput")?.focus();

    const radioGroup = el.querySelector("bl-radio-group");

    //given
    await sendKeys({
      press: "Tab",
    });
    await sendKeys({
      press: "ArrowRight",
    });
    await sendKeys({
      press: "ArrowRight",
    });

    //then
    expect(document.activeElement).to.equal(radioGroup?.options[0]);
  });

  it("should wrap to last option when navigating before first option with arrow left", async () => {
    //when
    const el = await fixture(
      html`<div>
        <input id="previnput" /><bl-radio-group label="Payment Type" name="pt" value="cc">
          <bl-radio value="cc">Credit Card</bl-radio>
          <bl-radio value="ch">Cash</bl-radio> </bl-radio-group
        ><input id="nextinput" />
      </div>`
    );

    await elementUpdated(el);

    el.querySelector<HTMLInputElement>("#previnput")?.focus();

    const radioGroup = el.querySelector("bl-radio-group");

    //given
    await sendKeys({
      press: "Tab",
    });
    await sendKeys({
      press: "ArrowLeft",
    });

    //then
    expect(document.activeElement).to.equal(radioGroup?.options[1]);
  });

  describe("when there is no option to navigate to", () => {
    const withErrorCapture = (run: () => void) => {
      const messages: string[] = [];
      const collect = (event: Event) => messages.push((event as ErrorEvent).message);

      window.addEventListener("error", collect);
      run();
      window.removeEventListener("error", collect);

      return messages;
    };

    const pressOn = (group: BlRadioGroup, key: string) => {
      const event = new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true });
      const messages = withErrorCapture(() => group.dispatchEvent(event));

      return { event, messages };
    };

    const disabledGroup = () =>
      fixture<BlRadioGroup>(html`<bl-radio-group label="Payment Type" name="pt">
        <bl-radio value="cc" disabled>Credit Card</bl-radio>
        <bl-radio value="ch" disabled>Cash</bl-radio>
      </bl-radio-group>`);

    it("should keep the focus on the group itself when every option is disabled", async () => {
      //when
      const group = await disabledGroup();

      //then
      expect(group.availableOptions).to.be.empty;
      expect(withErrorCapture(() => group.focus())).to.be.empty;
      expect(document.activeElement).to.equal(group);
    });

    it("should not consume arrow keys and select nothing when every option is disabled", async () => {
      //given
      const group = await disabledGroup();

      //when
      const next = pressOn(group, "ArrowDown");
      const previous = pressOn(group, "ArrowUp");
      const select = pressOn(group, " ");

      //then
      expect([...next.messages, ...previous.messages, ...select.messages]).to.be.empty;
      expect(next.event.defaultPrevented).to.be.false;
      expect(previous.event.defaultPrevented).to.be.false;
      expect(select.event.defaultPrevented).to.be.false;
      expect(group.value).to.equal("");
    });

    it("should not consume arrow keys when no option is slotted yet", async () => {
      //given
      const group = await fixture<BlRadioGroup>(
        html`<bl-radio-group label="Payment Type" name="pt"></bl-radio-group>`
      );

      //when
      const { messages, event } = pressOn(group, "ArrowRight");

      //then
      expect(messages).to.be.empty;
      expect(event.defaultPrevented).to.be.false;
    });

    it("should move to an option that is still available when the last focused one is disabled", async () => {
      //given
      const group = await fixture<BlRadioGroup>(html`<bl-radio-group label="Payment Type" name="pt">
        <bl-radio value="cc">Credit Card</bl-radio>
        <bl-radio value="ch">Cash</bl-radio>
        <bl-radio value="pp">Pay with balance</bl-radio>
      </bl-radio-group>`);

      await elementUpdated(group);

      const [first, second, third] = group.options;

      pressOn(group, "ArrowDown");
      pressOn(group, "ArrowDown");
      expect(document.activeElement).to.equal(third);

      //when the options the stored index points at are disabled while the group is focused
      second.disabled = true;
      third.disabled = true;

      const { messages } = pressOn(group, "ArrowUp");

      //then
      expect(messages).to.be.empty;
      expect(document.activeElement).to.equal(first);
      expect(first.checked).to.be.true;
    });
  });
});
