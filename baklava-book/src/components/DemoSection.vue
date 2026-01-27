<script setup lang="ts">
import { ref, inject, computed, isRef, type Ref } from "vue";
import CodeBlock from "./CodeBlock.vue";

const props = defineProps<{
  title?: string;
  code: string;
  language?: string;
}>();

const showCode = ref(false);

// Get framework selection from parent (properly typed as Ref)
const defaultFramework = ref<"vue" | "react" | "nextjs">("vue");
const injectedFramework = inject<Ref<"vue" | "react" | "nextjs">>("framework", defaultFramework);

// Safely get the current framework value (handles both Ref and plain value)
const currentFramework = computed(() => {
  if (isRef(injectedFramework)) {
    return injectedFramework.value;
  }
  return injectedFramework as "vue" | "react" | "nextjs";
});

// Convert Vue code to React/Next.js format
function convertToReact(vueCode: string): string {
  let code = vueCode;
  
  // Convert bl-element to BlElement (PascalCase)
  code = code.replace(/<bl-([a-z-]+)/g, (_, name) => {
    const pascalName = "Bl" + name.split("-").map((s: string) => s.charAt(0).toUpperCase() + s.slice(1)).join("");
    return `<${pascalName}`;
  });
  
  // Convert closing tags
  code = code.replace(/<\/bl-([a-z-]+)>/g, (_, name) => {
    const pascalName = "Bl" + name.split("-").map((s: string) => s.charAt(0).toUpperCase() + s.slice(1)).join("");
    return `</${pascalName}>`;
  });
  
  // @bl-event → onBlEvent
  code = code.replace(/@bl-([a-z]+)="([^"]+)"/g, (_, event, handler) => {
    const eventName = "onBl" + event.charAt(0).toUpperCase() + event.slice(1);
    return `${eventName}={${handler}}`;
  });
  
  // @click → onClick
  code = code.replace(/@click="([^"]+)"/g, 'onClick={$1}');
  
  // v-model → value + onChange (simple conversion)
  code = code.replace(/v-model="([^"]+)"/g, 'value={$1}');
  
  // :prop="value" → prop={value}
  code = code.replace(/:([a-z-]+)="([^"]+)"/g, '$1={$2}');
  
  return code;
}

// Transform code based on active framework
const displayCode = computed(() => {
  if (currentFramework.value === "vue") {
    return props.code;
  }
  return convertToReact(props.code);
});

const codeLanguage = computed(() => {
  // Use provided language if specified
  if (props.language) {
    return props.language;
  }
  return currentFramework.value === "vue" ? "html" : "tsx";
});
</script>

<template>
  <div class="demo-section">
    <!-- Demo Content Area -->
    <div class="demo-content">
      <slot />
    </div>

    <!-- Toggle Footer -->
    <div class="demo-footer" :class="{ 'demo-footer--expanded': showCode }">
      <button
        class="toggle-btn"
        @click="showCode = !showCode"
      >
        <bl-icon :name="showCode ? 'arrow_up' : 'code'" class="toggle-icon" />
        <span>{{ showCode ? "Hide code" : "Show code" }}</span>
      </button>
    </div>

    <!-- Code Block (expandable) -->
    <div v-if="showCode" class="demo-code">
      <CodeBlock :code="displayCode" :language="codeLanguage" />
    </div>
  </div>
</template>

<style scoped>
.demo-section {
  margin-bottom: 1.5rem;
  border-radius: 0.75rem;
  overflow: hidden;
  border: 1px solid var(--bl-color-neutral-lightest);
  background: var(--bl-color-neutral-full);
}

.demo-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 100px;
}

/* Full width for block-level Baklava components */
.demo-content :deep(bl-alert),
.demo-content :deep(bl-drawer),
.demo-content :deep(bl-dialog),
.demo-content :deep(bl-table),
.demo-content :deep(bl-accordion-group) {
  width: 100%;
}

.demo-footer {
  display: flex;
  justify-content: flex-end;
  padding: 0.75rem 1.25rem;
  border-top: 1px solid var(--bl-color-neutral-lightest);
  background: var(--bl-color-neutral-full);
}

.demo-footer--expanded {
  border-bottom: 1px solid var(--bl-color-neutral-lightest);
}

.toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--bl-color-primary);
  background: transparent;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: opacity 0.15s ease;
}

.toggle-btn:hover {
  opacity: 0.8;
}

.toggle-btn:focus-visible {
  outline: 2px solid var(--bl-color-primary);
  outline-offset: 2px;
}

.toggle-icon {
  font-size: 1rem;
}

.demo-code :deep(.code-block) {
  border-radius: 0;
}

.demo-code :deep(pre) {
  border-radius: 0;
  margin: 0;
}

.demo-code :deep(.copy-btn) {
  top: 0.75rem;
  right: 0.75rem;
}
</style>
