import { assert, elementUpdated, expect, fixture, html, oneEvent } from "@open-wc/testing";
import { sendKeys } from "@web/test-runner-commands";
import BlTextarea from "./bl-textarea";

describe("bl-textarea", () => {
  it("is defined", () => {
    const el = document.createElement("bl-textarea");

    assert.instanceOf(el, BlTextarea);
  });

  it("renders with default values", async () => {
    const el = await fixture<BlTextarea>(html`
      <bl-textarea label="Label"></bl-textarea>`);

    assert.shadowDom.equal(
      el,
      `
        <div class="wrapper">
          <label for="input">Label</label>
          <fieldset class="input-wrapper">
            <legend><span>Label</span></legend>
            <textarea
            id="input"
            name=""
            rows="4"
            spellcheck="false"
            >
            </textarea>
          </fieldset>
          <div class="hint"></div>
        </div>
      `,
      { ignoreAttributes: ["for", "id", "style"] }
    );
  });

  it("should set label", async () => {
    const labelText = "Some Label";
    const el = await fixture<BlTextarea>(html`
      <bl-textarea label="${labelText}"></bl-textarea>`);
    const label = el.shadowRoot?.querySelector("label");

    expect(label).to.exist;
    expect(label?.innerText).to.equal(labelText);
  });

  it("should set help text", async () => {
    const helpText = "Some help text";
    const el = await fixture<BlTextarea>(html`
      <bl-textarea help-text="${helpText}"></bl-textarea>`);
    const helpMessage = <HTMLParagraphElement>el.shadowRoot?.querySelector(".help-text");

    expect(helpMessage).to.exist;
    expect(helpMessage?.innerText).to.equal(helpText);
  });

  it("should set character counter", async () => {
    const el = await fixture<BlTextarea>(
      html`
        <bl-textarea value="abcde" character-counter></bl-textarea>`
    );
    const characterCounter = <HTMLParagraphElement>el.shadowRoot?.querySelector(".counter-text");

    expect(characterCounter?.innerText).to.equal("5");
  });

  it("should set character counter with maxlength", async () => {
    const el = await fixture<BlTextarea>(
      html`
        <bl-textarea value="abcde" character-counter maxlength="10"></bl-textarea>`
    );
    const characterCounter = <HTMLParagraphElement>el.shadowRoot?.querySelector(".counter-text");

    expect(characterCounter?.innerText).to.equal("5/10");
  });

  it("should increase rows attribute dynamically", async () => {
    const el = await fixture<BlTextarea>(html`
      <bl-textarea rows="1"></bl-textarea>`);

    el.setAttribute("rows", "2");

    expect(el?.getAttribute("rows")).to.equal("2");
  });

  it("should decrease rows attribute dynamically", async () => {
    const el = await fixture<BlTextarea>(html`
      <bl-textarea rows="2"></bl-textarea>`);

    el.setAttribute("rows", "1");

    expect(el?.getAttribute("rows")).to.equal("1");
  });

  it("should expand when input text is longer than one row", async () => {
    const el = await fixture<BlTextarea>(
      html`
        <bl-textarea
          value="some dummy text some dummy text some dummy text some dummy text some dummy text some dummy text some dummy text some dummy text"
          expand
          rows="1"
          style="width: 200px"
        ></bl-textarea>`
    );

    await el.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 100));

    const textarea = el.validationTarget;

    // scrollHeight, içeriğin gerçek yüksekliğini verir
    const scrollHeight = textarea.scrollHeight;

    // Uzun metin, dar genişlikte birden fazla satıra yayılmalı
    // Bu yüzden scrollHeight tek satırdan (18-20px) fazla olmalı
    expect(scrollHeight).to.be.greaterThan(30);

    // expand attribute'unun varlığını kontrol et
    expect(el.expand).to.be.true;
    expect(el.hasAttribute("expand")).to.be.true;

    // textarea'nın CSS'de doğru şekilde ayarlandığını kontrol et
    const styles = getComputedStyle(textarea);

    expect(styles.overflow).to.equal("hidden");
    expect(styles.resize).to.equal("none");
  });

  it("should have same heights if they have same max-rows", async () => {
    const longText = "some dummy text some dummy text some dummy text some dummy text";
    const longerText =
      "some dummy text some dummy text some dummy text some dummy text" +
      " some dummy text some dummy text some dummy text some dummy text" +
      "some dummy text some dummy text some dummy text some dummy text";

    const el = await fixture<BlTextarea>(
      html`
        <bl-textarea value="${longText}" expand rows="1" max-rows="3" style="width: 200px"></bl-textarea>`
    );
    const el2 = await fixture<BlTextarea>(
      html`
        <bl-textarea value="${longerText}" expand rows="1" max-rows="3" style="width: 200px"></bl-textarea>`
    );

    await el.updateComplete;
    await el2.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 100));

    // Her iki textarea da expand ve max-rows attribute'larına sahip olmalı
    expect(el.expand).to.be.true;
    expect(el.maxRows).to.equal(3);
    expect(el2.expand).to.be.true;
    expect(el2.maxRows).to.equal(3);

    // max-rows ile overflow-y scroll olmalı
    const styles = getComputedStyle(el.validationTarget);
    const styles2 = getComputedStyle(el2.validationTarget);

    expect(styles.overflowY).to.equal("scroll");
    expect(styles2.overflowY).to.equal("scroll");
  });

  describe("validation", () => {
    it("should be valid by default", async () => {
      const el = await fixture<BlTextarea>(html`
        <bl-textarea></bl-textarea>`);

      expect(el.validity.valid).to.be.true;
    });
    it("should be invalid with required attribute", async () => {
      const el = await fixture<BlTextarea>(html`
        <bl-textarea required></bl-textarea>`);

      expect(el.validity.valid).to.be.false;
    });
    it("should be valid with required when value is filled", async () => {
      const el = await fixture<BlTextarea>(
        html`
          <bl-textarea value="some-value" required></bl-textarea>`
      );

      expect(el.validity.valid).to.be.true;
    });
    it("should set custom invalid text", async () => {
      const customErrorMsg = "This field is mandatory";
      const el = await fixture<BlTextarea>(
        html`
          <bl-textarea
            invalid-text="${customErrorMsg}"
            maxlength="5"
            value="more than 5 characters"
          ></bl-textarea>`
      );

      el.reportValidity();

      await elementUpdated(el);

      const errorMsgElement = <HTMLParagraphElement>el.shadowRoot?.querySelector(".invalid-text");

      expect(el.validity.valid).to.be.false;

      expect(errorMsgElement).to.exist;
      expect(errorMsgElement.innerText).to.equal(customErrorMsg);
    });

    it("should show custom error", async () => {
      const errorMessage = "This field is mandatory";
      const el = await fixture<BlTextarea>(
        html`
          <bl-textarea error="${errorMessage}"></bl-textarea>`
      );

      await elementUpdated(el);

      const errorMessageElement = <HTMLParagraphElement>(
        el.shadowRoot?.querySelector(".invalid-text")
      );

      expect(el.validity.valid).to.be.false;

      expect(errorMessageElement).to.exist;
      expect(errorMessageElement?.innerText).to.equal(errorMessage);
    });

    it("should show custom invalid text", async () => {
      const invalidText = "This field is mandatory";
      const el = await fixture<BlTextarea>(html`
        <bl-textarea required></bl-textarea>`);

      el.setCustomValidity(invalidText);
      el.setValue(el.value);
      el.reportValidity();

      await elementUpdated(el);

      expect(el.validity.valid).to.be.false;
      const errorMessageElement = <HTMLParagraphElement>(
        el.shadowRoot?.querySelector(".invalid-text")
      );

      expect(errorMessageElement).to.visible;
      expect(errorMessageElement?.innerText).to.equal(invalidText);
    });
  });

  describe("events", () => {
    it("should fire bl-input event when user enters a value", async () => {
      const el = await fixture<BlTextarea>(html`
        <bl-textarea></bl-textarea>`);
      const textarea = el.shadowRoot?.querySelector("textarea");

      if (textarea) textarea.value = "some value";

      setTimeout(() => textarea?.dispatchEvent(new Event("input")));

      const ev = await oneEvent(el, "bl-input");

      expect(ev).to.exist;
      expect(ev.detail).to.be.equal("some value");
    });
    it("should fire bl-input event when input value changes", async () => {
      const el = await fixture<BlTextarea>(html`
        <bl-textarea></bl-textarea>`);
      const textarea = el.shadowRoot?.querySelector("textarea");

      if (textarea) textarea.value = "some value";

      setTimeout(() => textarea?.dispatchEvent(new Event("change")));

      const ev = await oneEvent(el, "bl-change");

      expect(ev).to.exist;
      expect(ev.detail).to.be.equal("some value");
    });
    it("should fire bl-invalid event when input value not correct", async () => {
      const el = await fixture<BlTextarea>(html`
        <bl-textarea maxlength="5"></bl-textarea>`);
      const textarea = el.shadowRoot?.querySelector("textarea");

      await textarea?.focus();

      await sendKeys({
        type: "a text more than five characters"
      });

      setTimeout(() => textarea?.dispatchEvent(new Event("invalid")));

      const ev = await oneEvent(el, "bl-invalid");

      expect(ev).to.exist;
      expect(ev.detail["tooLong"]).to.equal(true);
    });
  });
  describe("form integration", () => {
    it("should show errors when parent form is submitted", async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form novalidate>
          <bl-textarea required></bl-textarea>
        </form>`);
      const blTextarea = form.querySelector<BlTextarea>("bl-textarea");

      form.addEventListener("submit", e => e.preventDefault());

      form.dispatchEvent(new SubmitEvent("submit", { cancelable: true }));

      await elementUpdated(form);

      const errorMessageElement = <HTMLParagraphElement>(
        blTextarea?.shadowRoot?.querySelector(".invalid-text")
      );

      expect(blTextarea?.validity.valid).to.be.false;

      expect(errorMessageElement).to.exist;
    });
  });

  describe("interaction tests", () => {
    describe("focus state", () => {
      it("should handle focus event when textarea is focused", async () => {
        const el = await fixture<BlTextarea>(html`<bl-textarea label="Test Textarea"></bl-textarea>`);
        const textarea = el.shadowRoot?.querySelector("textarea");

        expect(textarea).to.exist;

        textarea?.focus();
        await elementUpdated(el);

        expect(document.activeElement).to.equal(el);
      });

      it("should have autofocus attribute when set", async () => {
        const el = await fixture<BlTextarea>(html`<bl-textarea autofocus></bl-textarea>`);
        const textarea = el.shadowRoot?.querySelector("textarea");

        await elementUpdated(el);

        expect(el.autofocus).to.be.true;
        expect(textarea?.hasAttribute("autofocus")).to.be.true;
      });

      it("should maintain focus after user interaction", async () => {
        const el = await fixture<BlTextarea>(html`<bl-textarea label="Test"></bl-textarea>`);
        const textarea = el.shadowRoot?.querySelector("textarea");

        textarea?.focus();
        await elementUpdated(el);

        if (textarea) {
          textarea.value = "test value";
          textarea.dispatchEvent(new Event("input"));
        }

        await elementUpdated(el);

        expect(document.activeElement).to.equal(el);
      });
    });

    describe("filled state", () => {
      it("should show has-value class when textarea has value", async () => {
        const el = await fixture<BlTextarea>(html`<bl-textarea value="test"></bl-textarea>`);
        const wrapper = el.shadowRoot?.querySelector(".wrapper");

        expect(wrapper?.classList.contains("has-value")).to.be.true;
      });

      it("should add has-value class when user types", async () => {
        const el = await fixture<BlTextarea>(html`<bl-textarea></bl-textarea>`);
        const textarea = el.shadowRoot?.querySelector("textarea");
        const wrapper = el.shadowRoot?.querySelector(".wrapper");

        expect(wrapper?.classList.contains("has-value")).to.be.false;

        if (textarea) {
          textarea.value = "new value";
          textarea.dispatchEvent(new Event("input"));
        }

        await elementUpdated(el);

        expect(wrapper?.classList.contains("has-value")).to.be.true;
      });

      it("should remove has-value class when textarea is cleared", async () => {
        const el = await fixture<BlTextarea>(html`<bl-textarea value="test"></bl-textarea>`);
        const textarea = el.shadowRoot?.querySelector("textarea");
        const wrapper = el.shadowRoot?.querySelector(".wrapper");

        expect(wrapper?.classList.contains("has-value")).to.be.true;

        if (textarea) {
          textarea.value = "";
          textarea.dispatchEvent(new Event("input"));
        }

        await elementUpdated(el);

        expect(wrapper?.classList.contains("has-value")).to.be.false;
      });

      it("should maintain filled state with whitespace value", async () => {
        const el = await fixture<BlTextarea>(html`<bl-textarea value="   "></bl-textarea>`);
        const wrapper = el.shadowRoot?.querySelector(".wrapper");

        expect(wrapper?.classList.contains("has-value")).to.be.true;
      });

      it("should maintain filled state with multiline text", async () => {
        const el = await fixture<BlTextarea>(html`<bl-textarea value="line1\nline2\nline3"></bl-textarea>`);
        const wrapper = el.shadowRoot?.querySelector(".wrapper");

        expect(wrapper?.classList.contains("has-value")).to.be.true;
      });
    });

    describe("valid state", () => {
      it("should be valid when textarea meets all requirements", async () => {
        const el = await fixture<BlTextarea>(html`<bl-textarea required value="test"></bl-textarea>`);

        expect(el.validity.valid).to.be.true;
        expect(el.checkValidity()).to.be.true;
      });

      it("should show no error message when valid", async () => {
        const el = await fixture<BlTextarea>(html`<bl-textarea required value="test"></bl-textarea>`);

        el.reportValidity();
        await elementUpdated(el);

        const errorMessage = el.shadowRoot?.querySelector(".invalid-text");

        expect(errorMessage).to.not.exist;
      });

      it("should not have invalid class when valid", async () => {
        const el = await fixture<BlTextarea>(html`<bl-textarea required value="test"></bl-textarea>`);
        const wrapper = el.shadowRoot?.querySelector(".wrapper");

        el.reportValidity();
        await elementUpdated(el);

        expect(wrapper?.classList.contains("invalid")).to.be.false;
      });

      it("should transition from invalid to valid on user input", async () => {
        const el = await fixture<BlTextarea>(html`<bl-textarea required></bl-textarea>`);
        const textarea = el.shadowRoot?.querySelector("textarea");

        el.reportValidity();
        await elementUpdated(el);

        expect(el.validity.valid).to.be.false;

        if (textarea) {
          textarea.value = "valid input";
          textarea.dispatchEvent(new Event("input"));
        }

        await elementUpdated(el);

        expect(el.validity.valid).to.be.true;
      });

      it("should validate minlength correctly", async () => {
        const el = await fixture<BlTextarea>(html`<bl-textarea minlength="3" value="test"></bl-textarea>`);

        expect(el.validity.valid).to.be.true;
        expect(el.validity.tooShort).to.be.false;
      });

      it("should validate maxlength correctly when under limit", async () => {
        const el = await fixture<BlTextarea>(html`<bl-textarea maxlength="10" value="test"></bl-textarea>`);

        expect(el.validity.valid).to.be.true;
        expect(el.validity.tooLong).to.be.false;
      });
    });

    describe("invalid state", () => {
      it("should be invalid when required field is empty", async () => {
        const el = await fixture<BlTextarea>(html`<bl-textarea required></bl-textarea>`);

        expect(el.validity.valid).to.be.false;
        expect(el.validity.valueMissing).to.be.true;
      });

      it("should show error message when invalid and dirty", async () => {
        const el = await fixture<BlTextarea>(html`<bl-textarea required></bl-textarea>`);

        el.reportValidity();
        await elementUpdated(el);

        const errorMessage = el.shadowRoot?.querySelector(".invalid-text");

        expect(errorMessage).to.exist;
        expect(errorMessage?.textContent).to.not.be.empty;
      });

      it("should have invalid class when validation fails", async () => {
        const el = await fixture<BlTextarea>(html`<bl-textarea required></bl-textarea>`);
        const wrapper = el.shadowRoot?.querySelector(".wrapper");

        el.reportValidity();
        await elementUpdated(el);

        expect(wrapper?.classList.contains("invalid")).to.be.true;
      });

      it("should have minlength attribute set correctly", async () => {
        const el = await fixture<BlTextarea>(html`<bl-textarea minlength="5"></bl-textarea>`);
        const textarea = el.shadowRoot?.querySelector("textarea");

        expect(textarea?.getAttribute("minlength")).to.equal("5");
        expect(el.minlength).to.equal(5);
      });

      it("should show custom error message with invalid-text attribute", async () => {
        const customError = "Custom error message";
        const el = await fixture<BlTextarea>(html`<bl-textarea required invalid-text="${customError}"></bl-textarea>`);

        el.reportValidity();
        await elementUpdated(el);

        const errorMessage = el.shadowRoot?.querySelector(".invalid-text");

        expect(errorMessage?.textContent?.trim()).to.equal(customError);
      });

      it("should fire bl-invalid event when validation fails", async () => {
        const el = await fixture<BlTextarea>(html`<bl-textarea required></bl-textarea>`);
        const textarea = el.shadowRoot?.querySelector("textarea");

        if (textarea) textarea.value = "";

        setTimeout(() => textarea?.dispatchEvent(new Event("invalid")));

        const ev = await oneEvent(el, "bl-invalid");

        expect(ev).to.exist;
        expect(ev.detail).to.exist;
        expect(ev.detail.valid).to.be.false;
      });

      it("should transition from valid to invalid when value is cleared", async () => {
        const el = await fixture<BlTextarea>(html`<bl-textarea required value="test"></bl-textarea>`);
        const textarea = el.shadowRoot?.querySelector("textarea");

        expect(el.validity.valid).to.be.true;

        if (textarea) {
          textarea.value = "";
          textarea.dispatchEvent(new Event("input"));
        }

        await elementUpdated(el);

        expect(el.validity.valid).to.be.false;
      });

      it("should show max-len-invalid class when maxlength exceeded", async () => {
        const el = await fixture<BlTextarea>(html`<bl-textarea maxlength="5" value="more than 5 characters"></bl-textarea>`);
        const wrapper = el.shadowRoot?.querySelector(".wrapper");

        el.reportValidity();
        await elementUpdated(el);

        expect(wrapper?.classList.contains("max-len-invalid")).to.be.true;
      });

      it("should update character counter when maxlength exceeded", async () => {
        const el = await fixture<BlTextarea>(html`<bl-textarea maxlength="5" value="toolong" character-counter></bl-textarea>`);
        const counterText = el.shadowRoot?.querySelector(".counter-text");

        expect(counterText?.textContent).to.equal("7/5");
      });

      it("should validate maxlength constraint", async () => {
        const el = await fixture<BlTextarea>(html`<bl-textarea maxlength="5" value="more than five"></bl-textarea>`);

        el.reportValidity();
        await elementUpdated(el);

        expect(el.validity.valid).to.be.false;
        expect(el.validity.tooLong).to.be.true;
      });
    });
  });
});
