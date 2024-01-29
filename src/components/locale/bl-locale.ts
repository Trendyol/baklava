import { LitElement, TemplateResult, html } from "lit";
import { customElement } from "lit/decorators.js";
import { allLocales } from "../../generated/locale-codes";
import { getLocale, setLocale } from "../../localization";
import "../select/bl-select";
import { ISelectOption } from "../select/bl-select";

const localeNames = {
  en: "English",
  "tr-TR": "Türkçe",
};

// Note we use updateWhenLocaleChanges here so that we're always up to date with
// the active locale (the result of getLocale()) when the locale changes via a
// history navigation.
@customElement("bl-locale")
export default class BlLocale extends LitElement {
  render(): TemplateResult {
    return html`
      <bl-select @bl-select=${this.localeChanged}>
        ${allLocales.map(
          locale =>
            html`<bl-select-option .value=${locale} ?selected=${locale === getLocale()}>
              ${localeNames[locale]}
            </bl-select-option>`
        )}
      </bl-select>
    `;
  }

  async localeChanged(event: CustomEvent<ISelectOption>) {
    await setLocale(event.detail.value);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "bl-locale": BlLocale;
  }
}
