import { configureLocalization } from "@lit/localize";
import { allLocales, sourceLocale, targetLocales } from "./generated/locale-codes";

export type LangKey = (typeof allLocales)[number];

const { setLocale } = configureLocalization({
  sourceLocale,
  targetLocales,
  loadLocale: locale => import(`/locales/${locale}.js`),
});

export const init = async () => {
  const html = document.querySelector("html");
  const htmlLang = html?.getAttribute("lang") as LangKey | null;

  if (htmlLang && allLocales.includes(htmlLang)) {
    await setLocale(htmlLang);
  }

  // Add event listener for 'lang' attribute changes
  const langAttributeChangeListener = (mutations: MutationRecord[]) => {
    mutations.forEach(mutation => {
      if (mutation.attributeName === "lang") {
        const newLangValue = html?.getAttribute("lang") as LangKey | null;

        if (newLangValue && allLocales.includes(newLangValue)) {
          setLocale(newLangValue);
        }
      }
    });
  };

  // Check if MutationObserver is supported
  if (typeof MutationObserver !== "undefined") {
    const observer = new MutationObserver(langAttributeChangeListener);

    observer.observe(html as Node, { attributes: true });
  } else {
    // Fallback to DOMAttrModified for older browsers
    html?.addEventListener("DOMAttrModified", e =>
      langAttributeChangeListener([e as unknown as MutationRecord])
    );
  }
};

export default init();
