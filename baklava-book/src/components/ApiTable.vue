<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  tagName: string;
}>();

// Button için örnek API verileri
// Gerçek projede custom-elements.json'dan çekilecek
const apiData = computed(() => {
  if (props.tagName === "bl-button") {
    return {
      attributes: [
        {
          name: "variant",
          type: '"primary" | "secondary" | "tertiary"',
          default: '"primary"',
          description: "Button varyantını belirler",
        },
        {
          name: "kind",
          type: '"default" | "neutral" | "success" | "danger"',
          default: '"default"',
          description: "Button türünü belirler",
        },
        {
          name: "size",
          type: '"small" | "medium" | "large"',
          default: '"medium"',
          description: "Button boyutunu belirler",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Butonu devre dışı bırakır",
        },
        {
          name: "loading",
          type: "boolean",
          default: "false",
          description: "Yükleniyor durumunu gösterir",
        },
        { name: "icon", type: "string", default: "-", description: "İkon adını belirler" },
        {
          name: "href",
          type: "string",
          default: "-",
          description: "Link URL'i (anchor olarak render eder)",
        },
      ],
      events: [
        { name: "bl-click", detail: "string", description: "Button tıklandığında tetiklenir" },
      ],
      cssProperties: [
        {
          name: "--bl-button-display",
          default: "inline-block",
          description: "Button display özelliğini ayarlar",
        },
        {
          name: "--bl-button-justify",
          default: "center",
          description: "Button justify-content özelliğini ayarlar",
        },
      ],
    };
  }
  return null;
});
</script>

<template>
  <div v-if="apiData" class="space-y-8">
    <!-- Attributes -->
    <div>
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
              <td class="py-3 px-4 text-neutral-dark dark:text-neutral-light">
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
              <td class="py-3 px-4 text-neutral-dark dark:text-neutral-light">
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
  </div>

  <div v-else class="text-neutral-dark text-center py-8">
    Bu component için API referansı henüz eklenmedi.
  </div>
</template>
