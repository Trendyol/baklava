import { assert, elementUpdated, expect, fixture, html } from "@open-wc/testing";
import BlProgressIndicator from "./bl-progress-indicator";
import type typeOfBlProgressIndicator from "./bl-progress-indicator";

describe("bl-progress-indicator", () => {
  it("should be defined progress indicator instance", () => {
    //when
    const el = document.createElement("bl-progress-indicator");

    //then
    assert.instanceOf(el, BlProgressIndicator);
  });

  it("should be rendered with default values", async () => {
    //when
    const el = await fixture<typeOfBlProgressIndicator>(
      html`<bl-progress-indicator></bl-progress-indicator>`
    );

    //then
    assert.shadowDom.equal(
      el,
      `
      <div
      class="progress-indicator"
      role="progressbar"
      aria-label="progress indicator"
      aria-valuemax="100"
      aria-valuenow="0"
    ></div>
      `
    );
  });

  it("should have correct default values", async () => {
    //when
    const el = await fixture<typeOfBlProgressIndicator>(
      html`<bl-progress-indicator></bl-progress-indicator>`
    );

    //then
    expect(el.size).to.equal("medium");
    expect(el.max).to.equal(100);
    expect(el.value).to.equal(0);
    expect(el.failed).to.equal(false);
  });

  it("should be rendered with correct size,max,failed,value attributes", async () => {
    //when
    const el = await fixture<typeOfBlProgressIndicator>(
      html`<bl-progress-indicator size="large" max="8" value="3" failed></bl-progress-indicator>`
    );

    //then
    const wrapper = el.shadowRoot?.querySelector(".progress-indicator") as HTMLDivElement;
    const cssMaxVariable = getComputedStyle(wrapper).getPropertyValue("--max");
    const cssValueVariable = getComputedStyle(wrapper).getPropertyValue("--value");

    expect(el.size).to.eq("large");
    expect(el.max).to.eq(8);
    expect(el.value).to.eq(3);
    expect(el.failed).to.eq(true);
    expect(cssMaxVariable).to.eq("8");
    expect(cssValueVariable).to.eq("3");
  });

  it("should be rendered with correct size,max,failed,value attributes when size,max,failed,value attributes was changed", async () => {
    //given
    const el = await fixture<typeOfBlProgressIndicator>(
      html`<bl-progress-indicator size="large" max="8" value="3"></bl-progress-indicator>`
    );

    el.setAttribute("size", "small");
    el.setAttribute("max", "5");
    el.setAttribute("value", "4");
    el.setAttribute("failed", "true");

    //when
    await elementUpdated(el);

    //then
    expect(el.size).to.eq("small");
    expect(el.max).to.eq(5);
    expect(el.value).to.eq(4);
    expect(el.failed).to.eq(true);
  });
});
