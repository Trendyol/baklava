import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { centeredLayout } from "../../utilities/chromatic-decorators";


interface LinkArgs {
  target?: string;
  variant?: "inline" | "standalone";
  size?: "small" | "medium" | "large";
  kind?: "primary" | "neutral";
  external?: boolean;
  disabled?: boolean;
  "aria-label"?: string;
  content?: string;
  customStyles?: string;
}

const FIGMA_LINK = "https://www.figma.com/design/RrcLH0mWpIUy4vwuTlDeKN/Baklava-Design-Guide?node-id=23617-1414";
const ADR_LINK = "https://github.com/Trendyol/baklava/blob/main/src/components/link/docs/ADR/link-component-implementation.md";

const meta: Meta<LinkArgs> = {
  title: "Components/Link",
  component: "bl-link",
  parameters: {
    chromatic: {
      viewports: [1000]
    },
    controls: {
      exclude: ["content"],
    },
    docs: {
      description: {
        component:
          "<div class=\"bl-docs-container\">" +
            "<p class=\"bl-docs-description\">" +
              "The Link component is used for navigation between pages or to external URLs." +
            "</p>" +

            "<div class=\"bl-docs-links\" style=\"display: flex; gap: var(--bl-size-2xs); margin-top: var(--bl-size-m);\">" +
              "<bl-badge icon=\"document\" style=\"--bl-badge-background: var(--bl-color-surface-hover)\">" +
                "<bl-link variant='inline' target='" + ADR_LINK + "' external>ADR</bl-link>" +
              "</bl-badge>" +
              "<bl-badge icon=\"puzzle\" style=\"--bl-badge-background: var(--bl-color-surface-hover)\">" +
                "<bl-link variant='inline' target='" + FIGMA_LINK + "' external>Figma</bl-link>" +
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
    target: {
      control: "text",
      description: "Target URL for the link",
      table: {
        type: { summary: "string" },
      },
    },
    variant: {
      control: { type: "select" },
      options: ["inline", "standalone"],
      description: "Link variant",
      table: {
        type: { summary: "LinkVariant" },
        defaultValue: { summary: "inline" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "Link size (only applies to standalone variant)",
      table: {
        type: { summary: "LinkSize" },
        defaultValue: { summary: "medium" },
      },
    },
    kind: {
      control: { type: "select" },
      options: ["primary", "neutral"],
      description: "Link kind (only applies to standalone variant)",
      table: {
        type: { summary: "LinkKind" },
        defaultValue: { summary: "primary" },
      },
    },
    external: {
      control: "boolean",
      description: "Whether the link is external",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false },
      },
    },
    disabled: {
      control: "boolean",
      description: "Whether the link appears disabled (changes cursor to not-allowed)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false },
      },
    },
    "aria-label": {
      control: "text",
      description: "Aria label for accessibility",
      table: {
        type: { summary: "string" },
      },
    },
  },
};

export default meta;

type Story = StoryObj<LinkArgs>;

const LinkTemplate = (args: LinkArgs) => html`
  <bl-link
    target=${ifDefined(args.target)}
    variant=${ifDefined(args.variant)}
    size=${ifDefined(args.size)}
    kind=${ifDefined(args.kind)}
    ?external=${args.external}
    ?disabled=${args.disabled}
    aria-label=${ifDefined(args["aria-label"])}
    style=${ifDefined(args.customStyles)}
  >
    ${args.content || "Link Text"}
  </bl-link>
`;

export const Default: Story = {
  args: {
    target: "/",
    content: "Link",
  },
  render: LinkTemplate,
};

export const InlineLink: Story = {
  args: {
    target: "/",
    variant: "inline",
    content: "Link",
  },
  render: (args) => html`
    <div>
      <bl-alert
        variant="warning"
        icon
        style="margin-bottom: var(--bl-size-m);"
      >
        Inline variant should be used within a text container. Example:
        <div style="margin-top: var(--bl-size-2xs);">
          <p>Text with <bl-link variant="inline">a link</bl-link> inside.</p>
        </div>
      </bl-alert>

      <p style="font-size: 16px; line-height: 1.5;">
        This is a paragraph with a ${LinkTemplate(args)} in the text.
      </p>

      <p style="font-size: 14px; line-height: 1.5;">
        This is a paragraph with a ${LinkTemplate(args)} in the text.
      </p>

      <p style="font-size: 12px; line-height: 1.5;">
        This is a paragraph with a ${LinkTemplate(args)} in the text.
      </p>
    </div>
  `,
};

export const StandaloneLink: Story = {
  args: {
    target: "/",
    variant: "standalone",
    content: "Link",
  },
  render: LinkTemplate,
};

export const SizeVariants: Story = {
  args: {
    variant: "standalone",
  },
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      ${LinkTemplate({ target: "/", variant: "standalone", size: "small", content: "Small" })}
      ${LinkTemplate({ target: "/", variant: "standalone", size: "medium", content: "Medium" })}
      ${LinkTemplate({ target: "/", variant: "standalone", size: "large", content: "Large" })}
    </div>
  `,
};

export const KindVariants: Story = {
  args: {
    variant: "standalone",
  },
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      ${LinkTemplate({ target: "/", variant: "standalone", kind: "primary", content: "Primary" })}
      ${LinkTemplate({ target: "/", variant: "standalone", kind: "neutral", content: "Neutral" })}
    </div>
  `,
};

export const ExternalLinks: Story = {
  args: {
    external: true,
  },
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      ${LinkTemplate({ target: "https://example.com", external: true, content: "External Link" })}
    </div>
  `,
};

export const DisabledLinks: Story = {
  args: {
    disabled: true,
  },
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      ${LinkTemplate({ target: "/", disabled: true, content: "Disabled Link" })}
    </div>
  `,
};

export const AccessibleLink: Story = {
  args: {
    target: "/",
    "aria-label": "View your profile settings",
    content: "Profile",
  },
  render: LinkTemplate,
};

export const CustomInlineColors: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      ${LinkTemplate({
        target: "/",
        content: "Success Link",
        customStyles: "--bl-link-color: var(--bl-color-success); --bl-link-hover-color: var(--bl-color-success-highlight); --bl-link-active-color: var(--bl-color-success-highlight);"
      })}
      ${LinkTemplate({
        target: "/",
        content: "Warning Link",
        customStyles: "--bl-link-color: var(--bl-color-warning); --bl-link-hover-color: var(--bl-color-warning-highlight); --bl-link-active-color: var(--bl-color-warning-highlight);"
      })}
      ${LinkTemplate({
        target: "/",
        content: "Danger Link",
        customStyles: "--bl-link-color: var(--bl-color-danger); --bl-link-hover-color: var(--bl-color-danger-highlight); --bl-link-active-color: var(--bl-color-danger-highlight);"
      })}
    </div>
  `,
};

