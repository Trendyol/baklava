import { ref, onMounted, watchEffect } from 'vue';
import { IMask } from 'vue-imask';

export function useIMaskWithObserver(maskOptions) {
  const elRef = ref(null);
  let maskInstance = null;

  onMounted(() => {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          const el = mutation.target.querySelector('input, textarea');

          maskInstance = IMask(el, maskOptions);

          observer.disconnect();

          break;
        }
      }
    });

    watchEffect((onInvalidate) => {
      if (elRef.value) {
        observer.observe(elRef.value.shadowRoot, {
          childList: true,
          subtree: true,
        });

        onInvalidate(() => {
          observer.disconnect();

          if (maskInstance) {
            maskInstance.destroy();

            maskInstance = null;
          }
        });
      }
    });
  });

  return {
    el: elRef,
  };
}
