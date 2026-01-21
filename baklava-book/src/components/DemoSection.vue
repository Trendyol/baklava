<script setup lang="ts">
import { ref } from "vue";
import CodeBlock from "./CodeBlock.vue";

defineProps<{
  title: string;
  code: string;
}>();

const showCode = ref(false);
</script>

<template>
  <div class="demo-section">
    <h4 class="text-sm font-medium text-neutral-dark mb-3">{{ title }}</h4>

    <div class="demo-content">
      <slot />
    </div>

    <div class="demo-footer">
      <bl-button
        variant="tertiary"
        size="small"
        :icon="showCode ? 'arrow_up' : 'code'"
        @bl-click="showCode = !showCode"
      >
        {{ showCode ? "Hide code" : "Show code" }}
      </bl-button>
    </div>

    <div v-if="showCode" class="demo-code">
      <CodeBlock :code="code" language="html" />
    </div>
  </div>
</template>

<style scoped>
.demo-section {
  margin-bottom: 2rem;
}

.demo-content {
  padding: 1.5rem;
  background: var(--bl-color-neutral-full);
  border: 1px solid var(--bl-color-neutral-lighter);
  border-radius: 0.5rem 0.5rem 0 0;
}

.demo-footer {
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem 1rem;
  background: var(--bl-color-neutral-full);
  border: 1px solid var(--bl-color-neutral-lighter);
  border-top: none;
  border-radius: 0 0 0.5rem 0.5rem;
}

.demo-code {
  margin-top: -1px;
  border-radius: 0 0 0.5rem 0.5rem;
  overflow: hidden;
}

.demo-code :deep(pre) {
  border-radius: 0 0 0.5rem 0.5rem;
  margin: 0;
}

:root.dark .demo-content {
  border-color: var(--bl-color-neutral-dark);
}

:root.dark .demo-footer {
  border-color: var(--bl-color-neutral-dark);
}
</style>
