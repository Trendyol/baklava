import { assert, expect, fixture, html, waitUntil } from "@open-wc/testing";
import { sendMouse } from "@web/test-runner-commands";
import { stub } from "sinon";
import { getMiddleOfElement } from "../../../utilities/elements";
import "../../alert/bl-alert";
import BlNotificationCard from "./bl-notification-card";

describe("bl-notification-card", () => {
  it("is defined", () => {
    const el = document.createElement("bl-notification-card");

    assert.instanceOf(el, BlNotificationCard);
  });

  describe("Default Props", () => {});

  describe("Variants", () => {
    it("should map variant to alert variant", async () => {
      const el = await fixture<BlNotificationCard>(
        html`<bl-notification-card> Description </bl-notification-card>`
      );
      const alertEl = el.shadowRoot!.querySelector("bl-alert")!;

      el.variant = "error";
      await el.updateComplete;
      expect(alertEl.getAttribute("variant")).to.equal("danger");

      el.variant = "info";
      await el.updateComplete;
      expect(alertEl.getAttribute("variant")).to.equal("info");

      el.variant = "success";
      await el.updateComplete;
      expect(alertEl.getAttribute("variant")).to.equal("success");

      el.variant = "warning";
      await el.updateComplete;
      expect(alertEl.getAttribute("variant")).to.equal("warning");
    });
  });

  describe("Duration", () => {
    it("should set duration animation to alert", async () => {
      const el = await fixture<BlNotificationCard>(
        html`<bl-notification-card duration="5"> Description </bl-notification-card>`
      );

      const remainingEl = el.shadowRoot!.querySelector(".remaining")!;
      const style = getComputedStyle(remainingEl);

      expect(remainingEl).to.exist;
      expect(style.getPropertyValue("animation-name")).to.equal("to-zero");
      expect(style.getPropertyValue("animation-duration")).to.equal("5s");
      expect(style.getPropertyValue("animation-play-state")).to.equal("running");
    });

    it("should trigger close event when duration ends", async () => {
      const el = await fixture<BlNotificationCard>(
        html`<bl-notification-card duration="0.1"> Description </bl-notification-card>`
      );
      const requestCloseStub = stub();
      const closeStub = stub();

      el.addEventListener("bl-notification-card-request-close", requestCloseStub);
      el.addEventListener("bl-notification-card-close", closeStub);

      const remainingEl = el.shadowRoot!.querySelector(".remaining")!;

      const resolveStub = stub();

      remainingEl.addEventListener("animationend", resolveStub);

      await waitUntil(() => resolveStub.calledOnce);

      await el.updateComplete;

      expect(requestCloseStub).to.have.been.calledOnce;
      expect(requestCloseStub.args[0][0].detail).to.deep.equal({
        source: "duration-ended",
      });
      expect(closeStub).to.have.been.calledOnce;
      expect(closeStub.args[0][0].detail).to.deep.equal({
        source: "duration-ended",
      });
    });

    it("should not trigger close event if request close is prevented", async () => {
      const el = await fixture<BlNotificationCard>(
        html`<bl-notification-card duration="0.1"> Description </bl-notification-card>`
      );
      const requestCloseStub = stub();
      const closeStub = stub();

      el.addEventListener("bl-notification-card-request-close", event => {
        event.preventDefault();
        requestCloseStub();
      });
      el.addEventListener("bl-notification-card-close", closeStub);

      const remainingEl = el.shadowRoot!.querySelector(".remaining")!;

      const resolveStub = stub();

      remainingEl.addEventListener("animationend", resolveStub);

      await waitUntil(() => resolveStub.calledOnce);

      await el.updateComplete;

      expect(requestCloseStub).to.have.been.calledOnce;
      expect(closeStub).to.not.have.been.called;
    });

    it("should set play state to paused when mouse enter", async () => {
      const el = await fixture<BlNotificationCard>(
        html`<bl-notification-card duration="5"> Description </bl-notification-card>`
      );

      const remainingEl = el.shadowRoot!.querySelector(".remaining")!;
      const style = getComputedStyle(remainingEl);

      expect(style.getPropertyValue("animation-play-state")).to.equal("running");

      const { x, y } = getMiddleOfElement(el.shadowRoot!.querySelector(".notification")!);

      await sendMouse({
        type: "move",
        position: [x, y],
      });
      expect(style.getPropertyValue("animation-play-state")).to.equal("paused");
    });
  });

  describe("Permanent", () => {
    it("should not render duration", async () => {
      const el = await fixture<BlNotificationCard>(
        html`<bl-notification-card permanent> Description </bl-notification-card>`
      );

      const remainingEl = el.shadowRoot!.querySelector(".remaining")!;

      expect(remainingEl).to.not.exist;
    });
  });

  describe("Actions", () => {
    it("should implement action slots", async () => {
      const el = await fixture<BlNotificationCard>(
        html`<bl-notification-card>
          <bl-button slot="primary-action"> Action Slot </bl-button>
          <bl-button slot="secondary-action"> Action Secondary Slot </bl-button>
        </bl-notification-card>`
      );

      const actionSlot = el.shadowRoot!.querySelector(
        'slot[name="primary-action"]'
      ) as HTMLSlotElement;
      const actionElement = actionSlot?.assignedElements()[0] as HTMLElement;

      expect(actionElement).to.exist;

      const actionSecondarySlot = el.shadowRoot!.querySelector(
        'slot[name="secondary-action"]'
      ) as HTMLSlotElement;
      const actionSecondaryElement = actionSecondarySlot?.assignedElements()[0] as HTMLElement;

      expect(actionSecondaryElement).to.exist;
    });
  });

  describe("Close", () => {
    it("should dispatch close event when close button is clicked", async () => {
      const el = await fixture<BlNotificationCard>(
        html`<bl-notification-card> Description </bl-notification-card>`
      );
      const requestCloseStub = stub();
      const closeStub = stub();

      el.addEventListener("bl-notification-card-request-close", requestCloseStub);
      el.addEventListener("bl-notification-card-close", closeStub);

      el.shadowRoot!.querySelector("bl-alert")!.dispatchEvent(new CustomEvent("bl-close"));

      expect(requestCloseStub).to.have.been.calledOnce;
      expect(requestCloseStub.args[0][0].detail).to.deep.equal({
        source: "close-button",
      });
      expect(closeStub).to.have.been.calledOnce;
      expect(closeStub.args[0][0].detail).to.deep.equal({
        source: "close-button",
      });
    });
  });
});
