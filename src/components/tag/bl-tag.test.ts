import { assert, elementUpdated, expect, fixture, html, oneEvent } from "@open-wc/testing";
import BlTag from "./bl-tag";

describe("bl-tag", () => {
  it("is defined", () => {
    const el = document.createElement("bl-tag");

    assert.instanceOf(el, BlTag);
  });

  it("renders with default values", async () => {
    const el = await fixture<BlTag>(html`<bl-tag>Default Tag</bl-tag>`);

    assert.shadowDom.equal(
      el,
      `
      <button class="tag" role="checkbox">
        <slot></slot>
      </button>
      `
    );
    expect(el.size).to.equal("medium");
    expect(el.variant).to.equal("selectable");
    expect(el.selected).to.be.false;
    expect(el.disabled).to.be.false;
  });

  describe("variants", () => {
    it("renders selectable variant correctly", async () => {
      const el = await fixture<BlTag>(html`<bl-tag variant="selectable">Selectable Tag</bl-tag>`);
      const button = el.shadowRoot?.querySelector("button");

      expect(button).to.exist;
      expect(button?.getAttribute("role")).to.equal("checkbox");
    });

    it("renders removable variant correctly", async () => {
      const el = await fixture<BlTag>(html`<bl-tag variant="removable">Removable Tag</bl-tag>`);
      const removeButton = el.shadowRoot?.querySelector(".remove-button");

      expect(removeButton).to.exist;
      expect(removeButton?.getAttribute("icon")).to.equal("close");
    });
  });

  describe("sizes", () => {
    it("applies small size correctly", async () => {
      const el = await fixture<BlTag>(html`<bl-tag size="small">Small Tag</bl-tag>`);

      expect(el.getAttribute("size")).to.equal("small");
    });

    it("applies large size correctly", async () => {
      const el = await fixture<BlTag>(html`<bl-tag size="large">Large Tag</bl-tag>`);

      expect(el.getAttribute("size")).to.equal("large");
    });
  });

  describe("icons", () => {
    it("renders with custom icon", async () => {
      const el = await fixture<BlTag>(html`<bl-tag icon="info">Icon Tag</bl-tag>`);
      const icon = el.shadowRoot?.querySelector("bl-icon");

      expect(icon).to.exist;
      expect(icon?.getAttribute("name")).to.equal("info");
    });

    it("renders with slotted icon", async () => {
      const el = await fixture<BlTag>(
        html`<bl-tag><bl-icon slot="icon" name="info"></bl-icon>Slotted Icon Tag</bl-tag>`
      );

      await el.updateComplete;

      const slottedIcon = el.querySelector('bl-icon[slot="icon"]');

      expect(slottedIcon).to.exist;
      expect(slottedIcon?.getAttribute("name")).to.equal("info");
    });
  });

  describe("interactions", () => {
    it("toggles selected state on click for selectable variant", async () => {
      const el = await fixture<BlTag>(html`<bl-tag variant="selectable">Selectable Tag</bl-tag>`);

      const button = el.shadowRoot?.querySelector("button");

      button?.click();
      await el.updateComplete;

      expect(el.selected).to.be.true;

      button?.click();
      await el.updateComplete;

      expect(el.selected).to.be.false;
    });

    it("emits bl-tag-click event with correct details", async () => {
      const el = await fixture<BlTag>(html`<bl-tag value="test">Click Tag</bl-tag>`);
      const button = el.shadowRoot?.querySelector("button");

      const eventPromise = oneEvent(el, "bl-tag-click");

      button?.click();
      const { detail } = await eventPromise;

      expect(detail).to.deep.equal({
        value: "test",
        selected: true
      });
    });

    it("does not toggle when disabled", async () => {
      const el = await fixture<BlTag>(html`<bl-tag disabled>Disabled Tag</bl-tag>`);

      el.click();
      await elementUpdated(el);

      expect(el.selected).to.be.false;
    });

    it("remove button is disabled when tag is disabled", async () => {
      const el = await fixture<BlTag>(
        html`<bl-tag variant="removable" disabled>Disabled Removable Tag</bl-tag>`
      );
      const removeButton = el.shadowRoot?.querySelector(".remove-button");

      expect(removeButton?.hasAttribute("disabled")).to.be.true;
    });

    it("handles click on removable variant without toggling selected state", async () => {
      const el = await fixture<BlTag>(html`<bl-tag variant="removable">Removable Tag</bl-tag>`);
      const removeBtn = el.shadowRoot?.querySelector<HTMLElement>(".remove-button");

      const eventPromise = oneEvent(el, "bl-tag-click");

      removeBtn?.dispatchEvent(new Event("bl-click")); // Use bl-click event for bl-button

      const { detail } = await eventPromise;

      expect(el.selected).to.be.false;
      expect(detail).to.deep.equal({
        value: null,
        selected: false
      });
    });

    it("emits correct event when clicking remove button", async () => {
      const el = await fixture<BlTag>(
        html`<bl-tag variant="removable" value="test">Removable Tag</bl-tag>`
      );
      const removeBtn = el.shadowRoot?.querySelector<HTMLElement>(".remove-button");

      const eventPromise = oneEvent(el, "bl-tag-click");

      removeBtn?.dispatchEvent(new Event("bl-click")); // Use bl-click event for bl-button

      const { detail } = await eventPromise;

      expect(detail).to.deep.equal({
        value: "test",
        selected: false
      });
    });
  });
});
