import { expect } from "@open-wc/testing";
import { setDirectionProperty } from "./direction";

describe("setDirectionProperty", () => {
  it('sets direction property to "ltr"', () => {
    const element = document.createElement("div") as HTMLElement;
    const originalGetComputedStyle = window.getComputedStyle as typeof window.getComputedStyle;

    window.getComputedStyle = () => ({ getPropertyValue: () => "ltr" } as unknown as CSSStyleDeclaration);
    setDirectionProperty(element);
    expect(element.getAttribute("dir")).to.equal("ltr");
    window.getComputedStyle = originalGetComputedStyle;
  });

  it('sets direction property to "rtl"', () => {
    const element = document.createElement("div") as HTMLElement;
    const originalGetComputedStyle = window.getComputedStyle as typeof window.getComputedStyle;

    window.getComputedStyle = () => ({ getPropertyValue: () => "rtl" } as unknown as CSSStyleDeclaration);
    setDirectionProperty(element);
    expect(element.getAttribute("dir")).to.equal("rtl");
    window.getComputedStyle = originalGetComputedStyle;
  });

  it("does not set direction property if computed style is missing", () => {
    const element = document.createElement("div") as HTMLElement;
    const originalGetComputedStyle = window.getComputedStyle as typeof window.getComputedStyle;

    window.getComputedStyle = () => ({ getPropertyValue: () => null } as unknown as CSSStyleDeclaration);
    setDirectionProperty(element);
    expect(element.getAttribute("dir")).to.equal("null");
    window.getComputedStyle = originalGetComputedStyle;
  });

  it("throws an error if element is not an instance of Element", () => {
    expect(() => setDirectionProperty({} as unknown as HTMLElement)).throw(
      TypeError
    );
  });
});
