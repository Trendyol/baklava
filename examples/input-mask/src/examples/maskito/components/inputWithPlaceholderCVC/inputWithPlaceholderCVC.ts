import {options} from "./mask.ts";
import {Maskito} from "@maskito/core";

export function inputWithPlaceholderCVC() {
  const element = document.getElementById('inputWithPlaceholderCVC');
  const input = element?.shadowRoot?.querySelector('input')!;

  new Maskito(input, options);
}
