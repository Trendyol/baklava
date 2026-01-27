/**
 * Unified navigation structure for the documentation site.
 * Combines docs and components into a single hierarchical structure.
 */

import { docCategories } from "./docs";
import { components } from "./components";

export interface NavItem {
  title: string;
  path: string;
  tags?: string[];
}

export interface NavSection {
  id: string;
  title: string;
  items: NavItem[];
}

export interface NavigationData {
  sections: NavSection[];
}

// Build docs navigation sections
function buildDocsNavSections(): NavSection[] {
  return docCategories.map((category) => ({
    id: category.id,
    title: category.label,
    items: category.items.map((item) => ({
      title: item.name,
      path: `/docs/${item.slug}`,
    })),
  }));
}

// Build components navigation section - all components A-Z
function buildComponentsNavSection(): NavSection {
  // Sort components alphabetically by name
  const sortedComponents = [...components].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return {
    id: "components",
    title: "Components",
    items: sortedComponents.map((component) => ({
      title: component.name,
      path: `/components/${component.slug}`,
      tags: component.status === "beta" ? ["Beta"] : undefined,
    })),
  };
}

// Get the full navigation structure
export function getNavigation(): NavigationData {
  const docsSections = buildDocsNavSections();
  const componentsSection = buildComponentsNavSection();

  return {
    sections: [...docsSections, componentsSection],
  };
}

// Get navigation sections for docs only
export function getDocsNavigation(): NavSection[] {
  return buildDocsNavSections();
}

// Get navigation sections for components only
export function getComponentsNavigation(): NavSection[] {
  return [buildComponentsNavSection()];
}

// Find current section by path
export function findSectionByPath(path: string): NavSection | undefined {
  const navigation = getNavigation();
  return navigation.sections.find((section) =>
    section.items.some((item) => item.path === path)
  );
}

// Find current item by path
export function findItemByPath(path: string): NavItem | undefined {
  const navigation = getNavigation();
  for (const section of navigation.sections) {
    const item = section.items.find((item) => item.path === path);
    if (item) return item;
  }
  return undefined;
}

// Get all navigation items as flat array (useful for search)
export function getAllNavItems(): NavItem[] {
  const navigation = getNavigation();
  return navigation.sections.flatMap((section) => section.items);
}

// Export the navigation data for static usage
export const navigation = getNavigation();
