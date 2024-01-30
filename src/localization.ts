import { LocaleModule, configureLocalization } from "@lit/localize";
import { sourceLocale, targetLocales, allLocales } from "./generated/locale-codes";
import * as templatesTR from "./generated/locales/tr";

type LangKey = "tr" | "en";

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
};

export default init();
