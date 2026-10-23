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

  describe("pointer interaction", () => {
    const fixtureScrollableGroup = () =>
      fixture<HTMLDivElement>(html`
        <div style="height: 120px; overflow-y: auto">
          <bl-radio-group label="Payment Type" name="pt">
            <bl-radio value="1">Option 1</bl-radio>
            <bl-radio value="2">Option 2</bl-radio>
            <bl-radio value="3">Option 3</bl-radio>
            <bl-radio value="4">Option 4</bl-radio>
            <bl-radio value="5">Option 5</bl-radio>
            <bl-radio value="6">Option 6</bl-radio>
          </bl-radio-group>
        </div>
      `);

    it("should keep the focus on the pressed option", async () => {
      //when
      const container = await fixtureScrollableGroup();
      const group = container.querySelector<BlRadioGroup>("bl-radio-group")!;

      await elementUpdated(group);

      container.scrollTop = container.scrollHeight;

      const lastOption = group.options[group.options.length - 1];

      //given a press below the fold: pointerdown reaches the group before focus moves
      lastOption.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, composed: true }));
      group.focus();
      await elementUpdated(group);

      //then
      expect(document.activeElement).to.equal(lastOption);
      expect(container.scrollTop).to.be.greaterThan(0);
    });

    it("should keep the previous position when a disabled option is pressed", async () => {
      //when
      const el = await fixture<HTMLDivElement>(html`
        <div>
          <input id="previnput" /><bl-radio-group label="Payment Type" name="pt">
            <bl-radio value="1">Option 1</bl-radio>
            <bl-radio value="2" disabled>Option 2</bl-radio>
            <bl-radio value="3">Option 3</bl-radio>
          </bl-radio-group>
        </div>
      `);

      await elementUpdated(el);

      el.querySelector<HTMLInputElement>("#previnput")?.focus();

      const group = el.querySelector<BlRadioGroup>("bl-radio-group")!;

      //given
      await sendKeys({ press: "Tab" });
      await sendKeys({ press: "ArrowRight" });

      expect(document.activeElement).to.equal(group.options[2]);

      group.options[1].dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, composed: true }));
      group.focus();
      await elementUpdated(group);

      //then
      expect(document.activeElement).to.equal(group.options[2]);
    });

    it("should keep the previous position when a press lands outside of an option", async () => {
      //when
      const group = await fixture<BlRadioGroup>(html`<bl-radio-group label="Payment Type" name="pt">
        <bl-radio value="1">Option 1</bl-radio>
        <bl-radio value="2">Option 2</bl-radio>
      </bl-radio-group>`);

      await elementUpdated(group);

      //given
      group.options[1].select();
      await elementUpdated(group);
      group.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
      group.focus();
      await elementUpdated(group);

      //then
      expect(document.activeElement).to.equal(group.options[1]);
    });

    it("should continue keyboard navigation from the option checked with a pointer", async () => {
      //when
      const el = await fixture<HTMLDivElement>(html`
        <div>
          <input id="previnput" /><bl-radio-group label="Payment Type" name="pt">
            <bl-radio value="1">Option 1</bl-radio>
            <bl-radio value="2">Option 2</bl-radio>
            <bl-radio value="3">Option 3</bl-radio>
          </bl-radio-group>
        </div>
      `);

      await elementUpdated(el);

      const group = el.querySelector<BlRadioGroup>("bl-radio-group")!;

      //given
      group.options[2].select();
      await elementUpdated(group);
      el.querySelector<HTMLInputElement>("#previnput")?.focus();
      await sendKeys({ press: "Tab" });
      await sendKeys({ press: "ArrowRight" });

      //then the navigation continues from the last option and wraps around
      expect(document.activeElement).to.equal(group.options[0]);
    });
  });
});
