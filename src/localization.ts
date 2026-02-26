import { configureLocalization } from "@lit/localize";
import { allLocales, sourceLocale, targetLocales } from "./generated/locale-codes";
import * as ar from "./generated/locales/ar";
import * as ro from "./generated/locales/ro";
import * as tr from "./generated/locales/tr";

export type LangKey = (typeof allLocales)[number];

const localeModules = { ar, ro, tr };

export const { getLocale, setLocale } = configureLocalization({
  sourceLocale,
  targetLocales,
  loadLocale: locale => Promise.resolve(localeModules[locale as keyof typeof localeModules]),
});

const isServer = typeof document === "undefined";

export const init = async () => {
  if (isServer) return;

  const html = document.querySelector("html");
  const htmlLang = html?.getAttribute("lang") as LangKey | null;

  if (htmlLang && allLocales.includes(htmlLang)) {
    await setLocale(htmlLang);
  }

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

  if (typeof MutationObserver !== "undefined") {
    const observer = new MutationObserver(langAttributeChangeListener);

    observer.observe(html as Node, { attributes: true });
  } else {
    html?.addEventListener("DOMAttrModified", e =>
      langAttributeChangeListener([e as unknown as MutationRecord])
    );
  }
};

export default init();
