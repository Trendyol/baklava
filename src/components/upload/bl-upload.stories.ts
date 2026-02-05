import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

const meta: Meta = {
  title: "Components/Upload",
  component: "bl-upload",
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["horizontal", "vertical", "button"],
    },
    accept: { control: "text" },
    multiple: { control: "boolean" },
    maxFileSize: { control: "number" },
    maxFiles: { control: "number" },
    headerText: { control: "text" },
    descriptionText: { control: "text" },
    buttonText: { control: "text" },
    disabled: { control: "boolean" },
    showFileList: { control: "boolean" },
    autoUpload: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj;

// ============ HORIZONTAL ============

export const HorizontalDefault: Story = {
  name: "Horizontal - Default",
  render: () => html`
    <bl-upload
      variant="horizontal"
      header-text="Dosya Seç / Sürükle"
      description-text="JPG, JPEG, PNG, Minimum 860x574"
    ></bl-upload>
  `,
};

export const HorizontalUploaded: Story = {
  name: "Horizontal - Uploaded",
  render: () => {
    return html`
      <bl-upload
        id="horizontal-uploaded"
        variant="horizontal"
        multiple
        header-text="Dosya Seç / Sürükle"
        description-text="JPG, JPEG, PNG, Minimum 860x574"
      ></bl-upload>
    `;
  },
};

// ============ VERTICAL ============

export const VerticalDefault: Story = {
  name: "Vertical - Default",
  render: () => html`
    <bl-upload
      variant="vertical"
      header-text="Dosya Seç / Sürükle"
      description-text="JPG, JPEG, PNG, Minimum 860x574"
      style="max-width: 400px;"
    ></bl-upload>
  `,
};

export const VerticalUploaded: Story = {
  name: "Vertical - Uploaded",
  render: () => {
    return html`
      <bl-upload
        id="vertical-uploaded"
        variant="vertical"
        multiple
        header-text="Dosya Seç / Sürükle"
        description-text="JPG, JPEG, PNG, Minimum 860x574"
        style="max-width: 400px;"
      ></bl-upload>
    `;
  },
};

// ============ BUTTON ============

export const ButtonDefault: Story = {
  name: "Button - Default",
  render: () => html`
    <bl-upload variant="button" button-text="Dosya Seç"></bl-upload>
  `,
};

export const ButtonUploaded: Story = {
  name: "Button - Uploaded",
  render: () => {
    return html`
      <bl-upload
        id="button-uploaded"
        variant="button"
        multiple
        button-text="Dosya Seç"
        style="max-width: 350px;"
      ></bl-upload>
    `;
  },
};

// ============ FILE STATES ============

export const StateUploading: Story = {
  name: "State - Uploading",
  render: () => {
    return html`
      <div style="display: flex; gap: 24px; flex-wrap: wrap;">
        <bl-upload
          id="uploading-1"
          variant="vertical"
          header-text="Dosya Sürükle"
          description-text="JPG, JPEG, PNG, Minimum 860x574"
          style="max-width: 250px;"
        ></bl-upload>
        <bl-upload
          id="uploading-2"
          variant="horizontal"
          header-text="Dosya Seç / Sürükle"
          description-text="JPG, JPEG, PNG, Minimum 860x574"
          style="max-width: 400px;"
        ></bl-upload>
        <bl-upload
          id="uploading-3"
          variant="button"
          button-text="Dosya Seç"
          style="max-width: 200px;"
        ></bl-upload>
      </div>
    `;
  },
};

export const StateSuccess: Story = {
  name: "State - Success",
  render: () => {
    return html`
      <div style="display: flex; gap: 24px; flex-wrap: wrap;">
        <bl-upload
          id="success-1"
          variant="vertical"
          header-text="Dosya Seç / Sürükle"
          description-text="JPG, JPEG, PNG, Minimum 860x574"
          style="max-width: 250px;"
        ></bl-upload>
        <bl-upload
          id="success-2"
          variant="horizontal"
          header-text="Dosya Sürükle"
          description-text="JPG, JPEG, PNG, Minimum 860x574"
          style="max-width: 400px;"
        ></bl-upload>
        <bl-upload
          id="success-3"
          variant="button"
          button-text="Dosya Seç"
          style="max-width: 200px;"
        ></bl-upload>
      </div>
    `;
  },
};

export const StateError: Story = {
  name: "State - Error",
  render: () => {
    return html`
      <div style="display: flex; gap: 24px; flex-wrap: wrap;">
        <bl-upload
          id="error-1"
          variant="vertical"
          header-text="Dosya Sürükle"
          description-text="JPG, JPEG, PNG, Minimum 860x574"
          style="max-width: 250px;"
        ></bl-upload>
        <bl-upload
          id="error-2"
          variant="horizontal"
          header-text="Dosya Seç / Sürükle"
          description-text="JPG, JPEG, PNG, Minimum 860x574"
          style="max-width: 400px;"
        ></bl-upload>
        <bl-upload
          id="error-3"
          variant="button"
          button-text="Dosya Seç"
          style="max-width: 200px;"
        ></bl-upload>
      </div>
    `;
  },
};

export const StateMultipleFiles: Story = {
  name: "State - Multiple Files",
  render: () => {
    return html`
      <div style="display: flex; gap: 24px; flex-wrap: wrap;">
        <bl-upload
          id="multi-1"
          variant="vertical"
          multiple
          header-text="Dosya Seç / Sürükle"
          description-text="JPG, JPEG, PNG, Minimum 860x574"
          style="max-width: 250px;"
        ></bl-upload>
        <bl-upload
          id="multi-2"
          variant="horizontal"
          multiple
          header-text="Dosya Seç / Sürükle"
          description-text="JPG, JPEG, PNG, Minimum 860x574"
          style="max-width: 400px;"
        ></bl-upload>
        <bl-upload
          id="multi-3"
          variant="button"
          multiple
          button-text="Dosya Seç"
          style="max-width: 200px;"
        ></bl-upload>
      </div>
    `;
  },
};
