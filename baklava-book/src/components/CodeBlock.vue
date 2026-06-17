<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { codeToHtml } from "shiki";
import { useTheme } from "@/composables/useTheme";

const props = defineProps<{
  code: string;
  language?: string;
}>();

const { isDark } = useTheme();
const copied = ref(false);
const highlightedCode = ref("");

// Language mapping
const languageMap: Record<string, string> = {
  vue: "vue",
  html: "html",
  tsx: "tsx",
  jsx: "jsx",
  js: "javascript",
  ts: "typescript",
  css: "css",
  bash: "bash",
  shell: "bash",
  json: "json",
};

const effectiveLang = computed(() => {
  const lang = props.language?.toLowerCase() || "text";
  return languageMap[lang] || lang;
});

// Dynamic theme based on dark mode
const shikiTheme = computed(() => (isDark.value ? "github-dark" : "github-light"));

// Shiki highlighting
async function highlight() {
  try {
    const html = await codeToHtml(props.code.trim(), {
      lang: effectiveLang.value,
      theme: shikiTheme.value,
    });
    highlightedCode.value = html;
  } catch {
    // Fallback - plain text
    const escaped = props.code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    const bgColor = isDark.value ? "#24292e" : "#f6f8fa";
    const textColor = isDark.value ? "#e1e4e8" : "#24292e";
    highlightedCode.value = `<pre class="shiki" style="background-color:${bgColor};color:${textColor}"><code>${escaped}</code></pre>`;
  }
}

// Re-highlight when code, language, or theme changes
watch(
  [() => props.code, () => props.language, shikiTheme],
  () => {
    highlight();
  },
  { immediate: true, deep: true }
);

async function copyCode() {
  await navigator.clipboard.writeText(props.code);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
}
</script>

<template>
  <div class="relative group code-block">
    <div v-html="highlightedCode" class="code-container" />

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
.code-block :deep(pre) {
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: hidden;
  font-size: 0.875rem;
  line-height: 1.6;
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
}

/* Light mode: create contrast with white content */
.code-block :deep(pre.shiki.github-light) {
  background-color: #f6f8fa !important;
}

/* Dark mode: ensure dark background is applied */
.code-block :deep(pre.shiki.github-dark) {
  background-color: #24292e !important;
}

.code-block :deep(code) {
  font-family: "Fira Code", "Monaco", "Consolas", monospace;
}

.copy-btn {
  --bl-button-color: var(--bl-color-neutral-light);
  --bl-button-hover-color: var(--bl-color-neutral-lightest);
}
</style>

<style>
/* Dark mode copy button styling */
html.dark .code-block .copy-btn {
  --bl-button-color: var(--bl-color-neutral-light);
  --bl-button-hover-color: var(--bl-color-neutral-full);
}
</style>
