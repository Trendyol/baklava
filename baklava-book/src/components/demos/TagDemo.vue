<script setup lang="ts">
import DemoSection from "@/components/DemoSection.vue";
import { ref } from "vue";

const selectedTag = ref("");
const removedTags = ref<string[]>([]);
const tags = ref(["JavaScript", "TypeScript", "Vue.js", "React", "Angular"]);

const handleRemove = (tag: string) => {
  tags.value = tags.value.filter((t) => t !== tag);
  removedTags.value.push(tag);
};

const resetTags = () => {
  tags.value = ["JavaScript", "TypeScript", "Vue.js", "React", "Angular"];
  removedTags.value = [];
};

const basicCode = `<bl-tag>Default Tag</bl-tag>
<bl-tag>Category</bl-tag>
<bl-tag>Label</bl-tag>`;

const variantsCode = `<!-- Selectable - can be selected/deselected -->
<bl-tag variant="selectable">Selectable Tag</bl-tag>

<!-- Removable - shows a close button -->
<bl-tag variant="removable">Removable Tag</bl-tag>`;

const sizesCode = `<bl-tag size="small">Small</bl-tag>
<bl-tag size="medium">Medium</bl-tag>
<bl-tag size="large">Large</bl-tag>

<!-- Removable tags in different sizes -->
<bl-tag size="small" variant="removable">Small Removable</bl-tag>
<bl-tag size="medium" variant="removable">Medium Removable</bl-tag>
<bl-tag size="large" variant="removable">Large Removable</bl-tag>`;

const iconsCode = `<bl-tag icon="info">Info Tag</bl-tag>
<bl-tag icon="check_fill">Completed</bl-tag>
<bl-tag icon="clock">Pending</bl-tag>
<bl-tag icon="star">Featured</bl-tag>
<bl-tag variant="removable" icon="heart_fill">Favorite</bl-tag>`;

const statesCode = `<!-- Selected state -->
<bl-tag variant="selectable" selected>Selected Tag</bl-tag>

<!-- Disabled state -->
<bl-tag disabled>Disabled Tag</bl-tag>

<!-- Selected + Disabled -->
<bl-tag variant="selectable" selected disabled>Selected Disabled</bl-tag>

<!-- Removable + Disabled -->
<bl-tag variant="removable" disabled>Disabled Removable</bl-tag>`;

const selectableCode = `<script setup>
import { ref } from "vue";
const selectedTag = ref("");

const toggleTag = (value) => {
  selectedTag.value = selectedTag.value === value ? "" : value;
};
<\/script>

<template>
  <bl-tag
    variant="selectable"
    value="electronics"
    :selected="selectedTag === 'electronics'"
    @bl-tag-click="toggleTag('electronics')"
  >
    Electronics
  </bl-tag>
  <bl-tag
    variant="selectable"
    value="clothing"
    :selected="selectedTag === 'clothing'"
    @bl-tag-click="toggleTag('clothing')"
  >
    Clothing
  </bl-tag>
</template>`;

const removableCode = `<script setup>
import { ref } from "vue";
const tags = ref(["JavaScript", "TypeScript", "Vue.js"]);

const handleRemove = (tag) => {
  tags.value = tags.value.filter(t => t !== tag);
};
<\/script>

<template>
  <bl-tag
    v-for="tag in tags"
    :key="tag"
    variant="removable"
    @bl-tag-remove="handleRemove(tag)"
  >
    {{ tag }}
  </bl-tag>
</template>`;

const rtlCode = `<!-- LTR (Left-to-Right) -->
<bl-tag icon="check_fill">Completed</bl-tag>
<bl-tag variant="removable">Remove me</bl-tag>

<!-- RTL (Right-to-Left) -->
<div dir="rtl">
  <bl-tag icon="check_fill">مكتمل</bl-tag>
  <bl-tag variant="removable">احذفني</bl-tag>
</div>`;
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="prose dark:prose-invert max-w-none mb-8">
      <p class="text-neutral-dark dark:text-neutral-light">
        Tags are compact elements that represent an input, attribute, or action. They can be used
        to label, categorize, or organize items using keywords.
      </p>

      <bl-alert variant="warning" icon class="my-4">
        Inline styles in examples are only for <strong>demo purposes</strong>. Use regular CSS
        classes or tag selectors to set styles.
      </bl-alert>

      <h4 class="text-sm font-semibold text-neutral-darkest dark:text-white mt-4 mb-2">
        Usage Guidelines
      </h4>
      <ul class="text-sm text-neutral-dark dark:text-neutral-light list-disc pl-5 space-y-1">
        <li>Use tags to label, categorize, or organize items</li>
        <li>Keep tag text short and descriptive</li>
        <li>Use selectable variant for filter options</li>
        <li>Use removable variant for user-added items</li>
        <li>Add icons for additional visual context</li>
      </ul>
    </div>

    <!-- Basic Usage -->
    <div class="mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Basic Usage</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Tags can be used to label, categorize, or organize items using keywords.
      </p>
    </div>

    <DemoSection title="Basic Tags" :code="basicCode">
      <div class="flex flex-wrap gap-2">
        <bl-tag>Default Tag</bl-tag>
        <bl-tag>Category</bl-tag>
        <bl-tag>Label</bl-tag>
        <bl-tag>Keyword</bl-tag>
      </div>
    </DemoSection>

    <!-- Variants -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Variants</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Tags come in two variants: <code>selectable</code> and <code>removable</code>.
      </p>
    </div>

    <DemoSection title="Variants" :code="variantsCode">
      <div class="flex flex-wrap gap-2">
        <bl-tag variant="selectable">Selectable Tag</bl-tag>
        <bl-tag variant="removable">Removable Tag</bl-tag>
      </div>
    </DemoSection>

    <!-- Sizes -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Sizes</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Tags are available in three sizes: <code>small</code>, <code>medium</code> (default), and
        <code>large</code>.
      </p>
    </div>

    <DemoSection title="Sizes" :code="sizesCode">
      <div class="space-y-4">
        <div class="flex flex-wrap items-center gap-2">
          <bl-tag size="small">Small</bl-tag>
          <bl-tag size="medium">Medium</bl-tag>
          <bl-tag size="large">Large</bl-tag>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <bl-tag size="small" variant="removable">Small Removable</bl-tag>
          <bl-tag size="medium" variant="removable">Medium Removable</bl-tag>
          <bl-tag size="large" variant="removable">Large Removable</bl-tag>
        </div>
      </div>
    </DemoSection>

    <!-- With Icons -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">With Icons</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Tags can include icons to provide additional visual context. Use the <code>icon</code>
        attribute.
      </p>
    </div>

    <DemoSection title="With Icons" :code="iconsCode">
      <div class="flex flex-wrap gap-2">
        <bl-tag icon="info">Info Tag</bl-tag>
        <bl-tag icon="check_fill">Completed</bl-tag>
        <bl-tag icon="clock">Pending</bl-tag>
        <bl-tag icon="star">Featured</bl-tag>
        <bl-tag variant="removable" icon="heart_fill">Favorite</bl-tag>
      </div>
    </DemoSection>

    <!-- States -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">States</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Tags can be <code>selected</code> or <code>disabled</code>.
      </p>
    </div>

    <DemoSection title="States" :code="statesCode">
      <div class="flex flex-wrap gap-2">
        <bl-tag variant="selectable" selected>Selected Tag</bl-tag>
        <bl-tag disabled>Disabled Tag</bl-tag>
        <bl-tag variant="selectable" selected disabled>Selected Disabled</bl-tag>
        <bl-tag variant="removable" disabled>Disabled Removable</bl-tag>
      </div>
    </DemoSection>

    <!-- Selectable Demo -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Selectable Tags (Interactive)
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Use selectable tags for filter options. Listen for the <code>@bl-tag-click</code> event to
        handle selection changes.
      </p>
    </div>

    <DemoSection title="Selectable Demo" :code="selectableCode">
      <div class="flex flex-wrap gap-2">
        <bl-tag
          variant="selectable"
          value="electronics"
          :selected="selectedTag === 'electronics'"
          @bl-tag-click="selectedTag = selectedTag === 'electronics' ? '' : 'electronics'"
        >
          Electronics
        </bl-tag>
        <bl-tag
          variant="selectable"
          value="clothing"
          :selected="selectedTag === 'clothing'"
          @bl-tag-click="selectedTag = selectedTag === 'clothing' ? '' : 'clothing'"
        >
          Clothing
        </bl-tag>
        <bl-tag
          variant="selectable"
          value="books"
          :selected="selectedTag === 'books'"
          @bl-tag-click="selectedTag = selectedTag === 'books' ? '' : 'books'"
        >
          Books
        </bl-tag>
        <bl-tag
          variant="selectable"
          value="sports"
          :selected="selectedTag === 'sports'"
          @bl-tag-click="selectedTag = selectedTag === 'sports' ? '' : 'sports'"
        >
          Sports
        </bl-tag>
      </div>
      <p class="text-sm text-neutral-dark mt-3">
        Selected: <strong class="text-primary">{{ selectedTag || "None" }}</strong>
      </p>
    </DemoSection>

    <!-- Removable Demo -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Removable Tags (Interactive)
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Use removable tags for user-added items. Listen for the <code>@bl-tag-remove</code> event
        to handle removal.
      </p>
    </div>

    <DemoSection title="Removable Demo" :code="removableCode">
      <div class="flex flex-wrap gap-2 mb-3">
        <bl-tag
          v-for="tag in tags"
          :key="tag"
          variant="removable"
          @bl-tag-remove="handleRemove(tag)"
        >
          {{ tag }}
        </bl-tag>
        <span v-if="tags.length === 0" class="text-sm text-neutral-dark">No tags remaining</span>
      </div>
      <div v-if="removedTags.length > 0" class="flex items-center gap-2">
        <span class="text-sm text-neutral-dark">Removed: {{ removedTags.join(", ") }}</span>
        <bl-button size="small" variant="tertiary" @bl-click="resetTags">Reset</bl-button>
      </div>
    </DemoSection>

    <!-- RTL Support -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">RTL Support</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        The tag component supports RTL (Right-to-Left) text direction. Icons and remove buttons are
        automatically mirrored in RTL mode.
      </p>
    </div>

    <DemoSection title="RTL Support" :code="rtlCode">
      <div class="flex gap-8">
        <div>
          <p class="text-sm text-neutral-dark mb-2">LTR (Left-to-Right)</p>
          <div class="flex flex-wrap gap-2">
            <bl-tag icon="check_fill">Completed</bl-tag>
            <bl-tag variant="removable">Remove me</bl-tag>
            <bl-tag icon="star">Featured</bl-tag>
          </div>
        </div>
        <div dir="rtl">
          <p class="text-sm text-neutral-dark mb-2">RTL (Right-to-Left)</p>
          <div class="flex flex-wrap gap-2">
            <bl-tag icon="check_fill">مكتمل</bl-tag>
            <bl-tag variant="removable">احذفني</bl-tag>
            <bl-tag icon="star">مميز</bl-tag>
          </div>
        </div>
      </div>
    </DemoSection>
  </div>
</template>
