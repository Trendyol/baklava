import { useRef, useEffect } from 'react';
import { IMask } from 'react-imask';

export function useIMaskWithObserver(maskOptions) {
  const ref = useRef(null);
  const maskInstanceRef = useRef(null);

  useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
          const input = ref.current.shadowRoot.querySelector('input, textarea');

          if (input) {
            observer.disconnect();

            maskInstanceRef.current = IMask(input, maskOptions);

            break;
          }
        }
      }
    });

    if (ref.current) {
      observer.observe(ref.current.shadowRoot, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      observer.disconnect();

      if (maskInstanceRef.current) {
        maskInstanceRef.current.destroy();

        maskInstanceRef.current = null;
      }
    };
  }, [maskOptions]);

  return ref;
}
