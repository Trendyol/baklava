import { assert, elementUpdated, expect, fixture, html } from "@open-wc/testing";
import BlBreadcrumbItem from "./bl-breadcrumb-item";

describe("bl-breadcrumb-item", () => {
  it("should be defined", () => {
    const el = document.createElement("bl-breadcrumb-item");

    assert.instanceOf(el, BlBreadcrumbItem);
  });

  it("should render link when href is set", async () => {
    const el = await fixture<BlBreadcrumbItem>(html`
      <bl-breadcrumb-item href="/home" label="Home"></bl-breadcrumb-item>
    `);

    const link = el.shadowRoot!.querySelector("bl-link");

    expect(link).to.exist;
    expect(link!.getAttribute("href")).to.equal("/home");
  });

  it("should render link with variant inline", async () => {
    const el = await fixture<BlBreadcrumbItem>(html`
      <bl-breadcrumb-item href="/home" label="Home"></bl-breadcrumb-item>
    `);

    const link = el.shadowRoot!.querySelector("bl-link");

    expect(link!.getAttribute("variant")).to.equal("inline");
  });

  it("should render link with breadcrumb-link class", async () => {
    const el = await fixture<BlBreadcrumbItem>(html`
      <bl-breadcrumb-item href="/home" label="Home"></bl-breadcrumb-item>
    `);

    const link = el.shadowRoot!.querySelector("bl-link.breadcrumb-link");

    expect(link).to.exist;
  });

  it("should display label inside link when href is set", async () => {
    const el = await fixture<BlBreadcrumbItem>(html`
      <bl-breadcrumb-item href="/home" label="My Label"></bl-breadcrumb-item>
    `);

    const link = el.shadowRoot!.querySelector("bl-link");

    expect(link!.textContent!.trim()).to.equal("My Label");
  });

  it("should render span when href is empty (current page)", async () => {
    const el = await fixture<BlBreadcrumbItem>(html`
      <bl-breadcrumb-item label="Current"></bl-breadcrumb-item>
    `);

    const text = el.shadowRoot!.querySelector(".breadcrumb-text");

    expect(text).to.exist;
    expect(el.shadowRoot!.querySelector("bl-link")).to.not.exist;
  });

  it("should have aria-current on current page", async () => {
    const el = await fixture<BlBreadcrumbItem>(html`
      <bl-breadcrumb-item label="Current"></bl-breadcrumb-item>
    `);

    const text = el.shadowRoot!.querySelector(".breadcrumb-text");

    expect(text!.getAttribute("aria-current")).to.equal("location");
  });

  it("should display label inside span when href is empty", async () => {
    const el = await fixture<BlBreadcrumbItem>(html`
      <bl-breadcrumb-item label="Current Page"></bl-breadcrumb-item>
    `);

    const text = el.shadowRoot!.querySelector(".breadcrumb-text");

    expect(text!.textContent!.trim()).to.equal("Current Page");
  });

  it("should render slot when label is empty and href is set", async () => {
    const el = await fixture<BlBreadcrumbItem>(html`
      <bl-breadcrumb-item href="/home">
        <span>Slotted content</span>
      </bl-breadcrumb-item>
    `);

    const link = el.shadowRoot!.querySelector("bl-link");

    expect(link).to.exist;
    const slot = link!.querySelector("slot:not([name])");

    expect(slot).to.exist;
  });

  it("should render slot when label is empty and href is empty", async () => {
    const el = await fixture<BlBreadcrumbItem>(html`
      <bl-breadcrumb-item>
        <span>Slotted text</span>
      </bl-breadcrumb-item>
    `);

    const text = el.shadowRoot!.querySelector(".breadcrumb-text");

    expect(text).to.exist;
    const slot = text!.querySelector("slot:not([name])");

    expect(slot).to.exist;
  });

  it("should reflect href attribute", async () => {
    const el = await fixture<BlBreadcrumbItem>(html`
      <bl-breadcrumb-item href="/test" label="Test"></bl-breadcrumb-item>
    `);

    expect(el.getAttribute("href")).to.equal("/test");
    el.href = "/updated";
    await elementUpdated(el);
    expect(el.getAttribute("href")).to.equal("/updated");
  });

  it("should reflect label attribute", async () => {
    const el = await fixture<BlBreadcrumbItem>(html`
      <bl-breadcrumb-item href="/" label="Test"></bl-breadcrumb-item>
    `);

    expect(el.getAttribute("label")).to.equal("Test");
    el.label = "Updated";
    await elementUpdated(el);
    expect(el.getAttribute("label")).to.equal("Updated");
  });
});
