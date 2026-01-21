<script setup lang="ts">
import BorderRadiusDemo from "@/components/BorderRadiusDemo.vue";
import ColorPalette from "@/components/ColorPalette.vue";
import IconographyDemo from "@/components/IconographyDemo.vue";
import SizingDemo from "@/components/SizingDemo.vue";
import TypographyDemo from "@/components/TypographyDemo.vue";
import ZIndexDemo from "@/components/ZIndexDemo.vue";
import { docContents } from "@/data/doc-contents";
import { docCategories, getDocBySlug, getDocCategoryBySlug } from "@/data/docs";
import { codeToHtml } from "shiki";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const slug = computed(() => route.params.slug as string);
const doc = computed(() => getDocBySlug(slug.value));
const category = computed(() => getDocCategoryBySlug(slug.value));

const renderedContent = ref("");
const loading = ref(true);

// Shiki ile code highlighting yapan markdown renderer
async function renderMarkdownWithShiki(md: string): Promise<string> {
  // Code block'ları bul ve Shiki ile highlight et
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  const matches = [...md.matchAll(codeBlockRegex)];

  let result = md;

  for (const match of matches) {
    const [fullMatch, lang = "text", code] = match;
    try {
      const highlighted = await codeToHtml(code.trim(), {
        lang: lang || "text",
        theme: "github-dark",
      });
      // Shiki çıktısına custom class ekle
      const styledHighlight = highlighted.replace(
        '<pre class="shiki',
        '<pre class="shiki rounded-lg overflow-x-auto text-sm my-4 p-4'
      );
      result = result.replace(fullMatch, styledHighlight);
    } catch {
      // Dil desteklenmiyorsa basit escape kullan
      const escapedCode = code
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      result = result.replace(
        fullMatch,
        `<pre class="bg-[#24292e] text-[#e1e4e8] p-4 rounded-lg overflow-x-auto text-sm my-4"><code>${escapedCode}</code></pre>`
      );
    }
  }

  // Diğer markdown elementleri
  result = result
    // Headers
    .replace(
      /^### (.*$)/gim,
      '<h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mt-8 mb-3">$1</h3>'
    )
    .replace(
      /^## (.*$)/gim,
      '<h2 class="text-xl font-semibold text-neutral-darkest dark:text-white mt-10 mb-4">$1</h2>'
    )
    .replace(
      /^# (.*$)/gim,
      '<h1 class="text-3xl font-bold text-neutral-darkest dark:text-white mb-6">$1</h1>'
    )
    // Inline code
    .replace(
      /`([^`]+)`/g,
      '<code class="bg-neutral-lightest dark:bg-neutral-darker text-primary px-1.5 py-0.5 rounded text-sm font-mono">$1</code>'
    )
    // Bold
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    // Italic
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    // Links
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-primary hover:underline" target="_blank" rel="noopener">$1</a>'
    )
    // Blockquotes
    .replace(
      /^> (.*$)/gim,
      '<blockquote class="border-l-4 border-primary pl-4 my-4 text-neutral-dark italic">$1</blockquote>'
    )
    // Numbered lists
    .replace(
      /^\d+\. (.*$)/gim,
      '<li class="ml-6 list-decimal text-neutral-darker dark:text-neutral-light">$1</li>'
    )
    // Unordered lists
    .replace(
      /^- (.*$)/gim,
      '<li class="ml-6 list-disc text-neutral-darker dark:text-neutral-light">$1</li>'
    )
    // Tables - header
    .replace(
      /^\| (.+) \|$/gim,
      (match) => {
        const cells = match.slice(1, -1).split("|").map(c => c.trim());
        if (cells.some(c => /^[-:]+$/.test(c))) {
          return ""; // Separator satırını atla
        }
        const tds = cells.map(c =>
          `<td class="border border-neutral-lightest dark:border-neutral-darker px-3 py-2">${c}</td>`
        ).join("");
        return `<tr>${tds}</tr>`;
      }
    )
    // Paragraphs - boş satırları ayır
    .replace(/\n\n+/g, '</p><p class="mb-4 text-neutral-darker dark:text-neutral-light">')
    // Tek satırlık paragraflar
    .replace(
      /^([^<\n].+)$/gim,
      '<p class="mb-4 text-neutral-darker dark:text-neutral-light">$1</p>'
    );

  return result;
}

watch(
  slug,
  async (newSlug) => {
    loading.value = true;

    let markdown = "";
    if (docContents[newSlug]) {
      markdown = docContents[newSlug];
    } else {
      markdown = `# ${doc.value?.name || "Document"}\n\nBu doküman henüz eklenmedi.`;
    }

    renderedContent.value = await renderMarkdownWithShiki(markdown);
    loading.value = false;
  },
  { immediate: true }
);
</script>

<template>
  <div class="flex">
    <!-- Docs Sidebar -->
    <aside
      class="fixed left-0 top-14 bottom-0 w-[260px] bg-white dark:bg-neutral-darkest border-r border-neutral-lightest dark:border-neutral-darker overflow-y-auto"
    >
      <nav class="p-4">
        <div v-for="cat in docCategories" :key="cat.id" class="mb-6">
          <h3
            class="flex items-center gap-2 text-xs font-semibold text-neutral-dark uppercase tracking-wider mb-2 px-2"
          >
            <span>{{ cat.icon }}</span>
            <span>{{ cat.label }}</span>
          </h3>

          <ul class="space-y-0.5">
            <li v-for="item in cat.items" :key="item.slug">
              <router-link
                :to="`/docs/${item.slug}`"
                class="block px-3 py-1.5 rounded-lg text-sm transition-colors"
                :class="[
                  slug === item.slug
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-neutral-darker dark:text-neutral-light hover:bg-neutral-lightest dark:hover:bg-neutral-darker',
                ]"
              >
                {{ item.name }}
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
    </aside>

    <!-- Content -->
    <main class="flex-1 ml-[260px] p-8 max-w-4xl">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-sm text-neutral-dark mb-6">
        <router-link to="/" class="hover:text-primary">Home</router-link>
        <span>/</span>
        <span v-if="category">{{ category.label }}</span>
        <span v-if="category">/</span>
        <span class="text-neutral-darkest dark:text-white">{{ doc?.name }}</span>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex items-center justify-center py-20">
        <bl-spinner size="large"></bl-spinner>
      </div>

      <!-- Special Pages -->
      <template v-else-if="slug === 'colors'">
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

      <!-- Content (Markdown rendered with Shiki) -->
      <article v-else class="prose prose-neutral dark:prose-invert max-w-none">
        <div v-html="renderedContent" />
      </article>
    </main>
  </div>
</template>

<style>
/* Shiki theme overrides */
.shiki {
  background-color: #24292e !important;
}

.shiki code {
  font-family: "Fira Code", "Monaco", "Consolas", monospace;
}
</style>
