import { expect } from "@open-wc/testing";
import { LitElement } from "lit";
import { guardedCustomElement } from "./custom-element";

describe("guardedCustomElement", () => {
  it("should define the decorated class", () => {
    //when
    @guardedCustomElement("bl-test-guarded")
    class BlTestGuarded extends LitElement {}

    //then
    expect(customElements.get("bl-test-guarded")).to.equal(BlTestGuarded);
  });

  it("should keep the first definition and not throw on a duplicated tag", () => {
    //when
    @guardedCustomElement("bl-test-guarded-duplicate")
    class BlTestFirst extends LitElement {}

    //then
    expect(() =>
      guardedCustomElement("bl-test-guarded-duplicate")(class BlTestSecond extends LitElement {})
    ).to.not.throw();

    expect(customElements.get("bl-test-guarded-duplicate")).to.equal(BlTestFirst);
  });
});
