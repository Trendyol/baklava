import { LocaleModule, configureLocalization } from "@lit/localize";
import { sourceLocale, targetLocales, allLocales } from "./generated/locale-codes";
import * as templatesTR from "./generated/locales/tr";

export type LangKey = "tr" | "en";

const localizedTemplates = new Map<string, LocaleModule>([["tr", templatesTR]]);

const { setLocale } = configureLocalization({
  sourceLocale,
  targetLocales,
  loadLocale: async (locale: string) => localizedTemplates.get(locale) as LocaleModule,
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
