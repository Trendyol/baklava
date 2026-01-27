export interface ComponentMeta {
  name: string;
  slug: string;
  tagName: string;
  description: string;
  category: "form" | "navigation" | "feedback" | "overlay" | "data-display" | "layout";
  status: "stable" | "beta" | "deprecated";
  hasADR?: boolean;
  hasStory?: boolean;
  figmaUrl?: string;
  githubIssue?: string;
  rtlSupported?: boolean;
}

// Component için doküman linkleri
export interface ComponentDocs {
  adr: string | null; // doc/ADR.md path
  story: string | null; // *.stories.mdx path
  figma: string | null; // Figma link
  github: string | null; // GitHub issue link
}

export const components: ComponentMeta[] = [
  // Form
  {
    name: "Button",
    slug: "button",
    tagName: "bl-button",
    description: "Buttons allow users to take actions with a single tap.",
    category: "form",
    status: "stable",
    hasADR: true,
    hasStory: true,
    figmaUrl:
      "https://www.figma.com/file/RrcLH0mWpIUy4vwuTlDeKN/Baklava-Design-Guide?node-id=4%3A5584",
    rtlSupported: true,
  },
  {
    name: "Input",
    slug: "input",
    tagName: "bl-input",
    description: "Input component for text entry.",
    category: "form",
    status: "stable",
    hasADR: true,
    hasStory: true,
    rtlSupported: true,
  },
  {
    name: "Textarea",
    slug: "textarea",
    tagName: "bl-textarea",
    description: "Textarea for multi-line text input.",
    category: "form",
    status: "stable",
    hasADR: true,
    hasStory: true,
    rtlSupported: true,
  },
  {
    name: "Select",
    slug: "select",
    tagName: "bl-select",
    description: "Select component for choosing options.",
    category: "form",
    status: "stable",
    hasADR: true,
    hasStory: true,
    rtlSupported: true,
  },
  {
    name: "Checkbox Group",
    slug: "checkbox-group",
    tagName: "bl-checkbox-group",
    description: "Group of checkboxes for multiple selections.",
    category: "form",
    status: "stable",
    hasADR: true,
    hasStory: true,
    rtlSupported: true,
  },
  {
    name: "Radio Group",
    slug: "radio-group",
    tagName: "bl-radio-group",
    description: "Group of radio buttons for single selection.",
    category: "form",
    status: "stable",
    hasADR: true,
    hasStory: true,
    rtlSupported: true,
  },
  {
    name: "Switch",
    slug: "switch",
    tagName: "bl-switch",
    description: "Toggle switch for on/off states.",
    category: "form",
    status: "stable",
    hasADR: true,
    hasStory: true,
    rtlSupported: true,
  },
  {
    name: "Datepicker",
    slug: "datepicker",
    tagName: "bl-datepicker",
    description: "Date selection component.",
    category: "form",
    status: "stable",
    hasStory: true,
    rtlSupported: true,
  },

  // Navigation
  {
    name: "Link",
    slug: "link",
    tagName: "bl-link",
    description: "Link component for navigation.",
    category: "navigation",
    status: "stable",
    hasStory: true,
    rtlSupported: true,
  },
  {
    name: "Tab Group",
    slug: "tab-group",
    tagName: "bl-tab-group",
    description: "Tab navigation component.",
    category: "navigation",
    status: "stable",
    hasADR: true,
    hasStory: true,
    rtlSupported: true,
  },
  {
    name: "Pagination",
    slug: "pagination",
    tagName: "bl-pagination",
    description: "Pagination for navigating pages.",
    category: "navigation",
    status: "stable",
    hasADR: true,
    hasStory: true,
    rtlSupported: true,
  },
  {
    name: "Stepper",
    slug: "stepper",
    tagName: "bl-stepper",
    description: "Step indicator for multi-step processes.",
    category: "navigation",
    status: "stable",
    hasADR: true,
    hasStory: true,
    rtlSupported: true,
  },

  // Feedback
  {
    name: "Alert",
    slug: "alert",
    tagName: "bl-alert",
    description: "Alert displays informational messages.",
    category: "feedback",
    status: "stable",
    hasADR: true,
    hasStory: true,
    figmaUrl:
      "https://www.figma.com/file/RrcLH0mWpIUy4vwuTlDeKN/Baklava-Design-Guide?node-id=25%3A3607",
    rtlSupported: true,
  },
  {
    name: "Badge",
    slug: "badge",
    tagName: "bl-badge",
    description: "Badge for status indicators.",
    category: "feedback",
    status: "stable",
    hasADR: true,
    hasStory: true,
    rtlSupported: true,
  },
  {
    name: "Notification",
    slug: "notification",
    tagName: "bl-notification",
    description: "Toast notifications.",
    category: "feedback",
    status: "stable",
    hasADR: true,
    hasStory: true,
    rtlSupported: true,
  },
  {
    name: "Spinner",
    slug: "spinner",
    tagName: "bl-spinner",
    description: "Loading spinner indicator.",
    category: "feedback",
    status: "stable",
    hasStory: true,
  },
  {
    name: "Progress Indicator",
    slug: "progress-indicator",
    tagName: "bl-progress-indicator",
    description: "Progress bar component.",
    category: "feedback",
    status: "stable",
    hasADR: true,
    hasStory: true,
    rtlSupported: true,
  },
  {
    name: "Tooltip",
    slug: "tooltip",
    tagName: "bl-tooltip",
    description: "Tooltip for additional information.",
    category: "feedback",
    status: "stable",
    hasADR: true,
    hasStory: true,
    rtlSupported: true,
  },

  // Overlay
  {
    name: "Dialog",
    slug: "dialog",
    tagName: "bl-dialog",
    description: "Modal dialog component.",
    category: "overlay",
    status: "stable",
    hasADR: true,
    hasStory: true,
    rtlSupported: true,
  },
  {
    name: "Drawer",
    slug: "drawer",
    tagName: "bl-drawer",
    description: "Slide-out drawer panel.",
    category: "overlay",
    status: "stable",
    hasADR: true,
    hasStory: true,
    rtlSupported: true,
  },
  {
    name: "Popover",
    slug: "popover",
    tagName: "bl-popover",
    description: "Popover for contextual content.",
    category: "overlay",
    status: "stable",
    hasADR: true,
    hasStory: true,
    rtlSupported: true,
  },
  {
    name: "Dropdown",
    slug: "dropdown",
    tagName: "bl-dropdown",
    description: "Dropdown menu component.",
    category: "overlay",
    status: "stable",
    hasStory: true,
    rtlSupported: true,
  },

  // Data Display
  {
    name: "Table",
    slug: "table",
    tagName: "bl-table",
    description: "Data table component.",
    category: "data-display",
    status: "stable",
    hasADR: true,
    hasStory: true,
    rtlSupported: true,
  },
  {
    name: "Tag",
    slug: "tag",
    tagName: "bl-tag",
    description: "Tag/chip component.",
    category: "data-display",
    status: "stable",
    hasADR: true,
    hasStory: true,
    rtlSupported: true,
  },
  {
    name: "Calendar",
    slug: "calendar",
    tagName: "bl-calendar",
    description: "Calendar display component.",
    category: "data-display",
    status: "stable",
    hasStory: true,
    rtlSupported: true,
  },
  {
    name: "Icon",
    slug: "icon",
    tagName: "bl-icon",
    description: "Icon component.",
    category: "data-display",
    status: "stable",
    hasADR: true,
    hasStory: true,
  },

  // Layout
  {
    name: "Accordion Group",
    slug: "accordion-group",
    tagName: "bl-accordion-group",
    description: "Collapsible accordion panels.",
    category: "layout",
    status: "stable",
    hasADR: true,
    hasStory: true,
    rtlSupported: true,
  },
  {
    name: "Split Button",
    slug: "split-button",
    tagName: "bl-split-button",
    description: "Button with dropdown actions.",
    category: "layout",
    status: "stable",
    hasADR: true,
    hasStory: true,
    rtlSupported: true,
  },
];

// Component için GitHub kaynak linkleri oluştur
export function getComponentSourceLinks(slug: string) {
  const component = getComponentBySlug(slug);

  if (!component) return null;

  const basePath = `https://github.com/Trendyol/baklava/blob/next/src/components/${slug}`;

  return {
    adr: component.hasADR ? `${basePath}/doc/ADR.md` : null,
    story: component.hasStory ? `${basePath}/bl-${slug}.stories.mdx` : null,
    source: `${basePath}/bl-${slug}.ts`,
    figma: component.figmaUrl || null,
  };
}

export const categories = [
  { id: "form", label: "Form", icon: "📝" },
  { id: "navigation", label: "Navigation", icon: "🧭" },
  { id: "feedback", label: "Feedback", icon: "💬" },
  { id: "overlay", label: "Overlay", icon: "🪟" },
  { id: "data-display", label: "Data Display", icon: "📊" },
  { id: "layout", label: "Layout", icon: "📐" },
];

export function getComponentBySlug(slug: string): ComponentMeta | undefined {
  return components.find((c) => c.slug === slug);
}

export function getComponentsByCategory(category: string): ComponentMeta[] {
  return components.filter((c) => c.category === category);
}

export function getAllComponentsSorted(): ComponentMeta[] {
  return [...components].sort((a, b) => a.name.localeCompare(b.name));
}
