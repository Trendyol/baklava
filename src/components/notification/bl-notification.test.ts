import { assert, fixture, html } from "@open-wc/testing";
import BlNotification from "./bl-notification";

describe.skip("bl-notification", () => {
  it("is defined", () => {
    const el = document.createElement("bl-notification");

    assert.instanceOf(el, BlNotification);
  });

  it("should have fixed width of 397px", async () => {
    const el = await fixture<BlNotification>(html`<bl-notification></bl-notification>`);
    const wrapper = el.shadowRoot!.querySelector(".wrapper")!;
    const style = window.getComputedStyle(wrapper);

    assert.equal(style.maxWidth, "396px");
  });

  describe("Default props", () => {});

  describe("Remove Notification", () => {});

  describe("Mobile", () => {
    beforeEach(() => {
      window.resizeTo(480, 640);
    });

    describe("Touch", () => {});
    describe("Animation", () => {});

    it("should render first notification first", async () => {
      const el = await fixture<BlNotification>(html`<bl-notification></bl-notification>`);

      const wrapper = el.shadowRoot!.querySelector(".wrapper")!;
      const style = window.getComputedStyle(wrapper);

      assert.equal(style.flexDirection, "column");
    });
  });

  describe("Animation", () => {});

  describe("Add Notification", () => {
    it("should render bl-notification-card to match snapshot", async () => {
      const el = await fixture<BlNotification>(html`<bl-notification></bl-notification>`);

      el.addNotification({
        caption: "test",
        description: "test",
        variant: "info",
        duration: 5,
        icon: "academy",
      });

      await el.updateComplete;

      assert.shadowDom.equal(
        el,
        `
          <div class="wrapper">
            <bl-notification-card
              caption="test"
              class="notification"
              data-slide="right"
              duration="5"
              icon="academy"
              variant="info"
              id="${el.notifications[0].id}"
            >
              test
            </bl-notification-card>
          </div>
        `
      );
    });

    it("should render last bl-notification-card first", async () => {
      const el = await fixture<BlNotification>(html`<bl-notification></bl-notification>`);

      const wrapper = el.shadowRoot!.querySelector(".wrapper")!;
      const style = window.getComputedStyle(wrapper);

      assert.equal(style.flexDirection, "column-reverse");
    });
  });
});
