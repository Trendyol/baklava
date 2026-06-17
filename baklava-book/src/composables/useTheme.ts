import { ref, onMounted, onUnmounted } from "vue";

/**
 * Composable to track the current theme (dark/light mode)
 * Watches for changes to the document's dark class
 */
export function useTheme() {
  const isDark = ref(false);

  function checkDarkMode() {
    isDark.value = document.documentElement.classList.contains("dark");
  }

  let observer: MutationObserver | null = null;

  onMounted(() => {
    // Initial check
    checkDarkMode();

    // Watch for class changes on html element
    observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === "class") {
          checkDarkMode();
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
  });

  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
    }
  });

  return {
    isDark,
  };
}
