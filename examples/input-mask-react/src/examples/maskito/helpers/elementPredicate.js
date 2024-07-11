export const elementPredicate = (host) =>
  new Promise((resolve) => {
    const observer = new MutationObserver((mutationsList, observer) => {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
          const input = host.shadowRoot.querySelector('input,textarea');

          if (input) {
            observer.disconnect();
            resolve(input);
            break;
          }
        }
      }
    });

    observer.observe(host.shadowRoot, { childList: true, subtree: true });
  });
