<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from "vue";
import { useRoute } from "vue-router";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

const route = useRoute();
const tocItems = ref<TocItem[]>([]);
const activeId = ref<string>("");

// Heading selector for the main content area
const HEADING_SELECTOR = "#main-content h1, #main-content h2, #main-content h3";

// Extract headings from the DOM
function extractHeadings() {
  const headings = document.querySelectorAll(HEADING_SELECTOR);
  const items: TocItem[] = [];

  headings.forEach((heading) => {
    const element = heading as HTMLElement;
    // Generate ID if not present
    if (!element.id) {
      const text = element.textContent || "";
      element.id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    items.push({
      id: element.id,
      text: element.textContent || "",
      level: parseInt(element.tagName.charAt(1), 10),
    });
  });

  tocItems.value = items;
}

// Scroll spy using Intersection Observer
let observer: IntersectionObserver | null = null;

function setupScrollSpy() {
  // Disconnect existing observer
  if (observer) {
    observer.disconnect();
  }

  const headings = document.querySelectorAll(HEADING_SELECTOR);

  if (headings.length === 0) return;

  // Create observer with rootMargin to trigger earlier
  observer = new IntersectionObserver(
    (entries) => {
      // Find the first visible heading
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);

      if (visibleEntries.length > 0) {
        // Sort by position and take the topmost
        const sorted = visibleEntries.sort((a, b) => {
          const rectA = a.target.getBoundingClientRect();
          const rectB = b.target.getBoundingClientRect();
          return rectA.top - rectB.top;
        });
        activeId.value = sorted[0].target.id;
      }
    },
    {
      rootMargin: "-80px 0px -70% 0px",
      threshold: 0,
    }
  );

  headings.forEach((heading) => {
    observer?.observe(heading);
  });
}

// Scroll to heading on click
function scrollToHeading(id: string) {
  const element = document.getElementById(id);
  if (element) {
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    // Update URL hash without scrolling
    history.replaceState(null, "", `#${id}`);
    activeId.value = id;
  }
}

// Re-extract headings when route changes
watch(
  () => route.path,
  async () => {
    await nextTick();
    // Small delay to ensure content is rendered
    setTimeout(() => {
      extractHeadings();
      setupScrollSpy();
    }, 100);
  },
  { immediate: true }
);

onMounted(() => {
  // Initial extraction with delay for dynamic content
  setTimeout(() => {
    extractHeadings();
    setupScrollSpy();
  }, 200);
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<template>
  <aside
    v-if="tocItems.length > 0"
    class="hidden xl:block fixed right-0 top-14 bottom-0 w-[17.5rem] overflow-y-auto sidebar-container"
    style="background-color: var(--bl-color-neutral-full);"
    aria-label="Table of contents"
  >
    <nav class="py-6 px-4">
      <div class="border-l border-neutral-lightest dark:border-neutral-darker pl-4">
        <header class="text-sm font-medium text-neutral-darker dark:text-neutral-lighter mb-3">
          On this page
        </header>

        <ul class="space-y-1" role="list">
          <li v-for="item in tocItems" :key="item.id">
            <a
              :href="`#${item.id}`"
              class="block py-1 text-sm leading-relaxed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
              :class="[
                activeId === item.id
                  ? 'text-primary font-medium'
                  : 'text-neutral-dark hover:text-neutral-darker dark:text-neutral-light dark:hover:text-white',
                item.level === 2 ? '' : '',
                item.level === 3 ? 'pl-3' : '',
              ]"
              @click.prevent="scrollToHeading(item.id)"
            >
              {{ item.text }}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </aside>
</template>
