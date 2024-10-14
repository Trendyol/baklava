import { expect } from "@open-wc/testing";
import { getDirection, setDirectionProperty } from "./direction";

describe("getDirection", () => {
  it("returns empty string when the document element has no computed direction", () => {
    const originalGetComputedStyle = window.getComputedStyle as typeof window.getComputedStyle;

    window.getComputedStyle = () =>
      ({ getPropertyValue: () => "" } as unknown as CSSStyleDeclaration);

    expect(getDirection()).to.equal("");


    window.getComputedStyle = originalGetComputedStyle;
  });

  it("returns the computed direction property of the document element", () => {
    const originalGetComputedStyle = window.getComputedStyle as typeof window.getComputedStyle;

    window.getComputedStyle = () =>
      ({ getPropertyValue: () => "rtl" } as unknown as CSSStyleDeclaration);

    expect(getDirection()).to.equal("rtl");

    window.getComputedStyle = originalGetComputedStyle;
  });
});

describe("setDirectionProperty", () => {
  it("sets the direction property on the element based on the computed style", () => {
    const element = document.createElement("div");

    setDirectionProperty(element);

    expect(element.getAttribute("dir")).to.equal(getDirection());
  });

  it("throws an error if the element is not an instance of Element", () => {
    expect(() => setDirectionProperty({} as unknown as HTMLElement)).to.throw(TypeError);
  });
});
