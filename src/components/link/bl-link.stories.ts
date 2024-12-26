import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { centeredLayout } from "../../utilities/chromatic-decorators";


interface LinkArgs {
  href?: string;
  variant?: "inline" | "standalone";
  size?: "small" | "medium" | "large";
  kind?: "primary" | "neutral";
  target?: HTMLAnchorElement["target"];
  rel?: HTMLAnchorElement["rel"];
  hreflang?: HTMLAnchorElement["hreflang"];
  type?: HTMLAnchorElement["type"];
  referrerPolicy?: HTMLAnchorElement["referrerPolicy"];
  download?: HTMLAnchorElement["download"];
  ping?: HTMLAnchorElement["ping"];
  "aria-label"?: string;
  content?: string;
  customStyles?: string;
  icon?: string;
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
              "The Link component is used for navigation between pages or to external URLs. " +
              "It supports all native anchor tag attributes and provides additional styling variants. " +
              "When not using the standalone variant, you can provide a custom icon using the icon slot." +
            "</p>" +

            "<div class=\"bl-docs-links\" style=\"display: flex; gap: var(--bl-size-2xs); margin-top: var(--bl-size-m);\">" +
              "<bl-badge icon=\"document\" style=\"--bl-badge-background: var(--bl-color-surface-hover)\">" +
                "<bl-link variant='inline' href='" + ADR_LINK + "' target='_blank'>ADR</bl-link>" +
              "</bl-badge>" +
              "<bl-badge icon=\"puzzle\" style=\"--bl-badge-background: var(--bl-color-surface-hover)\">" +
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
    href: {
      control: "text",
      description: "URL that the hyperlink points to",
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
    target: {
      control: { type: "select" },
      options: ["_self", "_blank", "_parent", "_top"],
      description: "Where to display the linked URL",
      table: {
        type: { summary: "HTMLAnchorElement['target']" },
        defaultValue: { summary: "_self" },
      },
    },
    rel: {
      control: "text",
      description: "Relationship between documents (e.g., noopener noreferrer)",
      table: {
        type: { summary: "HTMLAnchorElement['rel']" },
      },
    },
    hreflang: {
      control: "text",
      description: "Language of the linked document",
      table: {
        type: { summary: "HTMLAnchorElement['hreflang']" },
      },
    },
    type: {
      control: "text",
      description: "MIME type of the linked document",
      table: {
        type: { summary: "HTMLAnchorElement['type']" },
      },
    },
    referrerPolicy: {
      control: { type: "select" },
      options: [
        "no-referrer",
        "no-referrer-when-downgrade",
        "origin",
        "origin-when-cross-origin",
        "same-origin",
        "strict-origin",
        "strict-origin-when-cross-origin",
        "unsafe-url",
      ],
      description: "Referrer policy for the link",
      table: {
        type: { summary: "HTMLAnchorElement['referrerPolicy']" },
      },
    },
    download: {
      control: "text",
      description: "Whether to download the resource instead of navigating to it",
      table: {
        type: { summary: "HTMLAnchorElement['download']" },
      },
    },
    ping: {
      control: "text",
      description: "URLs to be notified when following the link",
      table: {
        type: { summary: "HTMLAnchorElement['ping']" },
      },
    },
    "aria-label": {
      control: "text",
      description: "Aria label for accessibility",
      table: {
        type: { summary: "string" },
      },
    },
    icon: {
      control: "text",
      description: "Icon name for custom icon (only applies to non-standalone variants)",
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
    href=${ifDefined(args.href)}
    variant=${ifDefined(args.variant)}
    size=${ifDefined(args.size)}
    kind=${ifDefined(args.kind)}
    target=${ifDefined(args.target)}
    rel=${ifDefined(args.rel)}
    hreflang=${ifDefined(args.hreflang)}
    type=${ifDefined(args.type)}
    referrerpolicy=${ifDefined(args.referrerPolicy)}
    download=${ifDefined(args.download)}
    ping=${ifDefined(args.ping)}
    aria-label=${ifDefined(args["aria-label"])}
    style=${ifDefined(args.customStyles)}
  >
    ${args.content || "Link Text"}
    ${args.icon ? html`<bl-icon name="${args.icon}" slot="icon"></bl-icon>` : ""}
  </bl-link>
`;

export const Default: Story = {
  args: {
    href: "/",
    content: "Link",
  },
  render: LinkTemplate,
};

export const InlineLink: Story = {
  args: {
    href: "/",
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
    href: "/",
    variant: "standalone",
    content: "Link",
  },
  render: LinkTemplate,
};

export const CustomIconLink: Story = {
  args: {
    href: "/",
    content: "Link with Custom Icon",
    icon: "external_link",
  },
  render: LinkTemplate,
};

export const SizeVariants: Story = {
  args: {
    variant: "standalone",
  },
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      ${LinkTemplate({ href: "/", variant: "standalone", size: "small", content: "Small" })}
      ${LinkTemplate({ href: "/", variant: "standalone", size: "medium", content: "Medium" })}
      ${LinkTemplate({ href: "/", variant: "standalone", size: "large", content: "Large" })}
    </div>
  `,
};

export const KindVariants: Story = {
  args: {
    variant: "standalone",
  },
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      ${LinkTemplate({ href: "/", variant: "standalone", kind: "primary", content: "Primary" })}
      ${LinkTemplate({ href: "/", variant: "standalone", kind: "neutral", content: "Neutral" })}
    </div>
  `,
};

export const NativeAnchorAttributes: Story = {
  args: {
    href: "https://example.com",
    target: "_blank",
    rel: "noopener noreferrer",
    hreflang: "en",
    type: "text/html",
    referrerPolicy: "no-referrer",
    download: "file.pdf",
    ping: "https://analytics.example.com",
    content: "External Link with Native Attributes",
  },
  render: LinkTemplate,
};

export const AccessibleLink: Story = {
  args: {
    href: "/",
    "aria-label": "View your profile settings",
    content: "Profile",

  },
  render: LinkTemplate,
};

export const CustomInlineColors: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      ${LinkTemplate({
        href: "/",
        content: "Success Link",
        customStyles: "--bl-link-color: var(--bl-color-success); --bl-link-hover-color: var(--bl-color-success-highlight); --bl-link-active-color: var(--bl-color-success-highlight);"
      })}
      ${LinkTemplate({
        href: "/",
        content: "Warning Link",
        customStyles: "--bl-link-color: var(--bl-color-warning); --bl-link-hover-color: var(--bl-color-warning-highlight); --bl-link-active-color: var(--bl-color-warning-highlight);"
      })}
      ${LinkTemplate({
        href: "/",
        content: "Danger Link",
        customStyles: "--bl-link-color: var(--bl-color-danger); --bl-link-hover-color: var(--bl-color-danger-highlight); --bl-link-active-color: var(--bl-color-danger-highlight);"
      })}
    </div>
  `,
};

