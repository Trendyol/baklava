import { assert, expect, fixture, elementUpdated, oneEvent, html } from "@open-wc/testing";
import { spy } from "sinon";
import BlUpload from "./bl-upload";

function createMockFile(name: string, size: number, type: string): File {
  const content = new Array(size).fill("a").join("");

  return new File([content], name, { type });
}

function createMockFileList(files: File[]): FileList {
  const dataTransfer = new DataTransfer();

  files.forEach(file => dataTransfer.items.add(file));
  return dataTransfer.files;
}

describe("bl-upload", () => {
  it("is defined", () => {
    const el = document.createElement("bl-upload");

    assert.instanceOf(el, BlUpload);
  });

  it("renders with default values", async () => {
    const el = await fixture<BlUpload>(html`
      <bl-upload></bl-upload>`);

    expect(el.variant).to.equal("horizontal");
    expect(el.multiple).to.equal(false);
    expect(el.disabled).to.equal(false);
    expect(el.showFileList).to.equal(true);
    expect(el.maxFileSize).to.equal(10 * 1024 * 1024);
    expect(el.maxFiles).to.equal(10);
  });

  it("renders upload container with button", async () => {
    const el = await fixture<BlUpload>(html`
      <bl-upload></bl-upload>`);
    const container = el.shadowRoot?.querySelector(".upload-container");
    const button = el.shadowRoot?.querySelector("bl-button");

    expect(container).to.exist;
    expect(button).to.exist;
  });

  it("renders hidden file input", async () => {
    const el = await fixture<BlUpload>(html`
      <bl-upload></bl-upload>`);
    const input = el.shadowRoot?.querySelector("input[type=\"file\"]");

    expect(input).to.exist;
    expect(input?.hasAttribute("hidden")).to.be.true;
  });

  describe("variants", () => {
    it("renders horizontal variant by default", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload></bl-upload>`);
      const container = el.shadowRoot?.querySelector(".upload-container");

      expect(container?.classList.contains("variant-horizontal")).to.be.true;
    });

    it("renders vertical variant", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload variant="vertical"></bl-upload>`);
      const container = el.shadowRoot?.querySelector(".upload-container");

      expect(container?.classList.contains("variant-vertical")).to.be.true;
    });

    it("renders button variant", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload variant="button"></bl-upload>`);
      const container = el.shadowRoot?.querySelector(".upload-container");
      const uploadContent = el.shadowRoot?.querySelector(".upload-content");

      expect(container?.classList.contains("variant-button")).to.be.true;
      expect(uploadContent).to.not.exist;
    });

    it("shows upload content for non-button variants", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload variant="horizontal"></bl-upload>`);
      const uploadContent = el.shadowRoot?.querySelector(".upload-content");
      const uploadIcon = el.shadowRoot?.querySelector(".upload-icon");

      expect(uploadContent).to.exist;
      expect(uploadIcon).to.exist;
    });
  });

  describe("attributes", () => {
    it("is bound to `disabled` attribute", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload disabled></bl-upload>`);
      const input = el.shadowRoot?.querySelector("input[type=\"file\"]");
      const button = el.shadowRoot?.querySelector("bl-button");

      expect(el.disabled).to.be.true;
      expect(input?.hasAttribute("disabled")).to.be.true;
      expect(button?.hasAttribute("disabled")).to.be.true;
    });

    it("is bound to `multiple` attribute", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload multiple></bl-upload>`);
      const input = el.shadowRoot?.querySelector("input[type=\"file\"]");

      expect(el.multiple).to.be.true;
      expect(input?.hasAttribute("multiple")).to.be.true;
    });

    it("is bound to `accept` attribute", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload accept=".jpg,.png"></bl-upload>`);
      const input = el.shadowRoot?.querySelector("input[type=\"file\"]");

      expect(el.accept).to.equal(".jpg,.png");
      expect(input?.getAttribute("accept")).to.equal(".jpg,.png");
    });

    it("is bound to `header-text` attribute", async () => {
      const el = await fixture<BlUpload>(
        html`
          <bl-upload header-text="Custom Header"></bl-upload>`
      );
      const header = el.shadowRoot?.querySelector(".header");

      expect(el.headerText).to.equal("Custom Header");
      expect(header?.textContent).to.equal("Custom Header");
    });

    it("is bound to `description-text` attribute", async () => {
      const el = await fixture<BlUpload>(
        html`
          <bl-upload description-text="Custom Description"></bl-upload>`
      );
      const description = el.shadowRoot?.querySelector(".description");

      expect(el.descriptionText).to.equal("Custom Description");
      expect(description?.textContent).to.equal("Custom Description");
    });

    it("is bound to `button-text` attribute", async () => {
      const el = await fixture<BlUpload>(
        html`
          <bl-upload button-text="Upload File"></bl-upload>`
      );
      const button = el.shadowRoot?.querySelector("bl-button");

      expect(el.buttonText).to.equal("Upload File");
      expect(button?.textContent?.trim()).to.equal("Upload File");
    });

    it("is bound to `max-file-size` attribute", async () => {
      const el = await fixture<BlUpload>(
        html`
          <bl-upload max-file-size="5242880"></bl-upload>`
      );

      expect(el.maxFileSize).to.equal(5242880);
    });

    it("is bound to `max-files` attribute", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload max-files="5"></bl-upload>`);

      expect(el.maxFiles).to.equal(5);
    });
  });

  describe("file selection", () => {
    it("fires bl-upload event when files are selected", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload></bl-upload>`);
      const input = el.shadowRoot?.querySelector("input[type=\"file\"]") as HTMLInputElement;
      const mockFile = createMockFile("test.jpg", 1024, "image/jpeg");
      const fileList = createMockFileList([mockFile]);

      Object.defineProperty(input, "files", { value: fileList });

      setTimeout(() => input.dispatchEvent(new Event("change")));
      const ev = await oneEvent(el, "bl-upload");

      expect(ev).to.exist;
      expect(ev.detail.files).to.have.lengthOf(1);
      expect(ev.detail.files[0].name).to.equal("test.jpg");
    });

    it("fires bl-upload event with multiple files when multiple is true", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload multiple></bl-upload>`);
      const input = el.shadowRoot?.querySelector("input[type=\"file\"]") as HTMLInputElement;
      const mockFiles = [
        createMockFile("test1.jpg", 1024, "image/jpeg"),
        createMockFile("test2.jpg", 2048, "image/jpeg")
      ];
      const fileList = createMockFileList(mockFiles);

      Object.defineProperty(input, "files", { value: fileList });

      setTimeout(() => input.dispatchEvent(new Event("change")));
      const ev = await oneEvent(el, "bl-upload");

      expect(ev).to.exist;
      expect(ev.detail.files).to.have.lengthOf(2);
    });

    it("only accepts single file when multiple is false", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload></bl-upload>`);
      const input = el.shadowRoot?.querySelector("input[type=\"file\"]") as HTMLInputElement;
      const mockFiles = [
        createMockFile("test1.jpg", 1024, "image/jpeg"),
        createMockFile("test2.jpg", 2048, "image/jpeg")
      ];
      const fileList = createMockFileList(mockFiles);

      Object.defineProperty(input, "files", { value: fileList });

      setTimeout(() => input.dispatchEvent(new Event("change")));
      const ev = await oneEvent(el, "bl-upload");

      expect(ev.detail.files).to.have.lengthOf(1);
    });

    it("does not process files when disabled", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload disabled></bl-upload>`);
      const input = el.shadowRoot?.querySelector("input[type=\"file\"]") as HTMLInputElement;
      const mockFile = createMockFile("test.jpg", 1024, "image/jpeg");
      const fileList = createMockFileList([mockFile]);

      Object.defineProperty(input, "files", { value: fileList });

      let eventFired = false;

      el.addEventListener("bl-upload", () => {
        eventFired = true;
      });

      input.dispatchEvent(new Event("change"));
      await elementUpdated(el);

      expect(eventFired).to.be.false;
    });
  });

  describe("file validation", () => {
    it("fires bl-upload-error event for invalid file type", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload accept=".jpg,.png"></bl-upload>`);
      const input = el.shadowRoot?.querySelector("input[type=\"file\"]") as HTMLInputElement;
      const mockFile = createMockFile("test.pdf", 1024, "application/pdf");
      const fileList = createMockFileList([mockFile]);

      Object.defineProperty(input, "files", { value: fileList });

      setTimeout(() => input.dispatchEvent(new Event("change")));
      const ev = await oneEvent(el, "bl-upload-error");

      expect(ev).to.exist;
      expect(ev.detail.errors).to.have.lengthOf(1);
      expect(ev.detail.errors[0].error).to.equal("type");
    });

    it("fires bl-upload-error event for file exceeding max size", async () => {
      const el = await fixture<BlUpload>(
        html`
          <bl-upload max-file-size="1024"></bl-upload>`
      );
      const input = el.shadowRoot?.querySelector("input[type=\"file\"]") as HTMLInputElement;
      const mockFile = createMockFile("test.jpg", 2048, "image/jpeg");
      const fileList = createMockFileList([mockFile]);

      Object.defineProperty(input, "files", { value: fileList });

      setTimeout(() => input.dispatchEvent(new Event("change")));
      const ev = await oneEvent(el, "bl-upload-error");

      expect(ev).to.exist;
      expect(ev.detail.errors).to.have.lengthOf(1);
      expect(ev.detail.errors[0].error).to.equal("size");
    });

    it("fires bl-upload-error event when max files exceeded", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload multiple max-files="2"></bl-upload>`);
      const input = el.shadowRoot?.querySelector("input[type=\"file\"]") as HTMLInputElement;
      const mockFiles = [
        createMockFile("test1.jpg", 100, "image/jpeg"),
        createMockFile("test2.jpg", 100, "image/jpeg"),
        createMockFile("test3.jpg", 100, "image/jpeg")
      ];
      const fileList = createMockFileList(mockFiles);

      Object.defineProperty(input, "files", { value: fileList });

      setTimeout(() => input.dispatchEvent(new Event("change")));
      const ev = await oneEvent(el, "bl-upload-error");

      expect(ev).to.exist;
      expect(ev.detail.errors.some((e: { error: string }) => e.error === "maxFiles")).to.be.true;
    });

    it("validates wildcard mime types correctly", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload accept="image/*"></bl-upload>`);
      const input = el.shadowRoot?.querySelector("input[type=\"file\"]") as HTMLInputElement;
      const mockFile = createMockFile("test.jpg", 1024, "image/jpeg");
      const fileList = createMockFileList([mockFile]);

      Object.defineProperty(input, "files", { value: fileList });

      setTimeout(() => input.dispatchEvent(new Event("change")));
      const ev = await oneEvent(el, "bl-upload");

      expect(ev).to.exist;
      expect(ev.detail.files).to.have.lengthOf(1);
    });

    it("validates extension types correctly", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload accept=".pdf"></bl-upload>`);
      const input = el.shadowRoot?.querySelector("input[type=\"file\"]") as HTMLInputElement;
      const mockFile = createMockFile("document.pdf", 1024, "application/pdf");
      const fileList = createMockFileList([mockFile]);

      Object.defineProperty(input, "files", { value: fileList });

      setTimeout(() => input.dispatchEvent(new Event("change")));
      const ev = await oneEvent(el, "bl-upload");

      expect(ev).to.exist;
      expect(ev.detail.files).to.have.lengthOf(1);
    });

    it("validates exact mime types correctly", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload accept="image/png"></bl-upload>`);
      const input = el.shadowRoot?.querySelector("input[type=\"file\"]") as HTMLInputElement;
      const mockFile = createMockFile("image.png", 1024, "image/png");
      const fileList = createMockFileList([mockFile]);

      Object.defineProperty(input, "files", { value: fileList });

      setTimeout(() => input.dispatchEvent(new Event("change")));
      const ev = await oneEvent(el, "bl-upload");

      expect(ev).to.exist;
      expect(ev.detail.files).to.have.lengthOf(1);
    });

    it("allows all file types when accept is not set", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload></bl-upload>`);
      const input = el.shadowRoot?.querySelector("input[type=\"file\"]") as HTMLInputElement;
      const mockFile = createMockFile("document.xyz", 1024, "application/xyz");
      const fileList = createMockFileList([mockFile]);

      Object.defineProperty(input, "files", { value: fileList });

      setTimeout(() => input.dispatchEvent(new Event("change")));
      const ev = await oneEvent(el, "bl-upload");

      expect(ev).to.exist;
      expect(ev.detail.files).to.have.lengthOf(1);
    });
  });

  describe("file list", () => {
    it("displays uploaded files in file list", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload></bl-upload>`);
      const input = el.shadowRoot?.querySelector("input[type=\"file\"]") as HTMLInputElement;
      const mockFile = createMockFile("test.jpg", 1024, "image/jpeg");
      const fileList = createMockFileList([mockFile]);

      Object.defineProperty(input, "files", { value: fileList });
      input.dispatchEvent(new Event("change"));

      await elementUpdated(el);

      const fileListEl = el.shadowRoot?.querySelector(".file-list");
      const fileItem = el.shadowRoot?.querySelector(".file-item");
      const fileName = el.shadowRoot?.querySelector(".file-name");

      expect(fileListEl).to.exist;
      expect(fileItem).to.exist;
      expect(fileName?.textContent?.trim()).to.equal("test.jpg");
    });

    it("does not display file list when showFileList is false", async () => {
      const el = await fixture<BlUpload>(
        html`
          <bl-upload .showFileList=${false}></bl-upload>`
      );
      const input = el.shadowRoot?.querySelector("input[type=\"file\"]") as HTMLInputElement;
      const mockFile = createMockFile("test.jpg", 1024, "image/jpeg");
      const fileList = createMockFileList([mockFile]);

      Object.defineProperty(input, "files", { value: fileList });
      input.dispatchEvent(new Event("change"));

      await elementUpdated(el);

      const fileListEl = el.shadowRoot?.querySelector(".file-list");

      expect(fileListEl).to.not.exist;
    });

    it("fires bl-file-remove event when remove button is clicked", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload></bl-upload>`);
      const input = el.shadowRoot?.querySelector("input[type=\"file\"]") as HTMLInputElement;
      const mockFile = createMockFile("test.jpg", 1024, "image/jpeg");
      const fileList = createMockFileList([mockFile]);

      Object.defineProperty(input, "files", { value: fileList });
      input.dispatchEvent(new Event("change"));

      await elementUpdated(el);

      const removeButton = el.shadowRoot?.querySelector(".remove-button") as HTMLElement;

      setTimeout(() => removeButton?.click());
      const ev = await oneEvent(el, "bl-file-remove");

      expect(ev).to.exist;
      expect(ev.detail.file.name).to.equal("test.jpg");
    });

    it("removes file from list when remove button is clicked", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload></bl-upload>`);
      const input = el.shadowRoot?.querySelector("input[type=\"file\"]") as HTMLInputElement;
      const mockFile = createMockFile("test.jpg", 1024, "image/jpeg");
      const fileList = createMockFileList([mockFile]);

      Object.defineProperty(input, "files", { value: fileList });
      input.dispatchEvent(new Event("change"));

      await elementUpdated(el);

      expect(el.files).to.have.lengthOf(1);

      const removeButton = el.shadowRoot?.querySelector(".remove-button") as HTMLElement;

      removeButton?.click();

      await elementUpdated(el);

      expect(el.files).to.have.lengthOf(0);
    });

    it("uses bl-button for remove (not bl-icon)", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload></bl-upload>`);
      const input = el.shadowRoot?.querySelector("input[type=\"file\"]") as HTMLInputElement;
      const mockFile = createMockFile("test.jpg", 1024, "image/jpeg");
      const fileList = createMockFileList([mockFile]);

      Object.defineProperty(input, "files", { value: fileList });
      input.dispatchEvent(new Event("change"));

      await elementUpdated(el);

      const removeControl = el.shadowRoot?.querySelector(".remove-button");

      expect(removeControl?.tagName).to.equal("BL-BUTTON");
    });

    it("renders file name as a button with file-name class", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload></bl-upload>`);
      const input = el.shadowRoot?.querySelector("input[type=\"file\"]") as HTMLInputElement;
      const mockFile = createMockFile("document.pdf", 1024, "application/pdf");
      const fileList = createMockFileList([mockFile]);

      Object.defineProperty(input, "files", { value: fileList });
      input.dispatchEvent(new Event("change"));

      await elementUpdated(el);

      const fileNameButton = el.shadowRoot?.querySelector(".file-name");

      expect(fileNameButton?.tagName).to.equal("BUTTON");
      expect(fileNameButton?.textContent?.trim()).to.equal("document.pdf");
    });

    it("triggers download when file name button is clicked", async () => {
      const createObjectURLSpy = spy(URL, "createObjectURL");
      const revokeObjectURLSpy = spy(URL, "revokeObjectURL");

      const el = await fixture<BlUpload>(html`
        <bl-upload></bl-upload>`);
      const input = el.shadowRoot?.querySelector("input[type=\"file\"]") as HTMLInputElement;
      const mockFile = createMockFile("test.jpg", 1024, "image/jpeg");
      const fileList = createMockFileList([mockFile]);

      Object.defineProperty(input, "files", { value: fileList });
      input.dispatchEvent(new Event("change"));

      await elementUpdated(el);

      const fileNameButton = el.shadowRoot?.querySelector(".file-name") as HTMLButtonElement;

      fileNameButton?.click();

      expect(createObjectURLSpy.calledOnce).to.be.true;
      expect(createObjectURLSpy.firstCall.args[0]).to.be.instanceOf(File);
      expect(createObjectURLSpy.firstCall.args[0]).to.have.property("name", "test.jpg");
      expect(revokeObjectURLSpy.calledOnce).to.be.true;

      createObjectURLSpy.restore();
      revokeObjectURLSpy.restore();
    });

    it("clicking file name does not remove the file from list", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload></bl-upload>`);
      const input = el.shadowRoot?.querySelector("input[type=\"file\"]") as HTMLInputElement;
      const mockFile = createMockFile("test.jpg", 1024, "image/jpeg");
      const fileList = createMockFileList([mockFile]);

      Object.defineProperty(input, "files", { value: fileList });
      input.dispatchEvent(new Event("change"));

      await elementUpdated(el);

      expect(el.files).to.have.lengthOf(1);

      const fileNameButton = el.shadowRoot?.querySelector(".file-name") as HTMLButtonElement;

      fileNameButton?.click();

      await elementUpdated(el);

      expect(el.files).to.have.lengthOf(1);
    });
  });

  describe("drag and drop", () => {
    it("adds drag-over class to wrapper when dragging over", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload></bl-upload>`);
      const container = el.shadowRoot?.querySelector(".upload-container") as HTMLElement;
      const wrapper = el.shadowRoot?.querySelector(".upload-wrapper") as HTMLElement;

      const dragOverEvent = new DragEvent("dragover", {
        bubbles: true,
        cancelable: true
      });

      container.dispatchEvent(dragOverEvent);

      await elementUpdated(el);

      expect(wrapper?.classList.contains("drag-over")).to.be.true;
    });

    it("removes drag-over class from wrapper when dragging leaves", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload></bl-upload>`);
      const container = el.shadowRoot?.querySelector(".upload-container") as HTMLElement;
      const wrapper = el.shadowRoot?.querySelector(".upload-wrapper") as HTMLElement;

      const dragOverEvent = new DragEvent("dragover", {
        bubbles: true,
        cancelable: true
      });

      container.dispatchEvent(dragOverEvent);
      await elementUpdated(el);

      const dragLeaveEvent = new DragEvent("dragleave", {
        bubbles: true,
        cancelable: true,
        relatedTarget: document.body
      });

      container.dispatchEvent(dragLeaveEvent);
      await elementUpdated(el);

      expect(wrapper?.classList.contains("drag-over")).to.be.false;
    });

    it("does not add drag-over class when disabled", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload disabled></bl-upload>`);
      const container = el.shadowRoot?.querySelector(".upload-container") as HTMLElement;
      const wrapper = el.shadowRoot?.querySelector(".upload-wrapper") as HTMLElement;

      const dragOverEvent = new DragEvent("dragover", {
        bubbles: true,
        cancelable: true
      });

      container.dispatchEvent(dragOverEvent);
      await elementUpdated(el);

      expect(wrapper?.classList.contains("drag-over")).to.be.false;
    });

    it("does not add drag-over class for button variant", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload variant="button"></bl-upload>`);
      const container = el.shadowRoot?.querySelector(".upload-container") as HTMLElement;
      const wrapper = container?.parentElement;

      const dragOverEvent = new DragEvent("dragover", {
        bubbles: true,
        cancelable: true
      });

      container.dispatchEvent(dragOverEvent);
      await elementUpdated(el);

      expect(wrapper?.classList.contains("drag-over")).to.be.false;
    });
  });

  describe("keyboard interaction", () => {
    it("prevents default on Enter key", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload></bl-upload>`);
      const container = el.shadowRoot?.querySelector(".upload-container") as HTMLElement;

      const enterEvent = new KeyboardEvent("keydown", {
        key: "Enter",
        bubbles: true,
        cancelable: true
      });

      container.dispatchEvent(enterEvent);

      expect(enterEvent.defaultPrevented).to.be.true;
    });

    it("prevents default on Space key", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload></bl-upload>`);
      const container = el.shadowRoot?.querySelector(".upload-container") as HTMLElement;

      const spaceEvent = new KeyboardEvent("keydown", {
        key: " ",
        bubbles: true,
        cancelable: true
      });

      container.dispatchEvent(spaceEvent);

      expect(spaceEvent.defaultPrevented).to.be.true;
    });

    it("does not prevent default when disabled", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload disabled></bl-upload>`);
      const container = el.shadowRoot?.querySelector(".upload-container") as HTMLElement;

      const enterEvent = new KeyboardEvent("keydown", {
        key: "Enter",
        bubbles: true,
        cancelable: true
      });

      container.dispatchEvent(enterEvent);

      expect(enterEvent.defaultPrevented).to.be.false;
    });

    it("does not prevent default for other keys", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload></bl-upload>`);
      const container = el.shadowRoot?.querySelector(".upload-container") as HTMLElement;

      const tabEvent = new KeyboardEvent("keydown", {
        key: "Tab",
        bubbles: true,
        cancelable: true
      });

      container.dispatchEvent(tabEvent);

      expect(tabEvent.defaultPrevented).to.be.false;
    });
  });

  describe("public methods", () => {
    it("returns files via files getter", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload></bl-upload>`);
      const input = el.shadowRoot?.querySelector("input[type=\"file\"]") as HTMLInputElement;
      const mockFile = createMockFile("test.jpg", 1024, "image/jpeg");
      const fileList = createMockFileList([mockFile]);

      Object.defineProperty(input, "files", { value: fileList });
      input.dispatchEvent(new Event("change"));

      await elementUpdated(el);

      expect(el.files).to.have.lengthOf(1);
      expect(el.files[0].name).to.equal("test.jpg");
      expect(el.files[0].size).to.equal(1024);
      expect(el.files[0].type).to.equal("image/jpeg");
    });

    it("clears all files via clearFiles method", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload></bl-upload>`);
      const input = el.shadowRoot?.querySelector("input[type=\"file\"]") as HTMLInputElement;
      const mockFile = createMockFile("test.jpg", 1024, "image/jpeg");
      const fileList = createMockFileList([mockFile]);

      Object.defineProperty(input, "files", { value: fileList });
      input.dispatchEvent(new Event("change"));

      await elementUpdated(el);

      expect(el.files).to.have.lengthOf(1);

      el.clearFiles();

      await elementUpdated(el);

      expect(el.files).to.have.lengthOf(0);
    });
  });

  describe("callback functions", () => {
    it("calls onFilesSelected callback when files are selected", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload></bl-upload>`);
      const callbackSpy = spy();

      el.onFilesSelected = callbackSpy;

      const input = el.shadowRoot?.querySelector("input[type=\"file\"]") as HTMLInputElement;
      const mockFile = createMockFile("test.jpg", 1024, "image/jpeg");
      const fileList = createMockFileList([mockFile]);

      Object.defineProperty(input, "files", { value: fileList });
      input.dispatchEvent(new Event("change"));

      await elementUpdated(el);

      expect(callbackSpy.calledOnce).to.be.true;
      expect(callbackSpy.firstCall.args[0]).to.have.lengthOf(1);
      expect(callbackSpy.firstCall.args[0][0].name).to.equal("test.jpg");
    });

    it("calls onError callback when there are validation errors", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload accept=".jpg"></bl-upload>`);
      const callbackSpy = spy();

      el.onError = callbackSpy;

      const input = el.shadowRoot?.querySelector("input[type=\"file\"]") as HTMLInputElement;
      const mockFile = createMockFile("test.pdf", 1024, "application/pdf");
      const fileList = createMockFileList([mockFile]);

      Object.defineProperty(input, "files", { value: fileList });
      input.dispatchEvent(new Event("change"));

      await elementUpdated(el);

      expect(callbackSpy.calledOnce).to.be.true;
      expect(callbackSpy.firstCall.args[0][0].error).to.equal("type");
    });

    it("calls onFileRemoved callback when a file is removed", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload></bl-upload>`);
      const callbackSpy = spy();

      el.onFileRemoved = callbackSpy;

      const input = el.shadowRoot?.querySelector("input[type=\"file\"]") as HTMLInputElement;
      const mockFile = createMockFile("test.jpg", 1024, "image/jpeg");
      const fileList = createMockFileList([mockFile]);

      Object.defineProperty(input, "files", { value: fileList });
      input.dispatchEvent(new Event("change"));

      await elementUpdated(el);

      const removeButton = el.shadowRoot?.querySelector(".remove-button") as HTMLElement;

      removeButton?.click();

      await elementUpdated(el);

      expect(callbackSpy.calledOnce).to.be.true;
      expect(callbackSpy.firstCall.args[0].name).to.equal("test.jpg");
    });
  });

  describe("accessibility", () => {
    it("has correct role attribute", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload></bl-upload>`);
      const container = el.shadowRoot?.querySelector(".upload-container");

      expect(container?.getAttribute("role")).to.equal("button");
    });

    it("has correct aria-label", async () => {
      const el = await fixture<BlUpload>(
        html`
          <bl-upload header-text="Upload Files"></bl-upload>`
      );
      const container = el.shadowRoot?.querySelector(".upload-container");

      expect(container?.getAttribute("aria-label")).to.equal("Upload Files");
    });

    it("has correct aria-disabled when disabled", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload disabled></bl-upload>`);
      const container = el.shadowRoot?.querySelector(".upload-container");

      expect(container?.getAttribute("aria-disabled")).to.equal("true");
    });

    it("has tabindex 0 when enabled", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload></bl-upload>`);
      const container = el.shadowRoot?.querySelector(".upload-container");

      expect(container?.getAttribute("tabindex")).to.equal("0");
    });

    it("has tabindex -1 when disabled", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload disabled></bl-upload>`);
      const container = el.shadowRoot?.querySelector(".upload-container");

      expect(container?.getAttribute("tabindex")).to.equal("-1");
    });
  });

  describe("upload progress simulation", () => {
    it("shows spinner during uploading state", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload></bl-upload>`);
      const input = el.shadowRoot?.querySelector("input[type=\"file\"]") as HTMLInputElement;
      const mockFile = createMockFile("test.jpg", 1024, "image/jpeg");
      const fileList = createMockFileList([mockFile]);

      Object.defineProperty(input, "files", { value: fileList });
      input.dispatchEvent(new Event("change"));

      await elementUpdated(el);

      const spinner = el.shadowRoot?.querySelector("bl-spinner");

      expect(spinner).to.exist;
    });

    it("transitions to success state after upload completes", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload></bl-upload>`);
      const input = el.shadowRoot?.querySelector("input[type=\"file\"]") as HTMLInputElement;
      const mockFile = createMockFile("test.jpg", 1024, "image/jpeg");
      const fileList = createMockFileList([mockFile]);

      Object.defineProperty(input, "files", { value: fileList });
      input.dispatchEvent(new Event("change"));

      await elementUpdated(el);

      await new Promise(resolve => setTimeout(resolve, 1500));
      await elementUpdated(el);

      const successIcon = el.shadowRoot?.querySelector("bl-icon[name=\"check_fill\"]");

      expect(successIcon).to.exist;
    });

    it("transitions to error state for invalid files after animation", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload accept=".jpg"></bl-upload>`);
      const input = el.shadowRoot?.querySelector("input[type=\"file\"]") as HTMLInputElement;
      const mockFile = createMockFile("test.pdf", 1024, "application/pdf");
      const fileList = createMockFileList([mockFile]);

      Object.defineProperty(input, "files", { value: fileList });
      input.dispatchEvent(new Event("change"));

      await elementUpdated(el);

      await new Promise(resolve => setTimeout(resolve, 1500));
      await elementUpdated(el);

      const errorIcon = el.shadowRoot?.querySelector("bl-icon[name=\"alert\"]");
      const errorMessage = el.shadowRoot?.querySelector(".error-message");

      expect(errorIcon).to.exist;
      expect(errorMessage).to.exist;
    });
  });

  describe("drop functionality", () => {
    it("processes dropped files", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload></bl-upload>`);
      const container = el.shadowRoot?.querySelector(".upload-container") as HTMLElement;
      const mockFile = createMockFile("test.jpg", 1024, "image/jpeg");
      const dataTransfer = new DataTransfer();

      dataTransfer.items.add(mockFile);

      const dropEvent = new DragEvent("drop", {
        bubbles: true,
        cancelable: true,
        dataTransfer
      });

      setTimeout(() => container.dispatchEvent(dropEvent));
      const ev = await oneEvent(el, "bl-upload");

      expect(ev).to.exist;
      expect(ev.detail.files).to.have.lengthOf(1);
    });

    it("does not process dropped files when disabled", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload disabled></bl-upload>`);
      const container = el.shadowRoot?.querySelector(".upload-container") as HTMLElement;
      const mockFile = createMockFile("test.jpg", 1024, "image/jpeg");
      const dataTransfer = new DataTransfer();

      dataTransfer.items.add(mockFile);

      const dropEvent = new DragEvent("drop", {
        bubbles: true,
        cancelable: true,
        dataTransfer
      });

      let eventFired = false;

      el.addEventListener("bl-upload", () => {
        eventFired = true;
      });

      container.dispatchEvent(dropEvent);
      await elementUpdated(el);

      expect(eventFired).to.be.false;
    });
  });

  describe("button click handling", () => {
    it("does not trigger file input when clicking bl-button element directly", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload></bl-upload>`);
      const button = el.shadowRoot?.querySelector("bl-button") as HTMLElement;

      const clickEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      });

      button.dispatchEvent(clickEvent);
      await elementUpdated(el);

      expect(el).to.exist;
    });

    it("does not trigger file input when disabled and container clicked", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload disabled></bl-upload>`);
      const container = el.shadowRoot?.querySelector(".upload-container") as HTMLElement;

      const clickEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      });

      container.dispatchEvent(clickEvent);
      await elementUpdated(el);

      expect(el).to.exist;
    });
  });

  describe("file type validation edge cases", () => {
    it("handles file with empty type", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload accept=".jpg"></bl-upload>`);
      const input = el.shadowRoot?.querySelector("input[type=\"file\"]") as HTMLInputElement;
      const mockFile = new File(["content"], "test.unknown", { type: "" });
      const fileList = createMockFileList([mockFile]);

      Object.defineProperty(input, "files", { value: fileList });

      setTimeout(() => input.dispatchEvent(new Event("change")));
      const ev = await oneEvent(el, "bl-upload-error");

      expect(ev).to.exist;
      expect(ev.detail.errors[0].error).to.equal("type");
    });

    it("shows default error message when accept is not set", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload></bl-upload>`);

      el.accept = undefined;

      const input = el.shadowRoot?.querySelector("input[type=\"file\"]") as HTMLInputElement;
      const mockFile = createMockFile("test.jpg", 1024, "image/jpeg");
      const fileList = createMockFileList([mockFile]);

      Object.defineProperty(input, "files", { value: fileList });
      input.dispatchEvent(new Event("change"));

      await elementUpdated(el);

      expect(el.files).to.have.lengthOf(1);
    });

    it("handles zero byte file", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload></bl-upload>`);
      const input = el.shadowRoot?.querySelector("input[type=\"file\"]") as HTMLInputElement;
      const mockFile = createMockFile("empty.jpg", 0, "image/jpeg");
      const fileList = createMockFileList([mockFile]);

      Object.defineProperty(input, "files", { value: fileList });

      setTimeout(() => input.dispatchEvent(new Event("change")));
      const ev = await oneEvent(el, "bl-upload");

      expect(ev).to.exist;
      expect(ev.detail.files[0].size).to.equal(0);
    });
  });

  describe("button disabled state", () => {
    it("does not trigger file input when button is clicked and disabled", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload disabled></bl-upload>`);
      const button = el.shadowRoot?.querySelector("bl-button") as HTMLElement;
      const buttonInner = button?.shadowRoot?.querySelector("button") as HTMLElement;

      if (buttonInner) {
        buttonInner.click();
      }

      await elementUpdated(el);

      expect(el.files).to.have.lengthOf(0);
    });
  });

  describe("status icon rendering", () => {
    it("shows correct icon for success status", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload></bl-upload>`);
      const input = el.shadowRoot?.querySelector("input[type=\"file\"]") as HTMLInputElement;
      const mockFile = createMockFile("test.jpg", 1024, "image/jpeg");
      const fileList = createMockFileList([mockFile]);

      Object.defineProperty(input, "files", { value: fileList });
      input.dispatchEvent(new Event("change"));

      await new Promise(resolve => setTimeout(resolve, 1500));
      await elementUpdated(el);

      const successIcon = el.shadowRoot?.querySelector("bl-icon[name=\"check_fill\"]");

      expect(successIcon).to.exist;
    });

    it("shows correct icon for error status", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload accept=".png"></bl-upload>`);
      const input = el.shadowRoot?.querySelector("input[type=\"file\"]") as HTMLInputElement;
      const mockFile = createMockFile("test.pdf", 1024, "application/pdf");
      const fileList = createMockFileList([mockFile]);

      Object.defineProperty(input, "files", { value: fileList });
      input.dispatchEvent(new Event("change"));

      await new Promise(resolve => setTimeout(resolve, 1500));
      await elementUpdated(el);

      const errorIcon = el.shadowRoot?.querySelector("bl-icon[name=\"alert\"]");

      expect(errorIcon).to.exist;
    });
  });

  describe("drop with no dataTransfer", () => {
    it("handles drop event with no files gracefully", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload></bl-upload>`);
      const container = el.shadowRoot?.querySelector(".upload-container") as HTMLElement;

      const dropEvent = new DragEvent("drop", {
        bubbles: true,
        cancelable: true
      });

      container.dispatchEvent(dropEvent);
      await elementUpdated(el);

      expect(el.files).to.have.lengthOf(0);
    });
  });

  describe("zero byte file formatting", () => {
    it("displays 0 Bytes for zero byte file", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload></bl-upload>`);

      // Access the private method directly for testing
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = (el as any)._formatFileSize(0);

      expect(result).to.equal("0 Bytes");
    });
  });

  describe("_simulateUpload error fallback", () => {
    it("uses default error message when errorMessage is undefined", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload></bl-upload>`);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const elAny = el as any;

      // Add a file item manually
      elAny._fileItems = [
        {
          file: createMockFile("test.jpg", 1024, "image/jpeg"),
          id: "test-id",
          name: "test.jpg",
          size: 1024,
          type: "image/jpeg",
          status: "uploading",
          progress: 0
        }
      ];

      // Call _simulateUpload with willFail=true but no errorMessage
      elAny._simulateUpload("test-id", true);

      // Wait for simulation to complete
      await new Promise(resolve => setTimeout(resolve, 1500));
      await elementUpdated(el);

      // Check that the file has error status with default message
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fileItem = elAny._fileItems.find((f: any) => f.id === "test-id");

      expect(fileItem.status).to.equal("error");
      expect(fileItem.errorMessage).to.equal("Dosya yüklenemedi");
    });
  });

  describe("_updateFileStatusWithError map branches", () => {
    it("updates only the matching file and leaves others unchanged", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload></bl-upload>`);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const elAny = el as any;

      // Add multiple file items
      elAny._fileItems = [
        {
          file: createMockFile("file1.jpg", 1024, "image/jpeg"),
          id: "id-1",
          name: "file1.jpg",
          size: 1024,
          type: "image/jpeg",
          status: "uploading",
          progress: 50
        },
        {
          file: createMockFile("file2.jpg", 2048, "image/jpeg"),
          id: "id-2",
          name: "file2.jpg",
          size: 2048,
          type: "image/jpeg",
          status: "uploading",
          progress: 30
        },
        {
          file: createMockFile("file3.jpg", 3072, "image/jpeg"),
          id: "id-3",
          name: "file3.jpg",
          size: 3072,
          type: "image/jpeg",
          status: "uploading",
          progress: 70
        }
      ];

      // Call _updateFileStatusWithError for id-2 only
      elAny._updateFileStatusWithError("id-2", "error", 100, "Test error message");

      // Check that only id-2 was updated
      /* eslint-disable @typescript-eslint/no-explicit-any */
      const file1 = elAny._fileItems.find((f: any) => f.id === "id-1");
      const file2 = elAny._fileItems.find((f: any) => f.id === "id-2");
      const file3 = elAny._fileItems.find((f: any) => f.id === "id-3");
      /* eslint-enable @typescript-eslint/no-explicit-any */

      // file1 should be unchanged
      expect(file1.status).to.equal("uploading");
      expect(file1.progress).to.equal(50);
      expect(file1.errorMessage).to.be.undefined;

      // file2 should be updated
      expect(file2.status).to.equal("error");
      expect(file2.progress).to.equal(100);
      expect(file2.errorMessage).to.equal("Test error message");

      // file3 should be unchanged
      expect(file3.status).to.equal("uploading");
      expect(file3.progress).to.equal(70);
      expect(file3.errorMessage).to.be.undefined;
    });

    it("does not modify any file when fileId does not match", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload></bl-upload>`);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const elAny = el as any;

      elAny._fileItems = [
        {
          file: createMockFile("file1.jpg", 1024, "image/jpeg"),
          id: "id-1",
          name: "file1.jpg",
          size: 1024,
          type: "image/jpeg",
          status: "uploading",
          progress: 50
        }
      ];

      // Call with non-existent id
      elAny._updateFileStatusWithError("non-existent-id", "error", 100, "Error");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const file1 = elAny._fileItems.find((f: any) => f.id === "id-1");

      expect(file1.status).to.equal("uploading");
      expect(file1.progress).to.equal(50);
      expect(file1.errorMessage).to.be.undefined;
    });
  });

  describe("accept format in error message", () => {
    it("formats accept prop with spaces in error message", async () => {
      const el = await fixture<BlUpload>(html`<bl-upload accept=".jpg,.png,.pdf"></bl-upload>`);
      const input = el.shadowRoot?.querySelector('input[type="file"]') as HTMLInputElement;
      const mockFile = createMockFile("test.exe", 1024, "application/exe");
      const fileList = createMockFileList([mockFile]);

      Object.defineProperty(input, "files", { value: fileList });
      input.dispatchEvent(new Event("change"));

      await new Promise(resolve => setTimeout(resolve, 1500));
      await elementUpdated(el);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const elAny = el as any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fileItem = elAny._fileItems.find((f: any) => f.name === "test.exe");

      // Error message should contain formatted accept with spaces after commas
      expect(fileItem.errorMessage).to.include(".jpg, .png, .pdf");
    });
  });

  describe("_updateFileStatus progress fallback", () => {
    it("preserves existing progress when progress parameter is undefined", async () => {
      const el = await fixture<BlUpload>(html`<bl-upload></bl-upload>`);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const elAny = el as any;

      // Add a file item with existing progress
      elAny._fileItems = [
        {
          file: createMockFile("test.jpg", 1024, "image/jpeg"),
          id: "test-id",
          name: "test.jpg",
          size: 1024,
          type: "image/jpeg",
          status: "uploading",
          progress: 75,
        },
      ];

      // Call _updateFileStatus without progress parameter (undefined)
      elAny._updateFileStatus("test-id", "success");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fileItem = elAny._fileItems.find((f: any) => f.id === "test-id");

      expect(fileItem.status).to.equal("success");
      expect(fileItem.progress).to.equal(75); // Should preserve original progress
    });

    it("updates progress when progress parameter is provided", async () => {
      const el = await fixture<BlUpload>(html`<bl-upload></bl-upload>`);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const elAny = el as any;

      elAny._fileItems = [
        {
          file: createMockFile("test.jpg", 1024, "image/jpeg"),
          id: "test-id",
          name: "test.jpg",
          size: 1024,
          type: "image/jpeg",
          status: "uploading",
          progress: 75,
        },
      ];

      // Call _updateFileStatus with progress parameter
      elAny._updateFileStatus("test-id", "success", 100);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fileItem = elAny._fileItems.find((f: any) => f.id === "test-id");

      expect(fileItem.status).to.equal("success");
      expect(fileItem.progress).to.equal(100); // Should update to new progress
    });
  });

  describe("_handleContainerClick bl-button check", () => {
    it("does not trigger file input when clicking on bl-button element", async () => {
      const el = await fixture<BlUpload>(html`<bl-upload></bl-upload>`);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const elAny = el as any;

      let inputClicked = false;

      if (elAny._fileInput) {
        elAny._fileInput.click = () => {
          inputClicked = true;
        };
      }

      // Create a mock event where target is BL-BUTTON
      const mockTarget = document.createElement("bl-button");
      const mouseEvent = new MouseEvent("click", { bubbles: true });

      Object.defineProperty(mouseEvent, "target", { value: mockTarget });

      elAny._handleContainerClick(mouseEvent);

      expect(inputClicked).to.be.false;
    });

    it("does not trigger file input when clicking inside bl-button", async () => {
      const el = await fixture<BlUpload>(html`<bl-upload></bl-upload>`);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const elAny = el as any;

      let inputClicked = false;

      if (elAny._fileInput) {
        elAny._fileInput.click = () => {
          inputClicked = true;
        };
      }

      // Create a mock target that is inside a bl-button
      const blButton = document.createElement("bl-button");
      const innerSpan = document.createElement("span");

      blButton.appendChild(innerSpan);
      document.body.appendChild(blButton);

      const mouseEvent = new MouseEvent("click", { bubbles: true });

      Object.defineProperty(mouseEvent, "target", { value: innerSpan });

      elAny._handleContainerClick(mouseEvent);

      expect(inputClicked).to.be.false;

      // Cleanup
      document.body.removeChild(blButton);
    });

    it("triggers file input when clicking on container (not bl-button)", async () => {
      const el = await fixture<BlUpload>(html`<bl-upload></bl-upload>`);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const elAny = el as any;

      let inputClicked = false;

      if (elAny._fileInput) {
        elAny._fileInput.click = () => {
          inputClicked = true;
        };
      }

      // Create a mock event where target is a regular div
      const mockTarget = document.createElement("div");
      const mouseEvent = new MouseEvent("click", { bubbles: true });

      Object.defineProperty(mouseEvent, "target", { value: mockTarget });

      elAny._handleContainerClick(mouseEvent);

      expect(inputClicked).to.be.true;
    });
  });

  describe("_handleButtonClick disabled branch", () => {
    it("does not trigger file input when disabled", async () => {
      const el = await fixture<BlUpload>(html`<bl-upload disabled></bl-upload>`);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const elAny = el as any;

      let inputClicked = false;
      const originalClick = elAny._fileInput?.click;

      if (elAny._fileInput) {
        elAny._fileInput.click = () => {
          inputClicked = true;
        };
      }

      // Create a MouseEvent and call _handleButtonClick directly
      const mouseEvent = new MouseEvent("click", { bubbles: true });

      elAny._handleButtonClick(mouseEvent);

      expect(inputClicked).to.be.false;

      // Restore original
      if (elAny._fileInput && originalClick) {
        elAny._fileInput.click = originalClick;
      }
    });

    it("triggers file input when not disabled", async () => {
      const el = await fixture<BlUpload>(html`<bl-upload></bl-upload>`);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const elAny = el as any;

      let inputClicked = false;

      if (elAny._fileInput) {
        elAny._fileInput.click = () => {
          inputClicked = true;
        };
      }

      const mouseEvent = new MouseEvent("click", { bubbles: true });

      elAny._handleButtonClick(mouseEvent);

      expect(inputClicked).to.be.true;
    });
  });

  describe("_getStatusIcon method", () => {
    it("returns 'alert' for error status", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload></bl-upload>`);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = (el as any)._getStatusIcon("error");

      expect(result).to.equal("alert");
    });

    it("returns 'loading' for pending status", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload></bl-upload>`);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = (el as any)._getStatusIcon("pending");

      expect(result).to.equal("loading");
    });

    it("returns 'pending' for unknown status (default case)", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload></bl-upload>`);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = (el as any)._getStatusIcon("unknown");

      expect(result).to.equal("pending");
    });

    it("returns 'check_fill' for success status", async () => {
      const el = await fixture<BlUpload>(html`
        <bl-upload></bl-upload>`);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = (el as any)._getStatusIcon("success");

      expect(result).to.equal("check_fill");
    });
  });
});
