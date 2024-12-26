import { expect, fixture, html } from "@open-wc/testing";
import * as sinon from "sinon";
import BlLink from "./bl-link";

describe("bl-link", () => {
  it("verifies static properties", () => {
    expect(BlLink.styles).to.exist;
  });

  it("renders with default properties", async () => {
    const el = await fixture<BlLink>(html`<bl-link href="javascript:void(0)">Home</bl-link>`);

    expect(el.variant).to.equal("inline");
    expect(el.size).to.equal("medium");
    expect(el.kind).to.equal("primary");
    expect(el.href).to.equal("javascript:void(0)");
    expect(el.target).to.equal("_self");
    expect(el.rel).to.equal("");
    expect(el.hreflang).to.equal("");
    expect(el.type).to.equal("");
    expect(el.download).to.equal("");
    expect(el.ping).to.equal("");
    expect(el.ariaLabel).to.equal("");
  });

  it("renders link attributes correctly", async () => {
    const el = await fixture<BlLink>(html`
      <bl-link
        href="https://example.com"
        target="_blank"
        rel="noopener"
        hreflang="en"
        type="text/html"
        referrerpolicy="no-referrer"
        download="file.pdf"
        ping="https://analytics.example.com"
      >External Link</bl-link>
    `);
    const link = el.shadowRoot!.querySelector("a");

    expect(link).to.exist;
    expect(link?.getAttribute("href")).to.equal("https://example.com");
    expect(link?.getAttribute("target")).to.equal("_blank");
    expect(link?.getAttribute("rel")).to.equal("noopener");
    expect(link?.getAttribute("hreflang")).to.equal("en");
    expect(link?.getAttribute("type")).to.equal("text/html");
    expect(link?.getAttribute("referrerpolicy")).to.equal("no-referrer");
    expect(link?.getAttribute("download")).to.equal("file.pdf");
    expect(link?.getAttribute("ping")).to.equal("https://analytics.example.com");
    expect(link?.getAttribute("role")).to.equal("link");
    expect(link?.getAttribute("tabindex")).to.equal("0");
  });

  it("renders icons correctly", async () => {
    const el = await fixture<BlLink>(html`<bl-link href="javascript:void(0)" variant="standalone">Home</bl-link>`);

    expect(el.shadowRoot!.querySelector("bl-icon")?.getAttribute("name")).to.equal("arrow_right");

    el.variant = "inline";
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector("bl-icon")).to.be.null;

    el.variant = "standalone";
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector("bl-icon")?.getAttribute("name")).to.equal("arrow_right");
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
        href="javascript:void(0)"
        variant="standalone"
        size="large"
        kind="neutral"
        aria-label="Home page"
        target="_blank"
        rel="noopener"
        hreflang="en"
        type="text/html"
        referrerpolicy="no-referrer"
      >Home</bl-link>
    `);

    const link = el.shadowRoot!.querySelector("a");

    expect(link?.classList.contains("link")).to.be.true;
    expect(link?.classList.contains("standalone")).to.be.true;
    expect(link?.classList.contains("size-large")).to.be.true;
    expect(link?.classList.contains("kind-neutral")).to.be.true;
    expect(link?.getAttribute("aria-label")).to.equal("Home page");
    expect(link?.getAttribute("href")).to.equal("javascript:void(0)");
    expect(link?.getAttribute("target")).to.equal("_blank");
    expect(link?.getAttribute("rel")).to.equal("noopener");
    expect(link?.getAttribute("hreflang")).to.equal("en");
    expect(link?.getAttribute("type")).to.equal("text/html");
    expect(link?.getAttribute("referrerpolicy")).to.equal("no-referrer");

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

    // Test all target variants
    const targets: ["_self", "_blank", "_parent", "_top"] = ["_self", "_blank", "_parent", "_top"];

    for (const target of targets) {
      el.target = target;
      await el.updateComplete;
      expect(link?.getAttribute("target")).to.equal(target);
    }
  });
});
