<script setup lang="ts">
import { ref, computed } from "vue";
import CodeBlock from "@/components/CodeBlock.vue";
import iconList from "@trendyol/baklava-icons";

const searchQuery = ref("");

// Icon list directly from @trendyol/baklava-icons package
const allIconList = [...iconList];

// Icon categories based on Baklava Icons
const iconCategories = [
  {
    name: "Navigation",
    icons: [
      "home", "hamburger_menu", "arrow_left", "arrow_right", "arrow_up", "arrow_down",
      "back", "back_fill", "forward", "go_forward", "left_sided_arrow", "right_sided_arrow",
      "two_sided_arrow", "external_link", "external_share", "exit", "door_open", "expand", "full_size"
    ],
  },
  {
    name: "Actions",
    icons: [
      "search", "edit", "delete", "copy", "copy_checked", "share", "download", "upload",
      "save", "print", "plus", "plus_fill", "minus", "minus_fill", "close", "close_fill",
      "check", "check_fill", "change", "change_fill", "rotate", "drag_and_drop", "export",
      "filter", "sorting", "sorting_asc", "sorting_desc", "preview", "archive"
    ],
  },
  {
    name: "Communication",
    icons: [
      "mail", "mail_opened", "send_mail", "phone", "phone_settings", "message", "chatbot",
      "notification", "announcement", "dialog", "support", "live_support", "send"
    ],
  },
  {
    name: "User & Account",
    icons: [
      "account", "profile", "profile_check", "profile_star", "people", "group_of_people",
      "user_management", "lock", "unlock", "incognito"
    ],
  },
  {
    name: "E-commerce",
    icons: [
      "shopping_bag", "shopping_bag_add", "shopping_bag_back", "shopping_bag_cancel",
      "shopping_bag_discount", "shopping_bag_return", "store", "new_store", "store_performance",
      "market", "market_order_back", "market_order_cancel", "market_order_change", "market_order_check",
      "market_processing", "order", "order_back", "order_box", "order_boxes", "order_cancel",
      "order_check", "order_return", "order_settings", "order_time", "order_tracking",
      "product", "add_product", "wallet", "money", "money_transfer", "split_money", "coin",
      "credit_card", "coupon", "gift", "label", "barcode", "qr", "price_settings", "offers",
      "campaign", "bill", "express", "express_delivery", "express_furniture"
    ],
  },
  {
    name: "Content & Documents",
    icons: [
      "document", "document_search", "paper", "book", "report", "excel", "add_note",
      "image", "photo", "photo_off", "add_photo", "calendar", "clock", "history",
      "hourglass", "link", "attach", "listing", "browser", "code"
    ],
  },
  {
    name: "Status & Feedback",
    icons: [
      "info", "warning", "alert", "notice", "help", "check", "check_fill", "close", "close_fill",
      "loading", "disable", "partial_approve", "complain", "review"
    ],
  },
  {
    name: "Media & Controls",
    icons: [
      "play", "play_fill", "pause", "pause_fill", "stop", "stop_fill", "microphone",
      "microphone_off", "sound_on", "sound_off", "camera", "camera_off", "desktop",
      "desktop_filled", "mobile", "mobile_fill", "mobile_settings"
    ],
  },
  {
    name: "Favorites & Ratings",
    icons: [
      "heart", "heart_fill", "star", "star_fill", "star_double", "star_triple",
      "like", "dislike", "award", "medal", "badge", "happy", "normal", "sad", "very_happy", "very_sad"
    ],
  },
  {
    name: "Location & Maps",
    icons: ["map", "pin", "globe", "global_export", "target", "compass", "warehouse", "truck", "motorcycle", "motorcycle_check"],
  },
  {
    name: "Settings & Tools",
    icons: [
      "settings", "services", "add_part", "zoom_in", "zoom_out", "puzzle", "light_bulb",
      "flash", "flash_fill", "magic_wand", "translation", "chart", "graphic", "graphic_decrease",
      "pie_chart", "pie_chart_report", "metric_decrease", "metric_increase", "metric_minus", "growth"
    ],
  },
  {
    name: "Social & Media",
    icons: ["facebook", "instagram", "youtube"],
  },
  {
    name: "Business & Finance",
    icons: [
      "finance_accounting", "suitcase", "handshake", "donation", "academy", "ticket",
      "vacation_mode", "confetti", "fire", "flag", "rocket", "heartbeat", "meal_bag",
      "burger", "live_monitor", "eye_on", "eye_off", "turn_back", "turn_back_fill"
    ],
  },
];

const filteredCategories = computed(() => {
  if (!searchQuery.value) return iconCategories;

  const query = searchQuery.value.toLowerCase();
  return iconCategories
    .map((cat) => ({
      ...cat,
      icons: cat.icons.filter((icon) => icon.toLowerCase().includes(query)),
    }))
    .filter((cat) => cat.icons.length > 0);
});

const totalIcons = computed(() => allIconList.length);

const copyToClipboard = (iconName: string) => {
  navigator.clipboard.writeText(`<bl-icon name="${iconName}"></bl-icon>`);
};

// Code examples
const setupCode = `import { setIconPath } from '@trendyol/baklava'

setIconPath('https://cdn.jsdelivr.net/npm/@trendyol/baklava-icons@latest/icons')`;

const usageCode = `<bl-icon name="home"></bl-icon>
<bl-icon name="search"></bl-icon>
<bl-icon name="settings"></bl-icon>`;
</script>

<template>
  <div class="iconography-demo">
    <h1 class="text-3xl font-bold text-neutral-darkest dark:text-white mb-2">Baklava Icons</h1>
    <p class="text-neutral-dark dark:text-neutral-light mb-4">
      Baklava Design System uses the
      <code class="text-primary">@trendyol/baklava-icons</code> package for custom-made icons. Click
      on any icon to copy its usage code.
    </p>

    <div class="flex flex-wrap gap-4 mb-8">
      <bl-badge size="medium" icon="info">{{ totalIcons }} Icons</bl-badge>
      <a
        href="https://trendyol.github.io/baklava-icons/?path=/docs/documentation-baklava-icons--icons"
        target="_blank"
        class="inline-flex"
      >
        <bl-badge size="medium" icon="external_link">Full Icon Library</bl-badge>
      </a>
    </div>

    <!-- Setup -->
    <h2 class="text-xl font-semibold text-neutral-darkest dark:text-white mb-4">Setup</h2>
    <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
      Set the icon path during initialization to use Baklava icons:
    </p>
    <div class="mb-8">
      <CodeBlock :code="setupCode" language="typescript" />
    </div>

    <!-- Usage -->
    <h2 class="text-xl font-semibold text-neutral-darkest dark:text-white mb-4">Usage</h2>
    <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
      Use the <code class="text-primary">bl-icon</code> component to display icons:
    </p>
    <div class="mb-8">
      <CodeBlock :code="usageCode" language="html" />
    </div>

    <!-- Customization -->
    <h2 class="text-xl font-semibold text-neutral-darkest dark:text-white mb-4">Customization</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div
        class="bg-white dark:bg-neutral-darker rounded-xl border border-neutral-lightest dark:border-neutral-dark p-6"
      >
        <h3 class="text-sm font-semibold text-neutral-darkest dark:text-white mb-3">Size</h3>
        <p class="text-xs text-neutral-dark dark:text-neutral-light mb-4">
          Icon size is controlled via CSS <code class="text-primary">font-size</code>
        </p>
        <div class="flex items-end gap-4">
          <div class="text-center">
            <bl-icon name="star" style="font-size: 16px"></bl-icon>
            <p class="text-xs text-neutral-dark mt-1">16px</p>
          </div>
          <div class="text-center">
            <bl-icon name="star" style="font-size: 24px"></bl-icon>
            <p class="text-xs text-neutral-dark mt-1">24px</p>
          </div>
          <div class="text-center">
            <bl-icon name="star" style="font-size: 32px"></bl-icon>
            <p class="text-xs text-neutral-dark mt-1">32px</p>
          </div>
          <div class="text-center">
            <bl-icon name="star" style="font-size: 48px"></bl-icon>
            <p class="text-xs text-neutral-dark mt-1">48px</p>
          </div>
        </div>
      </div>

      <div
        class="bg-white dark:bg-neutral-darker rounded-xl border border-neutral-lightest dark:border-neutral-dark p-6"
      >
        <h3 class="text-sm font-semibold text-neutral-darkest dark:text-white mb-3">Color</h3>
        <p class="text-xs text-neutral-dark dark:text-neutral-light mb-4">
          Icon color is controlled via CSS <code class="text-primary">color</code>
        </p>
        <div class="flex items-center gap-4" style="font-size: 32px">
          <bl-icon name="heart" style="color: var(--bl-color-primary)"></bl-icon>
          <bl-icon name="check_fill" style="color: var(--bl-color-success)"></bl-icon>
          <bl-icon name="warning" style="color: var(--bl-color-warning)"></bl-icon>
          <bl-icon name="close" style="color: var(--bl-color-danger)"></bl-icon>
          <bl-icon name="info" style="color: var(--bl-color-info)"></bl-icon>
        </div>
      </div>
    </div>

    <!-- Search -->
    <h2 class="text-xl font-semibold text-neutral-darkest dark:text-white mb-4">Icon Library</h2>
    <div class="mb-6">
      <bl-input
        placeholder="Search icons..."
        icon="search"
        :value="searchQuery"
        @bl-input="searchQuery = (($event as CustomEvent).target as HTMLInputElement)?.value || ''"
        style="max-width: 400px"
      ></bl-input>
    </div>

    <!-- Icon Categories -->
    <div class="space-y-8">
      <div
        v-for="category in filteredCategories"
        :key="category.name"
        class="bg-white dark:bg-neutral-darker rounded-xl border border-neutral-lightest dark:border-neutral-dark overflow-hidden"
      >
        <div
          class="px-6 py-3 bg-neutral-lightest dark:bg-neutral-dark border-b border-neutral-lightest dark:border-neutral-dark"
        >
          <span class="font-semibold text-neutral-darkest dark:text-white">{{ category.name }}</span>
          <span class="text-sm text-neutral-dark ml-2">({{ category.icons.length }})</span>
        </div>
        <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 p-4">
          <div
            v-for="icon in category.icons"
            :key="icon"
            class="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-neutral-lightest dark:hover:bg-neutral-dark cursor-pointer transition-colors"
            :title="`Click to copy: <bl-icon name=&quot;${icon}&quot;></bl-icon>`"
            @click="copyToClipboard(icon)"
          >
            <bl-icon :name="icon" style="font-size: 24px"></bl-icon>
            <span class="text-xs text-neutral-dark truncate w-full text-center">{{ icon }}</span>
          </div>
        </div>
      </div>
    </div>

    <p
      v-if="filteredCategories.length === 0"
      class="text-center text-neutral-dark py-12"
    >
      No icons found matching "{{ searchQuery }}"
    </p>

    <!-- More Icons Link -->
    <div class="mt-8 p-6 bg-primary/10 rounded-xl text-center">
      <p class="text-neutral-darker dark:text-neutral-light mb-4">
        For the complete list of available icons and detailed documentation, visit the official
        Baklava Icons library.
      </p>
      <a
        href="https://trendyol.github.io/baklava-icons/?path=/docs/documentation-baklava-icons--icons"
        target="_blank"
      >
        <bl-button variant="primary" icon="external_link">
          Browse All Icons
        </bl-button>
      </a>
    </div>
  </div>
</template>

<style scoped>
code {
  color: var(--bl-color-primary);
}
</style>
