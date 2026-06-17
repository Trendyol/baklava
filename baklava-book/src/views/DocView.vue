<script setup lang="ts">
import BorderRadiusDemo from "@/components/BorderRadiusDemo.vue";
import ColorPalette from "@/components/ColorPalette.vue";
import IconographyDemo from "@/components/IconographyDemo.vue";
import SizingDemo from "@/components/SizingDemo.vue";
import TypographyDemo from "@/components/TypographyDemo.vue";
import ZIndexDemo from "@/components/ZIndexDemo.vue";
import { getDocBySlug, getDocCategoryBySlug } from "@/data/docs";
import { docComponents } from "@/views/docs";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const slug = computed(() => route.params.slug as string);
const doc = computed(() => getDocBySlug(slug.value));
const category = computed(() => getDocCategoryBySlug(slug.value));

// Get the component for the current doc slug
const docComponent = computed(() => docComponents[slug.value] || null);
</script>

<template>
  <div class="p-8 max-w-full">
    <!-- Breadcrumb -->
    <div class="flex items-center gap-2 text-sm text-neutral-dark mb-6">
      <router-link to="/" class="hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">Home</router-link>
      <span>/</span>
      <span v-if="category">{{ category.label }}</span>
      <span v-if="category">/</span>
      <span class="text-neutral-darkest dark:text-white">{{ doc?.name }}</span>
    </div>

    <!-- Special Design Token Pages -->
    <template v-if="slug === 'colors'">
      <ColorPalette />
    </template>

    <template v-else-if="slug === 'border-radius'">
      <BorderRadiusDemo />
    </template>

    <template v-else-if="slug === 'typography'">
      <TypographyDemo />
    </template>

    <template v-else-if="slug === 'sizing'">
      <SizingDemo />
    </template>

    <template v-else-if="slug === 'iconography'">
      <IconographyDemo />
    </template>

    <template v-else-if="slug === 'z-index'">
      <ZIndexDemo />
    </template>

    <!-- Doc Page Components (Vue components with Shiki) -->
    <template v-else-if="docComponent">
      <component :is="docComponent" />
    </template>

    <!-- Fallback for missing pages -->
    <article v-else class="prose prose-neutral dark:prose-invert max-w-none">
      <h1 class="text-3xl font-bold text-neutral-darkest dark:text-white mb-6">
        {{ doc?.name || "Document" }}
      </h1>
      <p class="text-neutral-darker dark:text-neutral-light">
        This document has not been added yet.
      </p>
    </article>
  </div>
</template>
