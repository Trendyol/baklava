<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  code: string;
  language?: string;
}>();

const copied = ref(false);

async function copyCode() {
  await navigator.clipboard.writeText(props.code);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
}
</script>

<template>
  <div class="relative group">
    <pre class="!pr-12"><code>{{ code }}</code></pre>

    <bl-button
      class="copy-btn absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
      variant="tertiary"
      size="small"
      :icon="copied ? 'check_fill' : 'copy'"
      @bl-click="copyCode"
    />
  </div>
</template>

<style scoped>
.copy-btn {
  --bl-button-color: var(--bl-color-neutral-lighter);
  --bl-button-hover-color: var(--bl-color-neutral-lightest);
}
</style>
