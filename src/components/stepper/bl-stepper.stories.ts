import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { centeredLayout } from "../../utilities/chromatic-decorators";
import BlStepper from "./bl-stepper";
import BlStepperItem from "./bl-stepper-item";

interface StepperArgs {
  type?: "dot" | "number" | "icon";
  direction?: "horizontal" | "vertical";
  usage?: "clickable" | "non-clickable";
  customStyles?: string;
}

const FIGMA_LINK = "https://www.figma.com/design/RrcLH0mWpIUy4vwuTlDeKN/Baklava-Design-Guide?node-id=23617-1414";
const ADR_LINK = "https://github.com/Trendyol/baklava/blob/main/src/components/stepper/doc/ADR.md";

const meta: Meta<StepperArgs> = {
  title: "Components/Stepper",
  component: "bl-stepper",
  parameters: {
    chromatic: {
      viewports: [1000]
    },
    controls: {
      exclude: ["customStyles"],
    },
    docs: {
      description: {
        component:
          "<div class=\"bl-docs-container\">" +
            "<p class=\"bl-docs-description\">" +
              "The Stepper component displays progress through a sequence of steps. " +
              "It supports different visual styles (dot, number, icon), directions (horizontal, vertical), " +
              "and usage modes (clickable, non-clickable). Maximum 9 items are allowed." +
            "</p>" +

            "<div class=\"bl-docs-links\" style=\"display: flex; gap: var(--bl-size-2xs); margin-top: var(--bl-size-m);\">" +
              "<bl-badge icon=\"document\"" +
                "<bl-link variant='inline' href='" + ADR_LINK + "' target='_blank'>ADR</bl-link>" +
              "</bl-badge>" +
              "<bl-badge icon=\"puzzle\"" +
                "<bl-link variant='inline' href='" + FIGMA_LINK + "' target='_blank'>Figma</bl-link>" +
              "</bl-badge>" +
            "</div>" +
          "</div>",
      },
    },
  },
  decorators: [
    centeredLayout,
  ],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["dot", "number", "icon"],
      description: "Stepper render style",
      table: {
        type: { summary: "StepperType" },
        defaultValue: { summary: "dot" },
      },
    },
    direction: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
      description: "Stepper direction",
      table: {
        type: { summary: "StepperDirection" },
        defaultValue: { summary: "horizontal" },
      },
    },
    usage: {
      control: { type: "select" },
      options: ["clickable", "non-clickable"],
      description: "Stepper usage mode",
      table: {
        type: { summary: "StepperUsage" },
        defaultValue: { summary: "clickable" },
      },
    },
  },
};

export default meta;

type Story = StoryObj<StepperArgs>;

const StepperTemplate = (args: StepperArgs) => html`
  <bl-stepper
    type=${ifDefined(args.type)}
    direction=${ifDefined(args.direction)}
    usage=${ifDefined(args.usage)}
    style=${ifDefined(args.customStyles)}
  >
    <bl-stepper-item id="1" title="Step 1" description="First step description" variant="success"></bl-stepper-item>
    <bl-stepper-item id="2" title="Step 2" description="Second step description" variant="active"></bl-stepper-item>
    <bl-stepper-item id="3" title="Step 3" description="Third step description" variant="default"></bl-stepper-item>
    <bl-stepper-item id="4" title="Step 4" description="Fourth step description" variant="default"></bl-stepper-item>
  </bl-stepper>
`;

export const Default: Story = {
  args: {
    type: "dot",
    direction: "horizontal",
    usage: "clickable",
  },
  render: StepperTemplate,
};

export const DotType: Story = {
  args: {
    type: "dot",
    direction: "horizontal",
    usage: "clickable",
  },
  render: StepperTemplate,
};

export const NumberType: Story = {
  args: {
    type: "number",
    direction: "horizontal",
    usage: "clickable",
  },
  render: StepperTemplate,
};

export const IconType: Story = {
  args: {
    type: "icon",
    direction: "horizontal",
    usage: "clickable",
  },
  render: (args) => html`
    <bl-stepper
      type=${ifDefined(args.type)}
      direction=${ifDefined(args.direction)}
      usage=${ifDefined(args.usage)}
      style=${ifDefined(args.customStyles)}
    >
      <bl-stepper-item id="1" title="Step 1" description="First step description" variant="success" icon="check"></bl-stepper-item>
      <bl-stepper-item id="2" title="Step 2" description="Second step description" variant="active" icon="settings"></bl-stepper-item>
      <bl-stepper-item id="3" title="Step 3" description="Third step description" variant="default" icon="clock"></bl-stepper-item>
      <bl-stepper-item id="4" title="Step 4" description="Fourth step description" variant="default" icon="lock"></bl-stepper-item>
    </bl-stepper>
  `,
};

export const VerticalDirection: Story = {
  args: {
    type: "number",
    direction: "vertical",
    usage: "clickable",
  },
  render: StepperTemplate,
};

export const NonClickable: Story = {
  args: {
    type: "dot",
    direction: "horizontal",
    usage: "non-clickable",
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: var(--bl-size-m);">
      <bl-stepper type="dot" direction="horizontal" usage="non-clickable" id="non-clickable-stepper">
        <bl-stepper-item id="1" title="Account Setup" description="Create your account" variant="success"></bl-stepper-item>
        <bl-stepper-item id="2" title="Profile Information" description="Add your details" variant="active"></bl-stepper-item>
        <bl-stepper-item id="3" title="Preferences" description="Set your preferences" variant="default"></bl-stepper-item>
        <bl-stepper-item id="4" title="Confirmation" description="Review and confirm" variant="default"></bl-stepper-item>
      </bl-stepper>

      <div style="display: flex; gap: var(--bl-size-xs);">
        <bl-button variant="secondary" size="small" @click=${() => {
          const stepper = document.getElementById("non-clickable-stepper") as BlStepper;
          const items = stepper.querySelectorAll("bl-stepper-item") as NodeListOf<BlStepperItem>;

          // Find current active step
          let currentStep = 0;

          items.forEach((item: BlStepperItem, index: number) => {
            if (item.variant === "active") currentStep = index;
          });

          // Go to previous step
          if (currentStep > 0) {
            const prevStep = currentStep - 1;

            items.forEach((item: BlStepperItem, index: number) => {
              if (index === prevStep) item.variant = "active";
              else if (index < prevStep) item.variant = "success";
              else item.variant = "default";
            });
          }
        }}>Previous</bl-button>

        <bl-button variant="primary" size="small" @click=${() => {
          const stepper = document.getElementById("non-clickable-stepper") as BlStepper;
          const items = stepper.querySelectorAll("bl-stepper-item") as NodeListOf<BlStepperItem>;

          // Find current active step
          let currentStep = 0;

          items.forEach((item: BlStepperItem, index: number) => {
            if (item.variant === "active") currentStep = index;
          });

          // Go to next step
          if (currentStep < items.length - 1) {
            const nextStep = currentStep + 1;

            items.forEach((item: BlStepperItem, index: number) => {
              if (index === nextStep) item.variant = "active";
              else if (index < nextStep) item.variant = "success";
              else item.variant = "default";
            });
          }
        }}>Next</bl-button>
      </div>
    </div>
  `,
};

export const WithErrorState: Story = {
  args: {
    type: "number",
    direction: "horizontal",
    usage: "clickable",
  },
  render: () => html`
    <bl-stepper type="number" direction="horizontal" usage="clickable">
      <bl-stepper-item id="1" title="Step 1" description="First step description" variant="success"></bl-stepper-item>
      <bl-stepper-item id="2" title="Step 2" description="Second step description" variant="active"></bl-stepper-item>
      <bl-stepper-item id="3" title="Step 3" description="Third step description" variant="error"></bl-stepper-item>
      <bl-stepper-item id="4" title="Step 4" description="Fourth step description" variant="default"></bl-stepper-item>
    </bl-stepper>
  `,
};

export const WithDisabledItems: Story = {
  args: {
    type: "dot",
    direction: "horizontal",
    usage: "clickable",
  },
  render: () => html`
    <bl-stepper type="dot" direction="horizontal" usage="clickable">
      <bl-stepper-item id="1" title="Step 1" description="First step description" variant="success"></bl-stepper-item>
      <bl-stepper-item id="2" title="Step 2" description="Second step description" variant="active"></bl-stepper-item>
      <bl-stepper-item id="3" title="Step 3" description="Third step description" variant="default" disabled></bl-stepper-item>
      <bl-stepper-item id="4" title="Step 4" description="Fourth step description" variant="default"></bl-stepper-item>
    </bl-stepper>
  `,
};

export const MinimalSteps: Story = {
  args: {
    type: "number",
    direction: "horizontal",
    usage: "clickable",
  },
  render: () => html`
    <bl-stepper type="number" direction="horizontal" usage="clickable">
      <bl-stepper-item id="1" title="Step 1" variant="active"></bl-stepper-item>
      <bl-stepper-item id="2" title="Step 2" variant="default"></bl-stepper-item>
    </bl-stepper>
  `,
};

export const ManySteps: Story = {
  args: {
    type: "dot",
    direction: "horizontal",
    usage: "clickable",
  },
  render: () => html`
    <bl-stepper type="dot" direction="horizontal" usage="clickable">
      <bl-stepper-item id="1" title="Step 1" variant="success"></bl-stepper-item>
      <bl-stepper-item id="2" title="Step 2" variant="success"></bl-stepper-item>
      <bl-stepper-item id="3" title="Step 3" variant="success"></bl-stepper-item>
      <bl-stepper-item id="4" title="Step 4" variant="active"></bl-stepper-item>
      <bl-stepper-item id="5" title="Step 5" variant="default"></bl-stepper-item>
      <bl-stepper-item id="6" title="Step 6" variant="default"></bl-stepper-item>
      <bl-stepper-item id="7" title="Step 7" variant="default"></bl-stepper-item>
      <bl-stepper-item id="8" title="Step 8" variant="default"></bl-stepper-item>
      <bl-stepper-item id="9" title="Step 9" variant="default"></bl-stepper-item>
      <bl-stepper-item id="10" title="Step 10" variant="default"></bl-stepper-item>
      <bl-stepper-item id="11" title="Step 11" variant="default"></bl-stepper-item>
    </bl-stepper>
  `,
};

export const WithoutDescriptions: Story = {
  args: {
    type: "number",
    direction: "horizontal",
    usage: "clickable",
  },
  render: () => html`
    <bl-stepper type="number" direction="horizontal" usage="clickable">
      <bl-stepper-item id="1" title="Step 1" variant="success"></bl-stepper-item>
      <bl-stepper-item id="2" title="Step 2" variant="active"></bl-stepper-item>
      <bl-stepper-item id="3" title="Step 3" variant="default"></bl-stepper-item>
      <bl-stepper-item id="4" title="Step 4" variant="default"></bl-stepper-item>
    </bl-stepper>
  `,
};

export const InteractiveExample: Story = {
  args: {
    type: "number",
    direction: "horizontal",
    usage: "clickable",
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: var(--bl-size-m);">
      <bl-stepper type="number" direction="horizontal" usage="clickable" id="interactive-stepper">
        <bl-stepper-item id="1" title="Account Setup" description="Create your account" variant="success"></bl-stepper-item>
        <bl-stepper-item id="2" title="Profile Information" description="Add your details" variant="active"></bl-stepper-item>
        <bl-stepper-item id="3" title="Preferences" description="Set your preferences" variant="default"></bl-stepper-item>
        <bl-stepper-item id="4" title="Confirmation" description="Review and confirm" variant="default"></bl-stepper-item>
      </bl-stepper>

      <div style="display: flex; gap: var(--bl-size-xs);">
        <bl-button variant="secondary" size="small" @click=${() => {
          const stepper = document.getElementById("interactive-stepper") as BlStepper;
          const items = stepper.querySelectorAll("bl-stepper-item") as NodeListOf<BlStepperItem>;

          items.forEach((item: BlStepperItem, index: number) => {
            if (index === 0) item.variant = "active";
            else if (index < 1) item.variant = "success";
            else item.variant = "default";
          });
        }}>Go to Step 1</bl-button>

        <bl-button variant="secondary" size="small" @click=${() => {
          const stepper = document.getElementById("interactive-stepper") as BlStepper;
          const items = stepper.querySelectorAll("bl-stepper-item") as NodeListOf<BlStepperItem>;

          items.forEach((item: BlStepperItem, index: number) => {
            if (index === 1) item.variant = "active";
            else if (index < 1) item.variant = "success";
            else item.variant = "default";
          });
        }}>Go to Step 2</bl-button>

        <bl-button variant="secondary" size="small" @click=${() => {
          const stepper = document.getElementById("interactive-stepper") as BlStepper;
          const items = stepper.querySelectorAll("bl-stepper-item") as NodeListOf<BlStepperItem>;

          items.forEach((item: BlStepperItem, index: number) => {
            if (index === 2) item.variant = "active";
            else if (index < 2) item.variant = "success";
            else item.variant = "default";
          });
        }}>Go to Step 3</bl-button>

        <bl-button variant="secondary" size="small" @click=${() => {
          const stepper = document.getElementById("interactive-stepper") as BlStepper;
          const items = stepper.querySelectorAll("bl-stepper-item") as NodeListOf<BlStepperItem>;

          items.forEach((item: BlStepperItem, index: number) => {
            if (index === 3) item.variant = "active";
            else if (index < 3) item.variant = "success";
            else item.variant = "default";
          });
        }}>Go to Step 4</bl-button>
      </div>
    </div>
  `,
};
