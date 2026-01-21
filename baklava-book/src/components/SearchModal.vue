<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { components, categories as componentCategories } from "@/data/components";
import { docCategories } from "@/data/docs";

const emit = defineEmits<{
  close: [];
}>();

const router = useRouter();
const searchQuery = ref("");
const selectedIndex = ref(0);
const inputRef = ref<HTMLInputElement>();

// Tüm aranabilir öğeleri oluştur
const allItems = computed(() => {
  const items: Array<{
    type: "component" | "doc";
    name: string;
    description?: string;
    slug: string;
    category: string;
    icon?: string;
  }> = [];

  // Components
  components.forEach((comp) => {
    const cat = componentCategories.find((c) => c.id === comp.category);
    items.push({
      type: "component",
      name: comp.name,
      description: comp.description,
      slug: comp.slug,
      category: cat?.label || comp.category,
      icon: cat?.icon || "🧩",
    });
  });

  // Docs
  docCategories.forEach((cat) => {
    cat.items.forEach((doc) => {
      items.push({
        type: "doc",
        name: doc.name,
        slug: doc.slug,
        category: cat.label,
        icon: cat.icon,
      });
    });
  });

  return items;
});

// Filtrelenmiş sonuçlar
const filteredItems = computed(() => {
  if (!searchQuery.value.trim()) {
    // Boş arama - popüler öğeleri göster
    return allItems.value.slice(0, 10);
  }

  const query = searchQuery.value.toLowerCase();
  return allItems.value
    .filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    )
    .slice(0, 15);
});

// Seçili öğeye git
function goToItem(item: (typeof allItems.value)[0]) {
  if (item.type === "component") {
    router.push(`/components/${item.slug}`);
  } else {
    router.push(`/docs/${item.slug}`);
  }
  emit("close");
}

// Klavye navigasyonu
function handleKeydown(e: KeyboardEvent) {
  if (e.key === "ArrowDown") {
    e.preventDefault();
    selectedIndex.value = Math.min(selectedIndex.value + 1, filteredItems.value.length - 1);
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    selectedIndex.value = Math.max(selectedIndex.value - 1, 0);
  } else if (e.key === "Enter") {
    e.preventDefault();
    if (filteredItems.value[selectedIndex.value]) {
      goToItem(filteredItems.value[selectedIndex.value]);
    }
  } else if (e.key === "Escape") {
    emit("close");
  }
}

// Arama değişince seçimi sıfırla
watch(searchQuery, () => {
  selectedIndex.value = 0;
});

// Modal açılınca input'a odaklan
onMounted(() => {
  inputRef.value?.focus();
  document.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm" @click="emit('close')" />

    <!-- Modal -->
    <div
      class="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-xl bg-white dark:bg-neutral-darkest rounded-2xl shadow-2xl z-[101] overflow-hidden border border-neutral-lighter dark:border-neutral-darker"
    >
      <!-- Search Input -->
      <div class="flex items-center gap-3 p-4 border-b border-neutral-lighter dark:border-neutral-darker">
        <bl-icon name="search" class="text-neutral-dark text-xl" />
        <input
          ref="inputRef"
          v-model="searchQuery"
          type="text"
          placeholder="Search components, docs..."
          class="flex-1 bg-transparent text-lg text-neutral-darkest dark:text-white placeholder-neutral-dark outline-none"
        />
        <kbd
          class="hidden sm:flex items-center gap-1 px-2 py-1 text-xs text-neutral-dark bg-neutral-lightest dark:bg-neutral-darker rounded"
        >
          ESC
        </kbd>
      </div>

      <!-- Results -->
      <div class="max-h-[400px] overflow-y-auto">
        <div v-if="filteredItems.length === 0" class="p-8 text-center text-neutral-dark">
          <bl-icon name="search" class="text-4xl mb-2 opacity-50" />
          <p>No results found for "{{ searchQuery }}"</p>
        </div>

        <div v-else class="py-2">
          <div
            v-for="(item, index) in filteredItems"
            :key="`${item.type}-${item.slug}`"
            class="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors"
            :class="{
              'bg-primary/10': index === selectedIndex,
              'hover:bg-neutral-lightest dark:hover:bg-neutral-darker': index !== selectedIndex,
            }"
            @click="goToItem(item)"
            @mouseenter="selectedIndex = index"
          >
            <!-- Icon -->
            <div
              class="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
              :class="{
                'bg-primary/10 text-primary': item.type === 'component',
                'bg-neutral-lighter dark:bg-neutral-dark': item.type === 'doc',
              }"
            >
              {{ item.icon }}
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <span class="font-medium text-neutral-darkest dark:text-white">
                  {{ item.name }}
                </span>
                <span
                  class="text-xs px-1.5 py-0.5 rounded"
                  :class="{
                    'bg-primary/10 text-primary': item.type === 'component',
                    'bg-neutral-lighter dark:bg-neutral-dark text-neutral-dark dark:text-neutral-light':
                      item.type === 'doc',
                  }"
                >
                  {{ item.type === "component" ? "Component" : "Doc" }}
                </span>
              </div>
              <p
                v-if="item.description"
                class="text-sm text-neutral-dark truncate"
              >
                {{ item.description }}
              </p>
              <p v-else class="text-sm text-neutral-dark">{{ item.category }}</p>
            </div>

            <!-- Arrow -->
            <bl-icon name="arrow_right" class="text-neutral-light" />
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div
        class="flex items-center justify-between px-4 py-3 text-xs text-neutral-dark border-t border-neutral-lighter dark:border-neutral-darker bg-neutral-lightest/50 dark:bg-neutral-darker/50"
      >
        <div class="flex items-center gap-4">
          <span class="flex items-center gap-1">
            <kbd class="px-1.5 py-0.5 bg-white dark:bg-neutral-dark rounded border border-neutral-lighter dark:border-neutral-dark">↑</kbd>
            <kbd class="px-1.5 py-0.5 bg-white dark:bg-neutral-dark rounded border border-neutral-lighter dark:border-neutral-dark">↓</kbd>
            to navigate
          </span>
          <span class="flex items-center gap-1">
            <kbd class="px-1.5 py-0.5 bg-white dark:bg-neutral-dark rounded border border-neutral-lighter dark:border-neutral-dark">↵</kbd>
            to select
          </span>
        </div>
        <span>{{ filteredItems.length }} results</span>
      </div>
    </div>
  </Teleport>
</template>
