<script setup lang="ts">
import DemoSection from "@/components/DemoSection.vue";
import { ref } from "vue";

const searchQuery = ref("");

// All available icons
const allIcons = [
  "academy",
  "account",
  "add_note",
  "archive",
  "arrow_down",
  "arrow_left",
  "arrow_right",
  "arrow_up",
  "attach",
  "award",
  "badge_check",
  "badge_discount",
  "badge_price",
  "barcode",
  "bell",
  "bookmark",
  "box",
  "calendar",
  "camera",
  "cart",
  "cash",
  "catalog",
  "chat",
  "check_fill",
  "check",
  "chevron_double_left",
  "chevron_double_right",
  "clock",
  "close",
  "code",
  "coins",
  "compare",
  "copy",
  "coupon_code",
  "credit_card",
  "delete",
  "delivery",
  "discount",
  "document",
  "down_1",
  "download",
  "edit",
  "education",
  "email",
  "exit",
  "external_link",
  "eye",
  "eye_off",
  "facebook",
  "file",
  "filter",
  "flash",
  "folder",
  "free_return",
  "gift",
  "globe",
  "google",
  "grid",
  "group_1",
  "hand",
  "handshake",
  "headset",
  "heart_fill",
  "heart",
  "help",
  "history",
  "home",
  "image",
  "info",
  "instagram",
  "invoice",
  "keyboard",
  "leaf",
  "left_1",
  "lightbulb",
  "link",
  "list",
  "loading",
  "location",
  "lock",
  "logout",
  "map",
  "megaphone",
  "menu",
  "message",
  "mic",
  "minus",
  "money",
  "more_horizontal",
  "more_vertical",
  "offer_horizontal",
  "offer_vertical",
  "orders",
  "package",
  "palette",
  "paper_plane",
  "pause",
  "percent",
  "phone",
  "pin",
  "play",
  "plus_fill",
  "plus",
  "policy",
  "print",
  "puzzle",
  "qr_code",
  "question",
  "receipt",
  "record",
  "refresh",
  "reply",
  "resize",
  "right_1",
  "rocket",
  "rotate",
  "ruler",
  "save",
  "search",
  "secure",
  "settings",
  "share",
  "shield",
  "shop",
  "shuffle",
  "sort",
  "speaker",
  "star_fill",
  "star",
  "store",
  "tag",
  "target",
  "thumbs_down",
  "thumbs_up",
  "ticket",
  "transfer",
  "trash",
  "trending_down",
  "trending_up",
  "twitter",
  "up_1",
  "upload",
  "user_check",
  "user_minus",
  "user_plus",
  "user",
  "video",
  "wallet",
  "warning_fill",
  "warning",
  "whatsapp",
  "youtube",
  "zoom_in",
  "zoom_out",
];

const filteredIcons = ref(allIcons);

const filterIcons = () => {
  if (!searchQuery.value) {
    filteredIcons.value = allIcons;
  } else {
    filteredIcons.value = allIcons.filter((icon) =>
      icon.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
};

const copyIconName = (name: string) => {
  navigator.clipboard.writeText(`<bl-icon name="${name}"></bl-icon>`);
};

const basicCode = `<bl-icon name="home"></bl-icon>
<bl-icon name="search"></bl-icon>
<bl-icon name="settings"></bl-icon>
<bl-icon name="account"></bl-icon>
<bl-icon name="bell"></bl-icon>`;

const sizesCode = `<!-- Icon size is controlled via CSS font-size -->
<bl-icon name="star" style="font-size: 16px"></bl-icon>
<bl-icon name="star" style="font-size: 24px"></bl-icon>
<bl-icon name="star" style="font-size: 32px"></bl-icon>
<bl-icon name="star" style="font-size: 48px"></bl-icon>

<!-- Using Baklava size variables -->
<bl-icon name="info" style="font-size: var(--bl-font-size-m)"></bl-icon>
<bl-icon name="info" style="font-size: var(--bl-font-size-xl)"></bl-icon>
<bl-icon name="info" style="font-size: var(--bl-font-size-3xl)"></bl-icon>`;

const colorsCode = `<!-- Icon color is controlled via CSS color -->
<bl-icon name="heart" style="color: var(--bl-color-primary)"></bl-icon>
<bl-icon name="check_fill" style="color: var(--bl-color-success)"></bl-icon>
<bl-icon name="warning" style="color: var(--bl-color-warning)"></bl-icon>
<bl-icon name="close" style="color: var(--bl-color-danger)"></bl-icon>
<bl-icon name="info" style="color: var(--bl-color-info)"></bl-icon>

<!-- Using neutral colors -->
<bl-icon name="settings" style="color: var(--bl-color-neutral-darker)"></bl-icon>
<bl-icon name="settings" style="color: var(--bl-color-neutral-dark)"></bl-icon>
<bl-icon name="settings" style="color: var(--bl-color-neutral-light)"></bl-icon>`;

const usageCode = `<!-- Icon inherits color and size from parent -->
<div style="color: #f27a1a; font-size: 20px;">
  <bl-icon name="location"></bl-icon>
  <span>Istanbul, Turkey</span>
</div>

<!-- Icon with text -->
<div class="flex items-center gap-2">
  <bl-icon name="email" style="color: var(--bl-color-info)"></bl-icon>
  <span>contact@example.com</span>
</div>`;

const accessibilityCode = `<!-- Use title attribute for accessibility -->
<bl-icon name="warning" title="Warning icon"></bl-icon>

<!-- Or use aria-label -->
<bl-icon name="delete" aria-label="Delete item"></bl-icon>`;
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="prose dark:prose-invert max-w-none mb-8">
      <p class="text-neutral-dark dark:text-neutral-light">
        Icon component is an <strong>internal</strong> component for using inside other Baklava
        components to show decorative icons. It provides a consistent icon system across all
        components.
      </p>

      <bl-alert variant="warning" icon class="my-4">
        Inline styles in examples are only for <strong>demo purposes</strong>. Use regular CSS
        classes or tag selectors to set styles.
      </bl-alert>

      <h4 class="text-sm font-semibold text-neutral-darkest dark:text-white mt-4 mb-2">
        Key Features
      </h4>
      <ul class="text-sm text-neutral-dark dark:text-neutral-light list-disc pl-5 space-y-1">
        <li>Use <code>name</code> attribute to specify the icon</li>
        <li>Size is controlled via CSS <code>font-size</code></li>
        <li>Color is controlled via CSS <code>color</code></li>
        <li>Icons inherit size and color from parent element by default</li>
        <li>Use <code>title</code> attribute for accessibility</li>
      </ul>
    </div>

    <!-- Basic Icons -->
    <div class="mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Showing Icons
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        You can show icons by using the <code>name</code> attribute.
      </p>
    </div>

    <DemoSection title="Basic Icons" :code="basicCode">
      <div class="flex flex-wrap gap-6" style="font-size: 24px">
        <bl-icon name="home"></bl-icon>
        <bl-icon name="search"></bl-icon>
        <bl-icon name="settings"></bl-icon>
        <bl-icon name="account"></bl-icon>
        <bl-icon name="bell"></bl-icon>
        <bl-icon name="email"></bl-icon>
        <bl-icon name="calendar"></bl-icon>
        <bl-icon name="heart"></bl-icon>
      </div>
    </DemoSection>

    <!-- Sizing Icons -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Sizing Icons</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Icon size can be set via CSS with <code>font-size</code> property. By default, icons are in
        the size of current font-size of the tag placement.
      </p>
    </div>

    <DemoSection title="Icon Sizes" :code="sizesCode">
      <div class="space-y-6">
        <div class="flex flex-wrap items-center gap-6">
          <div class="flex flex-col items-center gap-1">
            <bl-icon name="star" style="font-size: 16px"></bl-icon>
            <span class="text-xs text-neutral-dark">16px</span>
          </div>
          <div class="flex flex-col items-center gap-1">
            <bl-icon name="star" style="font-size: 24px"></bl-icon>
            <span class="text-xs text-neutral-dark">24px</span>
          </div>
          <div class="flex flex-col items-center gap-1">
            <bl-icon name="star" style="font-size: 32px"></bl-icon>
            <span class="text-xs text-neutral-dark">32px</span>
          </div>
          <div class="flex flex-col items-center gap-1">
            <bl-icon name="star" style="font-size: 48px"></bl-icon>
            <span class="text-xs text-neutral-dark">48px</span>
          </div>
          <div class="flex flex-col items-center gap-1">
            <bl-icon name="star" style="font-size: 64px"></bl-icon>
            <span class="text-xs text-neutral-dark">64px</span>
          </div>
        </div>

        <div>
          <p class="text-sm text-neutral-dark mb-2">Using Baklava size variables:</p>
          <div class="flex flex-wrap items-center gap-6">
            <bl-icon name="info" style="font-size: var(--bl-font-size-m)"></bl-icon>
            <bl-icon name="info" style="font-size: var(--bl-font-size-l)"></bl-icon>
            <bl-icon name="info" style="font-size: var(--bl-font-size-xl)"></bl-icon>
            <bl-icon name="info" style="font-size: var(--bl-font-size-2xl)"></bl-icon>
            <bl-icon name="info" style="font-size: var(--bl-font-size-3xl)"></bl-icon>
          </div>
        </div>
      </div>
    </DemoSection>

    <!-- Coloring Icons -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Coloring Icons
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Icon color can be set via CSS with <code>color</code> property. By default, icons inherit
        the color of their parent element.
      </p>
    </div>

    <DemoSection title="Icon Colors" :code="colorsCode">
      <div class="space-y-6" style="font-size: 32px">
        <div>
          <p class="text-sm text-neutral-dark mb-2">Semantic colors:</p>
          <div class="flex flex-wrap items-center gap-6">
            <div class="flex flex-col items-center gap-1">
              <bl-icon name="heart" style="color: var(--bl-color-primary)"></bl-icon>
              <span class="text-xs text-neutral-dark">Primary</span>
            </div>
            <div class="flex flex-col items-center gap-1">
              <bl-icon name="check_fill" style="color: var(--bl-color-success)"></bl-icon>
              <span class="text-xs text-neutral-dark">Success</span>
            </div>
            <div class="flex flex-col items-center gap-1">
              <bl-icon name="warning" style="color: var(--bl-color-warning)"></bl-icon>
              <span class="text-xs text-neutral-dark">Warning</span>
            </div>
            <div class="flex flex-col items-center gap-1">
              <bl-icon name="close" style="color: var(--bl-color-danger)"></bl-icon>
              <span class="text-xs text-neutral-dark">Danger</span>
            </div>
            <div class="flex flex-col items-center gap-1">
              <bl-icon name="info" style="color: var(--bl-color-info)"></bl-icon>
              <span class="text-xs text-neutral-dark">Info</span>
            </div>
          </div>
        </div>

        <div>
          <p class="text-sm text-neutral-dark mb-2">Neutral colors:</p>
          <div class="flex flex-wrap items-center gap-6">
            <bl-icon name="settings" style="color: var(--bl-color-neutral-darker)"></bl-icon>
            <bl-icon name="settings" style="color: var(--bl-color-neutral-dark)"></bl-icon>
            <bl-icon name="settings" style="color: var(--bl-color-neutral-light)"></bl-icon>
            <bl-icon name="settings" style="color: var(--bl-color-neutral-lighter)"></bl-icon>
          </div>
        </div>
      </div>
    </DemoSection>

    <!-- Usage Examples -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Usage Examples
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Icons can be used inline with text. They automatically inherit size and color from the
        parent.
      </p>
    </div>

    <DemoSection title="In Context" :code="usageCode">
      <div class="flex flex-wrap gap-6">
        <div
          class="flex items-center gap-2 text-neutral-darker dark:text-neutral-light"
          style="font-size: 16px"
        >
          <bl-icon name="location" style="color: var(--bl-color-primary)"></bl-icon>
          <span>Istanbul, Turkey</span>
        </div>
        <div
          class="flex items-center gap-2 text-neutral-darker dark:text-neutral-light"
          style="font-size: 16px"
        >
          <bl-icon name="email" style="color: var(--bl-color-info)"></bl-icon>
          <span>contact@example.com</span>
        </div>
        <div
          class="flex items-center gap-2 text-neutral-darker dark:text-neutral-light"
          style="font-size: 16px"
        >
          <bl-icon name="calendar" style="color: var(--bl-color-success)"></bl-icon>
          <span>January 20, 2026</span>
        </div>
        <div
          class="flex items-center gap-2 text-neutral-darker dark:text-neutral-light"
          style="font-size: 16px"
        >
          <bl-icon name="phone" style="color: var(--bl-color-warning)"></bl-icon>
          <span>+90 555 123 4567</span>
        </div>
      </div>
    </DemoSection>

    <!-- Accessibility -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Accessibility</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        For decorative icons, no additional attributes are needed. For meaningful icons, use the
        <code>title</code> attribute to provide accessible text.
      </p>
    </div>

    <DemoSection title="Accessibility" :code="accessibilityCode">
      <div class="flex flex-wrap gap-6" style="font-size: 32px">
        <bl-icon name="warning" title="Warning icon"></bl-icon>
        <bl-icon name="delete" title="Delete item"></bl-icon>
        <bl-icon name="info" title="Information"></bl-icon>
      </div>
    </DemoSection>

    <!-- All Icons Grid -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        List of All Icons
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Here is a complete list of all available icons. Click on an icon to copy its usage code.
      </p>
    </div>

    <div class="mb-4">
      <bl-input
        placeholder="Search icons..."
        icon="search"
        :value="searchQuery"
        @bl-input="
          searchQuery = ($event as CustomEvent).target.value;
          filterIcons();
        "
      ></bl-input>
    </div>

    <div
      class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 p-4 bg-neutral-lightest dark:bg-neutral-darker rounded-lg"
    >
      <div
        v-for="icon in filteredIcons"
        :key="icon"
        class="flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-white dark:hover:bg-neutral-dark cursor-pointer transition-colors"
        :title="`Click to copy: <bl-icon name=&quot;${icon}&quot;></bl-icon>`"
        @click="copyIconName(icon)"
      >
        <bl-icon :name="icon" style="font-size: 24px"></bl-icon>
        <span class="text-xs text-neutral-dark truncate w-full text-center">{{ icon }}</span>
      </div>
    </div>

    <p v-if="filteredIcons.length === 0" class="text-sm text-neutral-dark text-center py-8">
      No icons found matching "{{ searchQuery }}"
    </p>

    <p class="text-sm text-neutral-dark mt-2">
      Total: {{ filteredIcons.length }} icons
      {{ searchQuery ? `(filtered from ${allIcons.length})` : "" }}
    </p>
  </div>
</template>
