import { allLocales } from "../generated/locale-codes";

type LangKey = "tr" | "en";

export const getLocaleFromHtml = (): LangKey => {
  const html = document.querySelector("html");
  const htmlLang = html?.getAttribute("lang") as LangKey;

  if (htmlLang && allLocales.includes(htmlLang)) {
    return htmlLang as "tr" | "en";
  }

  return "en";
};
