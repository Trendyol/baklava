import { assert, expect, fixture, html, oneEvent } from "@open-wc/testing";
import BlAlert, { AlertVariant } from "./bl-alert";
import type typeofBlAlert from "./bl-alert";

const variants: Array<AlertVariant> = ["info", "warning", "success", "danger"];

describe("bl-alert", () => {
  it("is defined", () => {
    const el = document.createElement("bl-alert");

    assert.instanceOf(el, BlAlert);
  });

  it("renders with default values", async () => {
    const el = await fixture<typeofBlAlert>(html`<bl-alert></bl-alert>`);

    assert.shadowDom.equal(
      el,
      `
      <div class="alert">
        <div class="wrapper">
          <div class="content">
            <div class="text-content">
              <span class="description">
                <slot>
                </slot>
              </span>
            </div>
          </div>
          <div class="actions">
          <slot
          class="action"
          name="action"
        ></slot>
        <slot
          class="action-secondary"
          name="action-secondary"
        ></slot>
          </div>
        </div>
      </div>
    `
    );
  });
  it("check default values", async () => {
    const el = await fixture<typeofBlAlert>(html`<bl-alert></bl-alert> `);

    expect(el.variant).to.equal("info");
    expect(el.closable).to.equal(false);
    expect(el.closed).to.equal(false);
  });
  it("should check open/close public functions", async () => {
    const el = await fixture<typeofBlAlert>(html`<bl-alert></bl-alert> `);

    el.close();
    expect(el.closed).to.eq(true);
    el.open();
    expect(el.closed).to.eq(false);
  });
});

// FIXME: Alert variant colors doesn't pass accessibility checks
xdescribe("Accessibility tests", () => {
  variants.forEach(variant => {
    it(`should be accessible when attribute is "${variant}"`, async () => {
      const el = await fixture<typeofBlAlert>(
        `<bl-alert variant=${variant} caption="CAPTION">Description</bl-alert>`
      );

      await expect(el).to.be.accessible();
    });
  });
});

describe("Attributes", () => {
  it("is bound to `closable` attribute", async () => {
    const el = await fixture<typeofBlAlert>(html`<bl-alert closable></bl-alert>`);
    const closeButton = el.shadowRoot?.querySelector("bl-button");
    const kind = closeButton?.getAttribute("kind");
    const icon = closeButton?.getAttribute("icon");
    const variant = closeButton?.getAttribute("variant");
    const label = closeButton?.getAttribute("label");

    expect(kind).to.eq("neutral");
    expect(icon).to.eq("close");
    expect(variant).to.eq("tertiary");
    expect(label).to.eq("close");
  });
  it("is bound to `icon` attribute", async () => {
    const infoEl = await fixture<typeofBlAlert>(html`<bl-alert icon>Description</bl-alert>`);
    const successEl = await fixture<typeofBlAlert>(
      html`<bl-alert variant="success" icon>Description</bl-alert>`
    );
    const warningEl = await fixture<typeofBlAlert>(
      html`<bl-alert variant="warning" icon>Description</bl-alert>`
    );
    const dangerEl = await fixture<typeofBlAlert>(
      html`<bl-alert variant="danger" icon>Description</bl-alert>`
    );
    const customEl = await fixture<typeofBlAlert>(
      html`<bl-alert icon="download">Description</bl-alert>`
    );
    const infoIconEl = infoEl.shadowRoot?.querySelector("bl-icon");
    const successIconEl = successEl.shadowRoot?.querySelector("bl-icon");
    const warningIconEl = warningEl.shadowRoot?.querySelector("bl-icon");
    const dangerIconEl = dangerEl.shadowRoot?.querySelector("bl-icon");
    const customIconEl = customEl.shadowRoot?.querySelector("bl-icon");

    expect(infoIconEl?.getAttribute("name")).to.eq("info");
    expect(successIconEl?.getAttribute("name")).to.eq("check_fill");
    expect(warningIconEl?.getAttribute("name")).to.eq("warning");
    expect(dangerIconEl?.getAttribute("name")).to.eq("close_fill");
    expect(customIconEl?.getAttribute("name")).to.eq("download");
  });
  it("is bound to `caption` attribute", async () => {
    const el = await fixture<typeofBlAlert>(html`<bl-alert caption="test caption"></bl-alert>`);
    const captionEl = el?.shadowRoot?.querySelector(".caption");

    expect(captionEl).to.exist;
    expect(captionEl?.tagName).to.eq("SPAN");
    expect(captionEl?.innerHTML).to.contain("test caption");
  });
  it("is bound to `description` attribute", async () => {
    const el = await fixture<typeofBlAlert>(
      html`<bl-alert description="test description"></bl-alert>`
    );
    const descriptionEl = el?.shadowRoot?.querySelector(".description");

    expect(descriptionEl).to.exist;
    expect(descriptionEl?.tagName).to.eq("SPAN");
    expect(descriptionEl?.innerHTML).to.contain("test description");
  });
});

describe("Slot", () => {
  it("renders `caption` slot with element", async () => {
    const el = await fixture<typeofBlAlert>(
      html`<bl-alert>
        <span slot="caption"> Caption Slot </span>
      </bl-alert>`
    );
    const captionSlot = el.shadowRoot?.querySelector('slot[name="caption"]');

    expect(captionSlot).to.exist;
  });
  it("renders `action` slot with bl-button element", async () => {
    const el = await fixture<typeofBlAlert>(
      html`<bl-alert>
        <bl-button slot="action"> Action Slot </bl-button>
        <bl-button slot="action-secondary"> Action Slot </bl-button>
      </bl-alert>`
    );
    const actionSlot = el.shadowRoot?.querySelector('slot[name="action"]');

    expect(actionSlot).to.exist;
  });
  it("renders `action` slot empty when bl-button is not used", async () => {
    const el = await fixture<typeofBlAlert>(
      html`<bl-alert><span slot="action"> Action Slot </span></bl-alert>`
    );

    expect(el.outerHTML).to.eq('<bl-alert variant="info"></bl-alert>');
  });
});

describe("Events", () => {
  it("fires bl-close event on close button click", async () => {
    const el = await fixture<typeofBlAlert>(html`<bl-alert closable></bl-alert>`);
    const button = el.shadowRoot?.querySelector("bl-button");

    setTimeout(() => button?.click());
    const ev = await oneEvent(el, "bl-close");

    expect(el.closed).to.equal(true);
    expect(ev).to.exist;
    expect(ev.detail).to.eq(true);
  });
});
