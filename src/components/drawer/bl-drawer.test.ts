import {
  assert,
  aTimeout,
  elementUpdated,
  expect,
  fixture,
  html,
  oneEvent,
} from "@open-wc/testing";
import BlDrawer from "./bl-drawer";
import type typeOfBlDrawer from "./bl-drawer";

describe("bl-drawer", () => {
  it("is defined", () => {
    const el = document.createElement("bl-drawer");

    assert.instanceOf(el, BlDrawer);
  });

  describe("render tests", () => {
    it("should render drawer component with default values", async () => {
      const el = await fixture<typeOfBlDrawer>(html`<bl-drawer open></bl-drawer>`);

      assert.shadowDom.equal(
        el,
        `
      <div class="drawer">
        <div class="container">
        <header>
            <div class="header-buttons">
              <bl-button
                icon="close"
                variant="tertiary"
                size="small"
                kind="neutral"
              ></bl-button>
            </div>
        </header>
        <section class="content">
            <slot></slot>
        </section>
        </div>
      </div>
      `
      );
    });
    it("should render the caption, externalLink and content if provided", async () => {
      const el = await fixture<typeOfBlDrawer>(html`<bl-drawer
        caption="My Caption"
        external-link="some-url"
        open
      >
        <div>example content</div>
      </bl-drawer>`);

      assert.shadowDom.equal(
        el,
        `
      <div class="drawer">
        <div class="container">
        <header>
            <h2 id="drawer-caption">
                My Caption
            </h2>
            <div class="header-buttons">
               <bl-button
                href="some-url"
                icon="external_link"
                variant="tertiary"
                size="small"
                target="_blank"
                kind="neutral"
              ></bl-button>
              <bl-button
                icon="close"
                variant="tertiary"
                size="small"
                kind="neutral"
              ></bl-button>
            </div>
        </header>
        <section class="content">
            <slot></slot>
        </section>
        </div>
      </div>
      `
      );
    });

    it("should render the caption, embedUrl if provided", async () => {
      const embedUrl = "/?test=1";
      const el = await fixture<typeOfBlDrawer>(
        html`<bl-drawer caption="My Caption" embed-url="${embedUrl}" open
          ><div>example content</div></bl-drawer
        >`
      );

      const caption = el.shadowRoot?.querySelector("#drawer-caption") as HTMLElement;
      const iframeEl = el.shadowRoot?.querySelector("iframe") as HTMLElement;

      expect(iframeEl).to.exist;
      expect(iframeEl.attributes.getNamedItem("src")?.value).to.contain(embedUrl);

      expect(caption).to.exist;
      expect(caption.innerText).to.equal("My Caption");
    });

    it("should open the drawer when change open attribute as true", async () => {
      const el = await fixture<typeOfBlDrawer>(html`<bl-drawer caption="Drawer Title">
        <div>Drawer Content</div>
      </bl-drawer>`);

      expect(el.open).to.equal(false);

      el.open = true;
      await elementUpdated(el);

      setTimeout(() => {
        expect(el.open).to.equal(true);
      });
    });
    it("should close the drawer when change click close button", async () => {
      const el = await fixture<typeOfBlDrawer>(html`<bl-drawer open caption="Drawer Title">
        <div>Drawer Content</div>
      </bl-drawer>`);

      const closeBtn = el?.shadowRoot?.querySelector("bl-button");

      expect(closeBtn).to.exist;
      expect(el.open).to.equal(true);
      closeBtn?.click();

      await elementUpdated(el);

      expect(el.open).to.equal(false);
      expect(el.offsetWidth).to.equal(0);

      await aTimeout(1100);

      expect(el?.shadowRoot?.querySelector("bl-button")).to.be.null;
    });

    it("should render the drawer with given specific width in css variable --bl-drawer-width", async () => {
        document.documentElement.style.setProperty("--bl-drawer-width", "800px");
        const el = await fixture<typeOfBlDrawer>(html`<bl-drawer open></bl-drawer>`);
        const drawerEl = el.shadowRoot!.querySelector(".drawer")!;

        const width = getComputedStyle(drawerEl).width;

        expect(
          width
        ).to.equal("800px");
      });

    it("should render the drawer with width: 'calc(100vw - 24px)' if viewport width is smaller than given drawer width", async () => {
        // default window.innerWidth = 800px
        document.documentElement.style.setProperty("--bl-drawer-width", "1200px");

        const el = await fixture<typeOfBlDrawer>(html`<bl-drawer open></bl-drawer>`);
        const drawerEl = el.shadowRoot!.querySelector(".drawer")!;

        const width = getComputedStyle(drawerEl).width;

        expect(
          width
        ).to.equal("776px");

      });

      it("should render the drawer with default width 'calc(100vw - 24px)' if --bl-drawer-width value is unsupported & viewport width is smaller than given drawer width", async () => {
        Object.defineProperty(window, "innerWidth", {
            writable: true,
            configurable: true,
            value: 300,
        });
        document.documentElement.style.setProperty("--bl-drawer-width", "500em");

        const el = await fixture<typeOfBlDrawer>(html`<bl-drawer open></bl-drawer>`);
        const drawerEl = el.shadowRoot!.querySelector(".drawer")!;

        const width = getComputedStyle(drawerEl).width;

        expect(
          width
        ).to.equal("776px");
      });
  });

  describe("event tests", () => {
    it("should fire bl-drawer-open when dialog opens", async () => {
      const el = await fixture<typeOfBlDrawer>(html`<bl-drawer caption="My Drawer"></bl-drawer>`);

      setTimeout(async () => {
        const openEvent = await oneEvent(el, "bl-drawer-open");

        expect(openEvent).to.exist;
      });
    });
    it("should fire bl-drawer-close when dialog closes", async () => {
      const el = await fixture<typeOfBlDrawer>(
        html`<bl-drawer open caption="My Drawer"></bl-drawer>`
      );

      const closeBtn = el?.shadowRoot?.querySelector("bl-button");

      setTimeout(async () => {
        closeBtn?.click();
        const openEvent = await oneEvent(el, "bl-drawer-close");

        expect(openEvent).to.exist;
      });
    });
  });
});
