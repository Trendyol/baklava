<script setup lang="ts">
import { ref, inject, computed } from "vue";
import CodeBlock from "./CodeBlock.vue";

const props = defineProps<{
  title: string;
  code: string;
}>();

const showCode = ref(false);

// Framework seçimini parent'tan al
const framework = inject<{ value: "vue" | "react" | "nextjs" }>("framework", { value: "vue" });

// Vue kodunu React/Next.js formatına dönüştür
function convertToReact(vueCode: string): string {
  let code = vueCode;
  
  // bl-element'leri BlElement'e dönüştür (PascalCase)
  code = code.replace(/<bl-([a-z-]+)/g, (_, name) => {
    const pascalName = "Bl" + name.split("-").map((s: string) => s.charAt(0).toUpperCase() + s.slice(1)).join("");
    return `<${pascalName}`;
  });
  
  // Kapanış tag'lerini dönüştür
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
  
  // v-model → value + onChange (basit dönüşüm)
  code = code.replace(/v-model="([^"]+)"/g, 'value={$1}');
  
  // :prop="value" → prop={value}
  code = code.replace(/:([a-z-]+)="([^"]+)"/g, '$1={$2}');
  
  return code;
}

// Aktif framework'e göre kodu dönüştür
const displayCode = computed(() => {
  if (framework.value === "vue") {
    return props.code;
  }
  return convertToReact(props.code);
});

const codeLanguage = computed(() => {
  return framework.value === "vue" ? "html" : "tsx";
});
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
      <CodeBlock :key="framework.value" :code="displayCode" :language="codeLanguage" />
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
