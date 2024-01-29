import { LocaleModule, configureLocalization } from "@lit/localize";
import { sourceLocale, targetLocales } from "./generated/locale-codes";
import * as templates_TR from "./generated/locales/tr-TR";

const localizedTemplates = new Map([["tr-TR", templates_TR]]);

export const { getLocale, setLocale } = configureLocalization({
  sourceLocale,
  targetLocales,
  loadLocale: async (locale: string) => localizedTemplates.get(locale) as LocaleModule,
});
