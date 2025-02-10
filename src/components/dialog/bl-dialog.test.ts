import {
  assert,
  elementUpdated,
  expect,
  fixture,
  fixtureCleanup,
  html,
  oneEvent,
} from "@open-wc/testing";
import { resetMouse, sendKeys, sendMouse } from "@web/test-runner-commands";
import type typeOfBlDialog from "./bl-dialog";
import BlDialog from "./bl-dialog";

const htmlDialogElement = window.HTMLDialogElement;

describe("bl-dialog", () => {
  it("is defined", () => {
    const el = document.createElement("bl-dialog");

    assert.instanceOf(el, BlDialog);
  });

  describe("dialog polyfill tests", () => {
    before(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.HTMLDialogElement = false;
    });

    after(() => {
      fixtureCleanup();
      window.HTMLDialogElement = htmlDialogElement;
    });

    it("should render dialog polyfill component when does not support html dialog", async () => {
      const el = await fixture<typeOfBlDialog>(html`<bl-dialog></bl-dialog>`);
      const dialogPolyfill = el.shadowRoot?.querySelector(".dialog-polyfill");

      expect(dialogPolyfill).to.be.not.null;
    });

    it("should open the dialog when the change open attribute as true", async () => {
      const el = await fixture<typeOfBlDialog>(html` <bl-dialog caption="My title">
        <div>My Content</div>
      </bl-dialog>`);

      expect(el.open).to.equal(false);

      el.open = true;
      await elementUpdated(el);

      expect(el.open).to.equal(true);
    });

    it("should close the dialog when the close btn is clicked", async () => {
      const el = await fixture<typeOfBlDialog>(html` <bl-dialog open caption="My title">
        <div>My Content</div>
      </bl-dialog>`);
      const dialogPolyfill = el.shadowRoot?.querySelector(".dialog-polyfill") as HTMLDivElement;
      const closeBtn = el?.shadowRoot?.querySelector("bl-button");

      expect(dialogPolyfill).to.exist;
      expect(closeBtn).to.exist;
      expect(el.open).to.equal(true);
      closeBtn?.click();

      setTimeout(() => {
        expect(el.open).to.equal(false);

        const visible = !!(
          dialogPolyfill.offsetWidth ||
          dialogPolyfill.offsetHeight ||
          dialogPolyfill.getClientRects().length
        );

        expect(visible).to.be.false;
      });
    });
  });

  describe("dialog tests", () => {
    before(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.HTMLDialogElement = true;
    });

    after(() => {
      fixtureCleanup();
      window.HTMLDialogElement = htmlDialogElement;
    });
    it("should render html dialog component with the default values when supports html dialog", async () => {
      const el = await fixture<typeOfBlDialog>(html`<bl-dialog .polyfilled=${false}></bl-dialog>`);

      const footer = el.shadowRoot?.querySelector("footer");

      expect(footer).have.style("display", "none");

      assert.shadowDom.equal(
        el,
        `
        <dialog aria-labelledby="dialog-caption" class="dialog">
          <div class="container">
            <header>
              <bl-button
                icon="close"
                label="close"
                kind="neutral"
                size="small"
                variant="tertiary"
              ></bl-button>
            </header>
            <section class="content">
              <slot></slot>
            </section>
            <footer>
              <slot name="primary-action"></slot>
              <slot name="secondary-action"></slot>
              <slot name="tertiary-action"></slot>
            </footer>
          </div>
        </dialog>
      `
      );
    });

    it("should open the dialog when the change open attribute as true", async () => {
      const el = await fixture<typeOfBlDialog>(html` <bl-dialog caption="My title">
        <div>My Content</div>
      </bl-dialog>`);

      expect(el.open).to.equal(false);

      el.open = true;
      await elementUpdated(el);

      setTimeout(() => {
        expect(el.open).to.equal(true);
      });
    });

    it("should close the dialog when the close btn is clicked", async () => {
      const el = await fixture<typeOfBlDialog>(html` <bl-dialog .polyfilled=${false} open caption="My title">
        <div>My Content</div>
      </bl-dialog>`);
      const dialog = el.shadowRoot?.querySelector(".dialog") as HTMLDivElement;
      const closeBtn = el?.shadowRoot?.querySelector("bl-button");

      expect(dialog).to.exist;
      expect(closeBtn).to.exist;
      expect(el.open).to.equal(true);
      closeBtn?.click();

      setTimeout(() => {
        expect(el.open).to.equal(false);

        const visible = !!(
          dialog.offsetWidth ||
          dialog.offsetHeight ||
          dialog.getClientRects().length
        );

        expect(visible).to.be.false;
      });
    });

    it("should render the title,the content and the footer if provided", async () => {
      const el = await fixture<typeOfBlDialog>(html`<bl-dialog open caption="My title">
        <div class="content">
          <p>My Content</p>
        </div>
        <bl-button slot="primary-action" size="large">Primary</bl-button>
        <bl-button slot="secondary-action" variant="secondary" size="large">Secondary</bl-button>
      </bl-dialog>`);

      const caption = el.shadowRoot?.querySelector("h2") as HTMLElement;
      const content = el.shadowRoot?.querySelector(".content") as HTMLElement;
      const footer = el.shadowRoot?.querySelector("footer");

      expect(caption).to.exist;
      expect(caption?.innerText).to.equal("My title");

      expect(content).to.exist;
      expect(content?.innerHTML).to.equal("<slot></slot>");

      expect(footer).not.have.style("display", "none");
    });

    it("should render the footer", async () => {
      const el = await fixture<typeOfBlDialog>(html`<bl-dialog open caption="My title">
        <div slot="primary-action">Primary</div>
      </bl-dialog>`);

      const caption = el.shadowRoot?.querySelector("h2") as HTMLElement;
      const content = el.shadowRoot?.querySelector(".content") as HTMLElement;
      const footer = el.shadowRoot?.querySelector("footer");

      expect(caption).to.exist;
      expect(caption?.innerText).to.equal("My title");

      expect(content).to.exist;
      expect(content?.innerHTML).to.equal("<slot></slot>");

      expect(footer).not.have.style("display", "none");
    });

    it('should close the dialog when user presses "Escape" key', async () => {
      const container = await fixture<HTMLDivElement>(html`<div>
        <bl-dialog open caption="My title"> </bl-dialog>
      </div>`);

      const dialog = container.querySelector<typeOfBlDialog>("bl-dialog");

      if (dialog) {
        await sendKeys({ press: "Escape" });
        expect(dialog?.getAttribute("open"))?.oneOf(["", null]);
      }
    });

    it("should close the dialog on outside click", async () => {
      const body = await fixture<HTMLBodyElement>(html`
        <div style="width:1500px;height:1500px">
          <bl-dialog caption="My Title" open>
            <p>my content</p>
          </bl-dialog>
        </div>
      `);

      const dialogEl = body.querySelector("bl-dialog") as typeOfBlDialog;

      await sendMouse({ type: "click", position: [1, 1] });
      expect(dialogEl.getAttribute("open")).oneOf(["", null]);
      await resetMouse();
    });

    it("should prevent parent dialog from closing when the child dialog is closed", async () => {
      const dialog = await fixture<typeOfBlDialog>(html`<bl-dialog id="parent" open>
        <bl-dialog id="child" open>
          Child dialog
        </bl-dialog>
      </bl-dialog>`);

      const childDialog =  dialog.querySelector("bl-dialog") as typeOfBlDialog;
      const childDialogCloseBtn = childDialog?.shadowRoot?.querySelector("bl-button");

      expect(dialog.open).to.equal(true);

      childDialogCloseBtn?.click();

      setTimeout(() => {
        expect(dialog.open).to.equal(true);
        expect(childDialog.open).to.equal(false);
      });
    });

    it("should add shadow to footer when the content is too long", async () => {
      window.innerWidth = 400;

      const el = await fixture<HTMLElement>(html`<bl-dialog open caption="My title">
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <bl-button slot="primary-action" size="large">Primary</bl-button>
        <bl-button slot="secondary-action" variant="secondary" size="large">Secondary</bl-button>
      </bl-dialog>
    </body>`);

      const footer = el?.shadowRoot?.querySelector("footer") as HTMLElement;

      expect(footer.className).to.oneOf(["shadow", ""]);
    });

    it("should remove shadow from footer when hitting bottom", async () => {
      window.innerWidth = 400;

      const el = await fixture<HTMLElement>(html`<bl-dialog open caption="My title">
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <bl-button slot="primary-action" size="large">Primary</bl-button>
        <bl-button slot="secondary-action" variant="secondary" size="large">Secondary</bl-button>
      </bl-dialog>
    </body>`);

      const content = el.shadowRoot?.querySelector(".content") as HTMLElement;
      const footer = el?.shadowRoot?.querySelector("footer") as HTMLElement;

      content.scrollTop = content.scrollHeight;
      await new Promise(resolve => requestAnimationFrame(resolve));

      expect(footer).to.not.have.class("shadow");
    });

    describe("Events", () => {
      it("should fire bl-dialog-open / close event on dialog open / close", async () => {
        const el = await fixture<typeOfBlDialog>(html`<bl-dialog open caption="My title">
        </bl-dialog>`);

        setTimeout(async () => {
          const ev = await oneEvent(el, "bl-dialog-open");

          expect(ev).to.exist;
          expect(ev.detail.isOpen).to.equal(true);
        });

        const closeBtn = el?.shadowRoot?.querySelector("bl-button");

        setTimeout(async () => {
          closeBtn?.click();
          const ev = await oneEvent(el, "bl-dialog-close");

          expect(ev).to.exist;
          expect(ev.detail.isOpen).to.equal(false);
        });
      });

      it("should fire bl-dialog-request-close event when dialog closes via built-in close button", async () => {
        const el = await fixture<typeOfBlDialog>(html`<bl-dialog open caption="My title">
        </bl-dialog>`);

        const closeBtn = el?.shadowRoot?.querySelector("bl-button");

        setTimeout(() => {
          closeBtn?.click();
        });

        const ev = await oneEvent(el, "bl-dialog-request-close");

        expect(ev).to.exist;
        expect(ev.detail.source).to.equal("close-button");
      });

      it("should fire bl-dialog-request-close event when dialog closes via Escape key", async () => {
        const el = await fixture<typeOfBlDialog>(html`<bl-dialog open caption="My title">
        </bl-dialog>`);

        setTimeout(async () => {
          await sendKeys({ press: "Escape" });
        });

        const ev = await oneEvent(el, "bl-dialog-request-close");

        expect(ev).to.exist;
        expect(ev.detail.source).to.equal("keyboard");
      });

      it("should fire bl-dialog-request-close event when dialog closes by clicking backdrop", async () => {
        const el = await fixture<typeOfBlDialog>(html`<bl-dialog .polyfilled=${false} open caption="My title">
        </bl-dialog>`);

        const dialog = el?.shadowRoot?.querySelector<HTMLDialogElement>(".dialog");

        setTimeout(() => {
          dialog?.click();
        });

        const ev = await oneEvent(el, "bl-dialog-request-close");

        expect(ev).to.exist;
        expect(ev.detail.source).to.equal("backdrop");
      });

      it("should prevent closing if bl-dialog-request-close event defaultPrevented", async () => {
        const el = await fixture<typeOfBlDialog>(html`<bl-dialog open caption="My title">
        </bl-dialog>`);

        const closeBtn = el?.shadowRoot?.querySelector("bl-button");

        el.addEventListener("bl-dialog-request-close", ev => {
          ev.preventDefault();
        });

        setTimeout(() => {
          closeBtn?.click();
        });

        await oneEvent(el, "bl-dialog-request-close");

        expect(el.open).to.be.true;
      });
    });
  });

  describe("critical dialog tests", () => {
    it("should not close the critical dialog when the close button is clicked", async () => {
      const el = await fixture<typeOfBlDialog>(html`<bl-dialog critical open caption="Critical Dialog">
        <div>Content that cannot be dismissed without taking action.</div>
      </bl-dialog>`);

      const closeBtn = el.shadowRoot?.querySelector("bl-button");

      expect(el.critical).to.be.true;

      closeBtn?.click();
      await elementUpdated(el);

      expect(el.open).to.be.true;
    });

    it("should not close the critical dialog when the escape key is pressed", async () => {
      const el = await fixture<typeOfBlDialog>(html`<bl-dialog critical open caption="Critical Dialog">
        <div>Content that cannot be dismissed without taking action.</div>
      </bl-dialog>`);

      expect(el.critical).to.be.true;

      await sendKeys({ press: "Escape" });
      await elementUpdated(el);

      expect(el.open).to.be.true;
    });

    it("should not close the critical dialog when clicked outside", async () => {
      const el = await fixture<typeOfBlDialog>(html`<bl-dialog critical open caption="Critical Dialog">
        <div>Content that cannot be dismissed without taking action.</div>
      </bl-dialog>`);

      expect(el.critical).to.be.true;

      await sendMouse({ type: "click", position: [0, 0] });
      await elementUpdated(el);

      expect(el.open).to.be.true;
    });

    it("should hide the close button for critical dialog", async () => {
      const el = await fixture<typeOfBlDialog>(html`<bl-dialog critical open caption="Critical Dialog">
        <div>Content that cannot be dismissed without taking action.</div>
      </bl-dialog>`);

      const closeBtn = el.shadowRoot?.querySelector("bl-button");

      expect(closeBtn).to.be.null;
    });
  });
});
