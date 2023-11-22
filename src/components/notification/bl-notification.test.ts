import { assert, expect, fixture, html } from "@open-wc/testing";
import { setViewport, emulateMedia } from "@web/test-runner-commands";
import { spy, stub } from "sinon";
import BlNotification from "./bl-notification";
import BlNotificationCard from "./card/bl-notification-card";

function sendTouchEvent(
  x: number,
  y: number,
  element: BlNotificationCard,
  eventType: "touchstart" | "touchend" | "touchmove"
) {
  const touchObj = new Touch({
    identifier: Date.now(),
    target: element,
    clientX: x,
    clientY: y,
    radiusX: 2.5,
    radiusY: 2.5,
    rotationAngle: 10,
    force: 0.5,
  });

  const touchEvent = new TouchEvent(eventType, {
    cancelable: true,
    bubbles: true,
    touches: [touchObj],
    targetTouches: [],
    changedTouches: [touchObj],
    shiftKey: true,
  });

  element.dispatchEvent(touchEvent);
}

describe("bl-notification", () => {
  it("is defined", () => {
    const el = document.createElement("bl-notification");

    assert.instanceOf(el, BlNotification);
  });

  it("should have fixed width of 397px", async () => {
    const el = await fixture<BlNotification>(html`<bl-notification></bl-notification>`);
    const wrapper = el.shadowRoot!.querySelector(".wrapper")!;
    const style = window.getComputedStyle(wrapper);

    assert.equal(style.maxWidth, "396px");
  });

  describe("Default props", () => {
    it("should create notifications with given default duration", async () => {
      const el = await fixture<BlNotification>(
        html`<bl-notification duration="5"></bl-notification>`
      );

      const notification = el.addNotification({
        caption: "test",
        description: "test",
        variant: "info",
        icon: "academy",
      });

      await el.updateComplete;

      assert.equal(notification.duration, el.duration);

      const notificationEl = el.shadowRoot!.querySelector("bl-notification-card")!;

      expect(notificationEl).to.have.attribute("duration", el.duration.toString());
    });
  });

  describe("Remove Notification", () => {
    it("should remove notification after remove animation", async () => {
      const el = await fixture<BlNotification>(html`<bl-notification></bl-notification>`);

      const notification = el.addNotification({
        caption: "test",
        description: "test",
        variant: "info",
        icon: "academy",
      });

      await el.updateComplete;

      const animationPromise = el.removeNotification(notification.id);
      const notificationEl = el.shadowRoot!.querySelector("bl-notification-card")!;

      expect(notificationEl)
        .to.have.attribute("style")
        .match(/height: \d+px/);
      assert.isTrue(notificationEl.classList.contains("removing"));
      assert.lengthOf(el.notificationList, 1);

      await animationPromise;
      await el.updateComplete;
      assert.lengthOf(el.notificationList, 0);
    });

    it("should return false if notification does not exist", async () => {
      const el = await fixture<BlNotification>(html`<bl-notification></bl-notification>`);

      const result = await el.removeNotification("test");

      assert.isFalse(result);
    });

    it("should call remove notification when bl-notification-card-request-close event is dispatched", async () => {
      const el = await fixture<BlNotification>(html`<bl-notification></bl-notification>`);

      el.addNotification({
        caption: "test",
        description: "test",
        variant: "info",
        icon: "academy",
      });

      await el.updateComplete;

      const notificationEl = el.shadowRoot!.querySelector("bl-notification-card")!;

      notificationEl.dispatchEvent(
        new CustomEvent("bl-notification-card-request-close", {
          bubbles: true,
          composed: true,
          detail: { source: "test" },
        })
      );

      await el.updateComplete;

      assert.isTrue(notificationEl.classList.contains("removing"));
    });
  });

  describe("Animation", () => {
    it("should render bl-notification-card with animation", async () => {
      const el = await fixture<BlNotification>(html`<bl-notification></bl-notification>`);

      el.addNotification({
        caption: "test",
        description: "test",
        variant: "info",
        duration: 5,
        icon: "academy",
      });

      await el.updateComplete;

      const notificationEl = el.shadowRoot!.querySelector("bl-notification-card")!;
      const style = window.getComputedStyle(notificationEl);

      expect(style.animationName).to.equal("slide-in-right");
    });

    it("should render out bl-notification-card with animation", async () => {
      const el = await fixture<BlNotification>(html`<bl-notification></bl-notification>`);

      const notification = el.addNotification({
        caption: "test",
        description: "test",
        variant: "info",
        duration: 5,
        icon: "academy",
      });

      await el.updateComplete;

      el.removeNotification(notification.id);

      const notificationEl = el.shadowRoot!.querySelector("bl-notification-card")!;
      const style = window.getComputedStyle(notificationEl);

      expect(style.animationName).to.equal("slide-out-right, size-to-zero");
    });

    it("should not run animations when user has preferred reduced motion", async () => {
      await emulateMedia({
        reducedMotion: "reduce",
      });

      const el = await fixture<BlNotification>(html`<bl-notification></bl-notification>`);

      const { remove } = el.addNotification({
        caption: "test",
        description: "test",
        variant: "info",
        duration: 5,
        icon: "academy",
      });

      await el.updateComplete;

      const notificationEl = el.shadowRoot!.querySelector("bl-notification-card")!;

      assert.equal(window.getComputedStyle(notificationEl).animationName, "none");

      remove();

      assert.equal(window.getComputedStyle(notificationEl).animationName, "size-to-zero");

      await emulateMedia({
        reducedMotion: "no-preference",
      });
    });
  });

  describe("Actions", () => {
    it('should render primaryAction slot when provided with "primaryAction" property on notification', async () => {
      const el = await fixture<BlNotification>(html`<bl-notification></bl-notification>`);

      el.addNotification({
        caption: "test",
        description: "test",
        variant: "info",
        duration: 5,
        icon: "academy",
        primaryAction: {
          label: "test",
          onClick: () => {},
        },
      });

      await el.updateComplete;

      const notificationEl = el.shadowRoot!.querySelector("bl-notification-card")!;

      assert.exists(notificationEl.querySelector("[slot=primary-action]"));
      assert.include(notificationEl.querySelector("[slot=primary-action]")?.textContent, "test");
    });

    it("should call onClick callback when action is clicked", async () => {
      const onClick = stub();

      const el = await fixture<BlNotification>(html`<bl-notification></bl-notification>`);

      el.addNotification({
        caption: "test",
        description: "test",
        variant: "info",
        duration: 5,
        icon: "academy",
        primaryAction: {
          label: "test",
          onClick,
        },
      });

      await el.updateComplete;

      const notificationEl = el.shadowRoot!.querySelector("bl-notification-card")!;

      notificationEl.querySelector("[slot=primary-action]")?.dispatchEvent(
        new CustomEvent("bl-click", {
          bubbles: true,
          composed: true,
        })
      );

      await el.updateComplete;

      expect(onClick).to.have.been.calledOnce;
    });

    describe("Secondary Actions", () => {
      it('should render secondary action slot when provided with "secondaryAction" property on notification', async () => {
        const el = await fixture<BlNotification>(html`<bl-notification></bl-notification>`);

        el.addNotification({
          caption: "test",
          description: "test",
          variant: "info",
          duration: 5,
          icon: "academy",
          secondaryAction: {
            label: "test",
            onClick: () => {},
          },
        });

        await el.updateComplete;

        const notificationEl = el.shadowRoot!.querySelector("bl-notification-card")!;

        assert.exists(notificationEl.querySelector("[slot=secondary-action]"));
        assert.include(
          notificationEl.querySelector("[slot=secondary-action]")?.textContent,
          "test"
        );
      });

      it("should call onClick callback when secondary action is clicked", async () => {
        const onClick = stub();

        const el = await fixture<BlNotification>(html`<bl-notification></bl-notification>`);

        el.addNotification({
          caption: "test",
          description: "test",
          variant: "info",
          duration: 5,
          icon: "academy",
          secondaryAction: {
            label: "test",
            onClick,
          },
        });

        await el.updateComplete;

        const notificationEl = el.shadowRoot!.querySelector("bl-notification-card")!;

        notificationEl.querySelector("[slot=secondary-action]")?.dispatchEvent(
          new CustomEvent("bl-click", {
            bubbles: true,
            composed: true,
          })
        );

        await el.updateComplete;

        expect(onClick).to.have.been.calledOnce;
      });
    });
  });

  describe("Add Notification", () => {
    it("should render bl-notification-card to match snapshot", async () => {
      const el = await fixture<BlNotification>(html`<bl-notification></bl-notification>`);

      el.addNotification({
        caption: "test",
        description: "test",
        variant: "info",
        duration: 5,
        icon: "academy",
      });

      await el.updateComplete;

      assert.shadowDom.equal(
        el,
        `
          <div class="wrapper">
            <bl-notification-card
              caption="test"
              class="notification"
              data-slide="right"
              duration="5"
              icon="academy"
              variant="info"
              id="${el.notificationList[0].id}"
            >
              test
            </bl-notification-card>
          </div>
        `
      );
    });

    it("should render last bl-notification-card first", async () => {
      const el = await fixture<BlNotification>(html`<bl-notification></bl-notification>`);

      const wrapper = el.shadowRoot!.querySelector(".wrapper")!;
      const style = window.getComputedStyle(wrapper);

      assert.equal(style.flexDirection, "column-reverse");
    });

    describe("Notification Interface", () => {
      it("should return notification with given id", async () => {
        const el = await fixture<BlNotification>(html`<bl-notification></bl-notification>`);

        const notification = el.addNotification({
          caption: "test",
          description: "test",
          variant: "info",
          duration: 5,
          icon: "academy",
        });

        await el.updateComplete;

        assert.equal(el.notificationList[0], notification);
      });

      it("should return functional remove method", async () => {
        const el = await fixture<BlNotification>(html`<bl-notification></bl-notification>`);

        const notification = el.addNotification({
          caption: "test",
          description: "test",
          variant: "info",
          duration: 5,
          icon: "academy",
        });

        await el.updateComplete;

        assert.isFunction(notification.remove);

        await notification.remove();

        await el.updateComplete;

        assert.lengthOf(el.notificationList, 0);
      });
    });
  });

  describe("Mobile", () => {
    beforeEach(async () => {
      await setViewport({ width: 320, height: 480 });
    });

    describe("Touch", () => {
      it("should save touch start position", async () => {
        // FIXME: Cant emulate touch events in web test runner
        if (!window.navigator.userAgent.includes("Chrome")) {
          return;
        }

        const el = await fixture<BlNotification>(html`<bl-notification></bl-notification>`);

        el.addNotification({
          caption: "test",
          description: "test",
          variant: "info",
          duration: 5,
          icon: "academy",
        });

        await el.updateComplete;

        const notificationEl = el.shadowRoot!.querySelector("bl-notification-card")!;

        sendTouchEvent(100, 100, notificationEl, "touchstart");

        assert.equal(el.touchStart.y, 100);
      });

      it("should remove notification when user swipes up", async () => {
        // FIXME: Cant emulate touch events in web test runner
        if (!window.navigator.userAgent.includes("Chrome")) {
          return;
        }

        const el = await fixture<BlNotification>(html`<bl-notification></bl-notification>`);
        const removeSpy = spy(el, "removeNotification");

        el.addNotification({
          caption: "test",
          description: "test",
          variant: "info",
          duration: 5,
          icon: "academy",
        });

        await el.updateComplete;

        const notificationEl = el.shadowRoot!.querySelector("bl-notification-card")!;

        sendTouchEvent(100, -100, notificationEl, "touchend");

        expect(removeSpy).to.have.been.calledOnceWith(el.notificationList[0].id);
      });

      it("should not remove notification when user swipes up less than 50px", async () => {
        // FIXME: Cant emulate touch events in web test runner
        if (!window.navigator.userAgent.includes("Chrome")) {
          return;
        }

        const el = await fixture<BlNotification>(html`<bl-notification></bl-notification>`);
        const removeSpy = spy(el, "removeNotification");

        el.addNotification({
          caption: "test",
          description: "test",
          variant: "info",
          duration: 5,
          icon: "academy",
        });

        await el.updateComplete;

        const notificationEl = el.shadowRoot!.querySelector("bl-notification-card")!;

        sendTouchEvent(0, -49, notificationEl, "touchend");

        await el.updateComplete;

        expect(removeSpy).to.not.have.been.called;
        expect(notificationEl.style.transition).to.equal("transform 0.3s ease 0s");
        expect(notificationEl.style.transform).to.equal("translateY(0px)");

        notificationEl.dispatchEvent(new TransitionEvent("transitionend"));

        await el.updateComplete;

        expect(notificationEl.style.transition).to.equal("");
        expect(notificationEl.style.transform).to.equal("");
      });

      it("should update transform style when users touch moves up or down", async () => {
        // FIXME: Cant emulate touch events in web test runner
        if (!window.navigator.userAgent.includes("Chrome")) {
          return;
        }

        const el = await fixture<BlNotification>(html`<bl-notification></bl-notification>`);

        el.addNotification({
          caption: "test",
          description: "test",
          variant: "info",
          duration: 5,
          icon: "academy",
        });

        await el.updateComplete;

        const notificationEl = el.shadowRoot!.querySelector("bl-notification-card")!;

        sendTouchEvent(100, 50, notificationEl, "touchmove");

        await el.updateComplete;

        assert.equal(notificationEl.style.transform, "translateY(50px)");

        sendTouchEvent(100, -50, notificationEl, "touchmove");

        await el.updateComplete;

        assert.equal(notificationEl.style.transform, "translateY(-50px)");
      });

      it("should do nothing if device is not mobile", async () => {
        // FIXME: Cant emulate touch events in web test runner
        if (!window.navigator.userAgent.includes("Chrome")) {
          return;
        }

        await setViewport({ width: 1024, height: 768 });

        const el = await fixture<BlNotification>(html`<bl-notification></bl-notification>`);
        const removeSpy = spy(el, "removeNotification");

        el.addNotification({
          caption: "test",
          description: "test",
          variant: "info",
          duration: 5,
          icon: "academy",
        });

        await el.updateComplete;

        const notificationEl = el.shadowRoot!.querySelector("bl-notification-card")!;

        sendTouchEvent(100, 100, notificationEl, "touchstart");
        await el.updateComplete;

        assert.equal(el.touchStart.y, 0);

        sendTouchEvent(100, 50, notificationEl, "touchmove");
        await el.updateComplete;

        assert.equal(notificationEl.style.transform, "");

        sendTouchEvent(100, 50, notificationEl, "touchend");
        await el.updateComplete;

        expect(removeSpy).to.not.have.been.called;
      });

      it("should set travel-distance property with current touch position", async () => {
        // FIXME: Cant emulate touch events in web test runner
        if (!window.navigator.userAgent.includes("Chrome")) {
          return;
        }

        const el = await fixture<BlNotification>(html`<bl-notification></bl-notification>`);

        el.addNotification({
          caption: "test",
          description: "test",
          variant: "info",
          permanent: true,
          icon: "academy",
        });

        await el.updateComplete;

        const notificationEl = el.shadowRoot!.querySelector("bl-notification-card")!;

        sendTouchEvent(100, -150, notificationEl, "touchend");

        assert.equal(notificationEl.style.getPropertyValue("--travel-distance"), "-160px");
      });
    });

    describe("Animation", () => {
      it("should render bl-notification-card with animation from top", async () => {
        const el = await fixture<BlNotification>(html`<bl-notification></bl-notification>`);

        el.addNotification({
          caption: "test",
          description: "test",
          variant: "info",
          duration: 5,
          icon: "academy",
        });

        await el.updateComplete;

        const notificationEl = el.shadowRoot!.querySelector("bl-notification-card")!;
        const style = window.getComputedStyle(notificationEl);

        expect(style.animationName).to.equal("slide-in-top");
      });

      it("should render out bl-notification-card with animation to top", async () => {
        const el = await fixture<BlNotification>(html`<bl-notification></bl-notification>`);

        const notification = el.addNotification({
          caption: "test",
          description: "test",
          variant: "info",
          duration: 5,
          icon: "academy",
        });

        await el.updateComplete;

        el.removeNotification(notification.id);

        const notificationEl = el.shadowRoot!.querySelector("bl-notification-card")!;
        const style = window.getComputedStyle(notificationEl);

        expect(style.animationName).to.equal("slide-out-top, size-to-zero");
      });
    });

    it("should have fixed width of 100%", async () => {
      // FIXME: Safari won't update styles.
      if (!window.navigator.userAgent.includes("Chrome")) {
        return;
      }

      const el = await fixture<BlNotification>(html`<bl-notification></bl-notification>`);
      const wrapper = el.shadowRoot!.querySelector(".wrapper")!;
      const style = window.getComputedStyle(wrapper);

      assert.equal(style.maxWidth, "100%");
    });

    it("should render first notification first", async () => {
      // FIXME: Safari won't update styles.
      if (!window.navigator.userAgent.includes("Chrome")) {
        return;
      }

      const el = await fixture<BlNotification>(html`<bl-notification></bl-notification>`);

      const wrapper = el.shadowRoot!.querySelector(".wrapper")!;
      const style = window.getComputedStyle(wrapper);

      assert.equal(style.flexDirection, "column");
    });
  });
});
