import { expect, fixture, html } from "@open-wc/testing";
import * as sinon from "sinon";
import BlLink from "./bl-link";

describe("bl-link", () => {
  it("verifies static properties", () => {
    expect(BlLink.styles).to.exist;
  });

  it("renders with default properties", async () => {
    const el = await fixture<BlLink>(html`<bl-link target="javascript:void(0)">Home</bl-link>`);

    expect(el.variant).to.equal("inline");
    expect(el.size).to.equal("medium");
    expect(el.kind).to.equal("primary");
    expect(el.external).to.be.false;
    expect(el.disabled).to.be.false;
    expect(el.target).to.equal("javascript:void(0)");
    expect(el.ariaLabel).to.equal("");
  });

  it("renders link attributes correctly", async () => {
    const el = await fixture<BlLink>(html`<bl-link target="javascript:void(0)">Home</bl-link>`);
    const link = el.shadowRoot!.querySelector("a");

    expect(link).to.exist;
    expect(link?.getAttribute("href")).to.equal("javascript:void(0)");
    expect(link?.getAttribute("target")).to.equal("_self");
    expect(link?.getAttribute("rel")).to.be.null;
    expect(link?.getAttribute("role")).to.equal("link");
    expect(link?.getAttribute("aria-disabled")).to.equal("false");
    expect(link?.getAttribute("tabindex")).to.equal("0");
    expect(link?.getAttribute("aria-label")).to.be.null;
  });

  it("renders icons correctly", async () => {
    const el = await fixture<BlLink>(html`<bl-link target="javascript:void(0)" variant="standalone">Home</bl-link>`);

    expect(el.shadowRoot!.querySelector("bl-icon")?.getAttribute("name")).to.equal("arrow_right");

    el.external = true;
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector("bl-icon")?.getAttribute("name")).to.equal("external_link");
    expect(el.shadowRoot!.querySelector(".visually-hidden")?.textContent).to.equal("(opens in new tab)");

    el.variant = "inline";
    el.external = false;
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector("bl-icon")).to.be.null;

    // Test standalone without external
    el.variant = "standalone";
    el.external = false;
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector("bl-icon")?.getAttribute("name")).to.equal("arrow_right");

    // Test inline with external
    el.variant = "inline";
    el.external = true;
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector("bl-icon")?.getAttribute("name")).to.equal("external_link");
  });

  it("handles navigation and events correctly", async () => {
    const el = await fixture<BlLink>(html`<bl-link target="javascript:void(0)">Home</bl-link>`);
    const windowOpenStub = sinon.stub(window, "open");

    // Test internal navigation
    const internalClickEvent = new MouseEvent("click", { bubbles: true });
    const internalClickSpy = sinon.spy(internalClickEvent, "preventDefault");

    el.shadowRoot!.querySelector("a")?.dispatchEvent(internalClickEvent);
    expect(internalClickSpy.called).to.be.true;
    expect(windowOpenStub.calledWith("javascript:void(0)", "_self", "")).to.be.true;

    // Test external navigation
    windowOpenStub.resetHistory();
    el.external = true;
    el.target = "https://example.com";
    await el.updateComplete;
    const externalClickEvent = new MouseEvent("click", { bubbles: true });
    const externalClickSpy = sinon.spy(externalClickEvent, "preventDefault");

    el.shadowRoot!.querySelector("a")?.dispatchEvent(externalClickEvent);
    expect(externalClickSpy.called).to.be.true;
    expect(windowOpenStub.calledWith("https://example.com", "_blank", "noopener,noreferrer")).to.be.true;

    // Test disabled state
    windowOpenStub.resetHistory();
    el.disabled = true;
    await el.updateComplete;
    const disabledClickEvent = new MouseEvent("click", { bubbles: true });
    const disabledClickSpy = sinon.spy(disabledClickEvent, "preventDefault");

    el.shadowRoot!.querySelector("a")?.dispatchEvent(disabledClickEvent);
    expect(disabledClickSpy.called).to.be.true;
    expect(windowOpenStub.notCalled).to.be.true;

    // Test keyboard navigation
    el.disabled = false;
    await el.updateComplete;
    const enterKeyEvent = new KeyboardEvent("keydown", { key: "Enter", bubbles: true });
    const enterKeySpy = sinon.spy(enterKeyEvent, "preventDefault");

    el.shadowRoot!.querySelector("a")?.dispatchEvent(enterKeyEvent);
    expect(enterKeySpy.called).to.be.true;
    expect(windowOpenStub.calledWith("https://example.com", "_blank", "noopener,noreferrer")).to.be.true;

    // Test keyboard navigation when disabled
    windowOpenStub.resetHistory();
    el.disabled = true;
    await el.updateComplete;
    const disabledEnterKeyEvent = new KeyboardEvent("keydown", { key: "Enter", bubbles: true });
    const disabledEnterKeySpy = sinon.spy(disabledEnterKeyEvent, "preventDefault");

    el.shadowRoot!.querySelector("a")?.dispatchEvent(disabledEnterKeyEvent);
    expect(disabledEnterKeySpy.notCalled).to.be.true;
    expect(windowOpenStub.notCalled).to.be.true;

    // Test keyboard navigation with non-Enter key
    el.disabled = false;
    await el.updateComplete;
    const spaceKeyEvent = new KeyboardEvent("keydown", { key: "Space", bubbles: true });
    const spaceKeySpy = sinon.spy(spaceKeyEvent, "preventDefault");

    el.shadowRoot!.querySelector("a")?.dispatchEvent(spaceKeyEvent);
    expect(spaceKeySpy.notCalled).to.be.true;
    expect(windowOpenStub.notCalled).to.be.true;

    // Test navigation without target
    el.target = "";
    await el.updateComplete;
    const noTargetClickEvent = new MouseEvent("click", { bubbles: true });
    const noTargetClickSpy = sinon.spy(noTargetClickEvent, "preventDefault");

    el.shadowRoot!.querySelector("a")?.dispatchEvent(noTargetClickEvent);
    expect(noTargetClickSpy.called).to.be.true;
    expect(windowOpenStub.notCalled).to.be.true;

    // Test navigation with disabled and no target
    el.disabled = true;
    el.target = "";
    await el.updateComplete;
    const disabledNoTargetClickEvent = new MouseEvent("click", { bubbles: true });
    const disabledNoTargetClickSpy = sinon.spy(disabledNoTargetClickEvent, "preventDefault");

    el.shadowRoot!.querySelector("a")?.dispatchEvent(disabledNoTargetClickEvent);
    expect(disabledNoTargetClickSpy.called).to.be.true;
    expect(windowOpenStub.notCalled).to.be.true;

    // Test navigation with disabled and target
    el.disabled = true;
    el.target = "https://example.com";
    await el.updateComplete;
    const disabledWithTargetClickEvent = new MouseEvent("click", { bubbles: true });
    const disabledWithTargetClickSpy = sinon.spy(disabledWithTargetClickEvent, "preventDefault");

    el.shadowRoot!.querySelector("a")?.dispatchEvent(disabledWithTargetClickEvent);
    expect(disabledWithTargetClickSpy.called).to.be.true;
    expect(windowOpenStub.notCalled).to.be.true;

    // Test direct navigation call with disabled and target
    el.disabled = true;
    el.target = "https://example.com";
    (el as unknown as { navigate: () => void }).navigate();
    expect(windowOpenStub.notCalled).to.be.true;

    // Test direct navigation call with enabled and target
    el.disabled = false;
    el.target = "https://example.com";
    (el as unknown as { navigate: () => void }).navigate();
    expect(windowOpenStub.calledWith("https://example.com", "_blank", "noopener,noreferrer")).to.be.true;

    // Cleanup
    windowOpenStub.restore();
  });

  it("handles inline variant warning", async () => {
    const consoleWarnSpy = sinon.spy(console, "warn");

    // Test inline variant without text sibling
    await fixture<BlLink>(html`<div><bl-link variant="inline">Link</bl-link></div>`);
    expect(consoleWarnSpy.calledOnce).to.be.true;
    expect(consoleWarnSpy.calledWith(
      "bl-link: Inline variant should be used within a text container. Example: <p>Text with <bl-link variant='inline'>a link</bl-link> inside.</p>"
    )).to.be.true;

    // Test inline variant with text sibling
    consoleWarnSpy.resetHistory();
    await fixture<BlLink>(html`<div>Text <bl-link variant="inline">Link</bl-link></div>`);
    expect(consoleWarnSpy.notCalled).to.be.true;

    // Test with no parent element
    consoleWarnSpy.resetHistory();
    const el = document.createElement("bl-link") as BlLink;

    el.variant = "inline";
    document.body.appendChild(el);
    expect(consoleWarnSpy.calledOnce).to.be.true;
    document.body.removeChild(el);

    // Test with parent element but no childNodes
    consoleWarnSpy.resetHistory();
    const parentEl = document.createElement("div");

    Object.defineProperty(parentEl, "childNodes", { value: null });
    const linkEl = document.createElement("bl-link") as BlLink;

    linkEl.variant = "inline";
    parentEl.appendChild(linkEl);
    document.body.appendChild(parentEl);
    expect(consoleWarnSpy.calledOnce).to.be.true;
    document.body.removeChild(parentEl);

    // Test with non-inline variant
    consoleWarnSpy.resetHistory();
    await fixture<BlLink>(html`<bl-link variant="standalone">Link</bl-link>`);
    expect(consoleWarnSpy.notCalled).to.be.true;

    consoleWarnSpy.restore();
  });

  it("handles all property combinations", async () => {
    const el = await fixture<BlLink>(html`
      <bl-link
        target="javascript:void(0)"
        variant="standalone"
        size="large"
        kind="neutral"
        aria-label="Home page"
        external
        disabled
      >Home</bl-link>
    `);

    const link = el.shadowRoot!.querySelector("a");

    expect(link?.classList.contains("link")).to.be.true;
    expect(link?.classList.contains("standalone")).to.be.true;
    expect(link?.classList.contains("size-large")).to.be.true;
    expect(link?.classList.contains("kind-neutral")).to.be.true;
    expect(link?.classList.contains("disabled")).to.be.true;
    expect(link?.getAttribute("aria-label")).to.equal("Home page");
    expect(link?.getAttribute("target")).to.equal("_blank");
    expect(link?.getAttribute("rel")).to.equal("noopener noreferrer");
    expect(link?.getAttribute("href")).to.be.null;
    expect(link?.getAttribute("tabindex")).to.equal("-1");
    expect(link?.getAttribute("aria-disabled")).to.equal("true");

    // Test all size variants
    const sizes = ["small", "medium", "large"] as const;

    for (const size of sizes) {
      el.size = size;
      await el.updateComplete;
      expect(link?.classList.contains(`size-${size}`)).to.be.true;
    }

    // Test all kind variants
    const kinds = ["primary", "neutral"] as const;

    for (const kind of kinds) {
      el.kind = kind;
      await el.updateComplete;
      expect(link?.classList.contains(`kind-${kind}`)).to.be.true;
    }
  });
});
