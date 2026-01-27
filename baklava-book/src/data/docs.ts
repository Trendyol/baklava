export interface DocItem {
  name: string;
  slug: string;
  file: string;
}

export interface DocCategory {
  id: string;
  label: string;
  icon: string;
  items: DocItem[];
}

export const docCategories: DocCategory[] = [
  {
    id: "getting-started",
    label: "Getting Started",
    icon: "🚀",
    items: [
      { name: "Welcome", slug: "welcome", file: "welcome.stories.mdx" },
      { name: "Requirements", slug: "requirements", file: "requirements.stories.mdx" },
    ],
  },
  {
    id: "frameworks",
    label: "Libraries and Frameworks",
    icon: "⚡",
    items: [
      {
        name: "Using in Vue",
        slug: "using-baklava-in-vue",
        file: "using-baklava-in-vue.stories.mdx",
      },
      {
        name: "Using in React",
        slug: "using-baklava-in-react",
        file: "using-baklava-in-react.stories.mdx",
      },
      {
        name: "Using in Next.js",
        slug: "using-baklava-in-next",
        file: "using-baklava-in-next.stories.mdx",
      },
    ],
  },
  {
    id: "customization",
    label: "Customization",
    icon: "🎨",
    items: [
      {
        name: "Theming",
        slug: "customizing-baklava-theme",
        file: "customizing-baklava-theme.stories.mdx",
      },
      {
        name: "Component Styles",
        slug: "how-to-customize-a-components-style",
        file: "how-to-customize-a-components-style.stories.mdx",
      },
      { name: "RTL Support", slug: "rtl-support", file: "rtl-support.stories.mdx" },
      { name: "Localization", slug: "localization", file: "localization.stories.mdx" },
    ],
  },
  {
    id: "design-system",
    label: "Design System",
    icon: "🎯",
    items: [
      { name: "Colors", slug: "colors", file: "design-system/colors.stories.mdx" },
      { name: "Typography", slug: "typography", file: "design-system/typography.stories.mdx" },
      { name: "Sizing", slug: "sizing", file: "design-system/sizing.stories.mdx" },
      {
        name: "Border Radius",
        slug: "border-radius",
        file: "design-system/border-radius.stories.mdx",
      },
      { name: "Iconography", slug: "iconography", file: "design-system/iconography.stories.mdx" },
      { name: "Z-Index", slug: "z-index", file: "design-system/z-index.stories.mdx" },
    ],
  },
  {
    id: "contributing",
    label: "Contributing",
    icon: "🤝",
    items: [
      { name: "Contributing Guide", slug: "contributing", file: "contributing.stories.mdx" },
      { name: "Commit Rules", slug: "commit-rules", file: "commit-rules.stories.mdx" },
      { name: "Testing", slug: "testing", file: "testing.stories.mdx" },
      { name: "Linting", slug: "linting", file: "linting.stories.mdx" },
    ],
  },
];

export function getDocBySlug(slug: string): DocItem | undefined {
  for (const category of docCategories) {
    const found = category.items.find((item) => item.slug === slug);

    if (found) return found;
  }

  return undefined;
}

export function getDocCategoryBySlug(slug: string): DocCategory | undefined {
  for (const category of docCategories) {
    if (category.items.some((item) => item.slug === slug)) {
      return category;
    }
  }
  return undefined;
}
