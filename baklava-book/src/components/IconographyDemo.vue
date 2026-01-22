<script setup lang="ts">
import { ref, computed } from "vue";

const searchQuery = ref("");

// Icon categories based on Baklava Icons
const iconCategories = [
  {
    name: "Navigation",
    icons: [
      "home",
      "menu",
      "arrow_left",
      "arrow_right",
      "arrow_up",
      "arrow_down",
      "chevron_double_left",
      "chevron_double_right",
      "external_link",
      "exit",
    ],
  },
  {
    name: "Actions",
    icons: [
      "search",
      "edit",
      "delete",
      "copy",
      "share",
      "download",
      "upload",
      "refresh",
      "save",
      "print",
      "plus",
      "minus",
      "close",
      "check",
      "check_fill",
    ],
  },
  {
    name: "Communication",
    icons: ["email", "phone", "chat", "message", "bell", "megaphone", "paper_plane"],
  },
  {
    name: "User & Account",
    icons: [
      "account",
      "user",
      "user_plus",
      "user_minus",
      "user_check",
      "group_1",
      "lock",
      "logout",
    ],
  },
  {
    name: "E-commerce",
    icons: [
      "cart",
      "shop",
      "store",
      "orders",
      "package",
      "box",
      "delivery",
      "receipt",
      "invoice",
      "wallet",
      "money",
      "cash",
      "credit_card",
      "coins",
      "coupon_code",
      "discount",
      "badge_discount",
      "badge_price",
      "percent",
      "tag",
      "gift",
      "free_return",
    ],
  },
  {
    name: "Content",
    icons: [
      "document",
      "file",
      "folder",
      "image",
      "video",
      "calendar",
      "clock",
      "history",
      "bookmark",
      "link",
      "attach",
      "barcode",
      "qr_code",
    ],
  },
  {
    name: "Status & Feedback",
    icons: [
      "info",
      "warning",
      "warning_fill",
      "help",
      "question",
      "check_fill",
      "close",
      "loading",
      "badge_check",
    ],
  },
  {
    name: "Media & Controls",
    icons: ["play", "pause", "record", "mic", "speaker", "video", "camera", "headset"],
  },
  {
    name: "Favorites & Ratings",
    icons: ["heart", "heart_fill", "star", "star_fill", "thumbs_up", "thumbs_down", "award"],
  },
  {
    name: "Location & Maps",
    icons: ["location", "map", "pin", "globe", "target"],
  },
  {
    name: "Settings & Tools",
    icons: [
      "settings",
      "filter",
      "sort",
      "grid",
      "list",
      "resize",
      "rotate",
      "zoom_in",
      "zoom_out",
      "code",
      "puzzle",
      "palette",
      "ruler",
      "lightbulb",
      "flash",
      "keyboard",
    ],
  },
  {
    name: "Social",
    icons: ["facebook", "twitter", "instagram", "google", "whatsapp", "youtube"],
  },
  {
    name: "Miscellaneous",
    icons: [
      "eye",
      "eye_off",
      "shield",
      "secure",
      "policy",
      "leaf",
      "hand",
      "handshake",
      "rocket",
      "academy",
      "education",
      "ticket",
      "catalog",
      "compare",
      "shuffle",
      "transfer",
      "trending_up",
      "trending_down",
      "more_horizontal",
      "more_vertical",
    ],
  },
];

const allIcons = computed(() => {
  return iconCategories.flatMap((cat) => cat.icons);
});

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

const totalIcons = computed(() => allIcons.value.length);

const copyToClipboard = (iconName: string) => {
  navigator.clipboard.writeText(`<bl-icon name="${iconName}"></bl-icon>`);
};
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
      <bl-badge size="medium" icon="info">{{ totalIcons }}+ Icons</bl-badge>
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
    <div class="bg-black rounded-xl p-4 overflow-x-auto mb-8">
      <pre class="text-sm text-[#d4d4d4]"><code>import { setIconPath } from '@trendyol/baklava'

setIconPath('https://cdn.jsdelivr.net/npm/@trendyol/baklava-icons@latest/icons')</code></pre>
    </div>

    <!-- Usage -->
    <h2 class="text-xl font-semibold text-neutral-darkest dark:text-white mb-4">Usage</h2>
    <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
      Use the <code class="text-primary">bl-icon</code> component to display icons:
    </p>
    <div class="bg-black rounded-xl p-4 overflow-x-auto mb-8">
      <pre class="text-sm text-[#d4d4d4]"><code>&lt;bl-icon name="home"&gt;&lt;/bl-icon&gt;
&lt;bl-icon name="search"&gt;&lt;/bl-icon&gt;
&lt;bl-icon name="settings"&gt;&lt;/bl-icon&gt;</code></pre>
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
