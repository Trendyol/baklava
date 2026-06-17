<script setup lang="ts">
import { computed, ref, onMounted } from "vue";

const props = defineProps<{
  tagName: string;
}>();

interface Attribute {
  name: string;
  type: string;
  default: string;
  description: string;
}

interface Event {
  name: string;
  detail: string;
  description: string;
}

interface CssProperty {
  name: string;
  default: string;
  description: string;
}

interface ApiData {
  attributes: Attribute[];
  events: Event[];
  cssProperties: CssProperty[];
  slots: { name: string; description: string }[];
}

const customElementsData = ref<any>(null);
const loading = ref(true);

onMounted(async () => {
  try {
    // Load custom-elements.json manifest
    const response = await fetch("/custom-elements.json");
    if (response.ok) {
      customElementsData.value = await response.json();
    }
  } catch (e) {
    console.error("Failed to load custom-elements.json", e);
  } finally {
    loading.value = false;
  }
});

// Helper function to find a declaration by class name
const findDeclarationByName = (className: string, modules: any[]): any | null => {
  for (const mod of modules) {
    const declarations = mod.declarations || [];
    for (const decl of declarations) {
      if (decl.name === className) {
        return decl;
      }
    }
  }
  return null;
};

// Helper function to extract members from a declaration and its superclasses
const extractMembersFromDeclaration = (
  decl: any,
  modules: any[],
  visited: Set<string> = new Set()
): any[] => {
  if (!decl || visited.has(decl.name)) {
    return [];
  }
  visited.add(decl.name);

  let members = [...(decl.members || [])];

  // Recursively get members from superclass
  if (decl.superclass?.name && decl.superclass.name !== "LitElement") {
    const superDecl = findDeclarationByName(decl.superclass.name, modules);
    if (superDecl) {
      const superMembers = extractMembersFromDeclaration(superDecl, modules, visited);
      members = [...members, ...superMembers];
    }
  }

  return members;
};

const apiData = computed<ApiData | null>(() => {
  if (!customElementsData.value || !props.tagName) {
    return null;
  }

  // Search for tagName in modules
  const modules = customElementsData.value.modules || [];

  for (const mod of modules) {
    const declarations = mod.declarations || [];

    for (const decl of declarations) {
      if (decl.tagName === props.tagName) {
        const attributes: Attribute[] = [];
        const events: Event[] = [];
        const cssProperties: CssProperty[] = [];
        const slots: { name: string; description: string }[] = [];

        // Get all members including from superclasses/mixins
        const allMembers = extractMembersFromDeclaration(decl, modules);

        // Attributes/Members
        for (const member of allMembers) {
          if (member.kind === "field" && member.attribute) {
            // Skip if already added
            if (!attributes.find((a) => a.name === member.attribute)) {
              attributes.push({
                name: member.attribute,
                type: member.parsedType?.text || member.type?.text || "unknown",
                default: member.default || "-",
                description: member.description || "",
              });
            }
          }
        }

        // Also check attributes array directly
        if (decl.attributes) {
          for (const attr of decl.attributes) {
            // Skip if already added from members
            if (!attributes.find((a) => a.name === attr.name)) {
              attributes.push({
                name: attr.name,
                type: attr.parsedType?.text || attr.type?.text || "unknown",
                default: attr.default || "-",
                description: attr.description || "",
              });
            }
          }
        }

        // Events
        if (decl.events) {
          for (const event of decl.events) {
            events.push({
              name: event.name,
              detail: event.parsedType?.text || event.type?.text || "-",
              description: event.description || "",
            });
          }
        }

        // CSS Properties
        if (decl.cssProperties) {
          for (const cssProp of decl.cssProperties) {
            cssProperties.push({
              name: cssProp.name,
              default: cssProp.default || "-",
              description: cssProp.description || "",
            });
          }
        }

        // Slots
        if (decl.slots) {
          for (const slot of decl.slots) {
            slots.push({
              name: slot.name || "default",
              description: slot.description || "",
            });
          }
        }

        return { attributes, events, cssProperties, slots };
      }
    }
  }

  return null;
});
</script>

<template>
  <div v-if="loading" class="text-neutral-dark text-center py-8">
    <bl-spinner></bl-spinner>
    <span class="ml-2">Loading API data…</span>
  </div>

  <div v-else-if="apiData" class="space-y-8">
    <!-- Attributes -->
    <div v-if="apiData.attributes.length">
      <h3 class="text-lg font-medium text-neutral-darkest dark:text-white mb-3">Attributes</h3>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
              <th class="text-left py-3 px-4 font-medium text-neutral-dark">Name</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-dark">Type</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-dark">Default</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-dark">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="attr in apiData.attributes"
              :key="attr.name"
              class="border-b border-neutral-lightest dark:border-neutral-darker"
            >
              <td class="py-3 px-4">
                <code class="text-primary">{{ attr.name }}</code>
              </td>
              <td class="py-3 px-4 text-neutral-dark dark:text-neutral-light font-mono text-xs">
                {{ attr.type }}
              </td>
              <td class="py-3 px-4 text-neutral-dark dark:text-neutral-light font-mono text-xs">
                {{ attr.default }}
              </td>
              <td class="py-3 px-4 text-neutral-darker dark:text-neutral-lighter">
                {{ attr.description }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Slots -->
    <div v-if="apiData.slots?.length">
      <h3 class="text-lg font-medium text-neutral-darkest dark:text-white mb-3">Slots</h3>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
              <th class="text-left py-3 px-4 font-medium text-neutral-dark">Name</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-dark">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="slot in apiData.slots"
              :key="slot.name"
              class="border-b border-neutral-lightest dark:border-neutral-darker"
            >
              <td class="py-3 px-4">
                <code class="text-primary">{{ slot.name }}</code>
              </td>
              <td class="py-3 px-4 text-neutral-darker dark:text-neutral-lighter">
                {{ slot.description }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Events -->
    <div v-if="apiData.events?.length">
      <h3 class="text-lg font-medium text-neutral-darkest dark:text-white mb-3">Events</h3>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
              <th class="text-left py-3 px-4 font-medium text-neutral-dark">Event</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-dark">Detail</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-dark">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="event in apiData.events"
              :key="event.name"
              class="border-b border-neutral-lightest dark:border-neutral-darker"
            >
              <td class="py-3 px-4">
                <code class="text-primary">{{ event.name }}</code>
              </td>
              <td class="py-3 px-4 text-neutral-dark dark:text-neutral-light font-mono text-xs">
                {{ event.detail }}
              </td>
              <td class="py-3 px-4 text-neutral-darker dark:text-neutral-lighter">
                {{ event.description }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- CSS Properties -->
    <div v-if="apiData.cssProperties?.length">
      <h3 class="text-lg font-medium text-neutral-darkest dark:text-white mb-3">
        CSS Custom Properties
      </h3>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
              <th class="text-left py-3 px-4 font-medium text-neutral-dark">Property</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-dark">Default</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-dark">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="prop in apiData.cssProperties"
              :key="prop.name"
              class="border-b border-neutral-lightest dark:border-neutral-darker"
            >
              <td class="py-3 px-4">
                <code class="text-primary">{{ prop.name }}</code>
              </td>
              <td class="py-3 px-4 text-neutral-dark dark:text-neutral-light font-mono text-xs">
                {{ prop.default }}
              </td>
              <td class="py-3 px-4 text-neutral-darker dark:text-neutral-lighter">
                {{ prop.description }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- No data message -->
    <div
      v-if="
        !apiData.attributes.length &&
        !apiData.events?.length &&
        !apiData.cssProperties?.length &&
        !apiData.slots?.length
      "
      class="text-neutral-dark text-center py-8"
    >
      No API reference available for this component yet.
    </div>
  </div>

  <div v-else class="text-neutral-dark text-center py-8">
    <p class="mb-2">API reference not found for this component.</p>
    <p class="text-sm">
      Run <code>npm run analyze</code> in the project root to generate the API documentation.
    </p>
  </div>
</template>
