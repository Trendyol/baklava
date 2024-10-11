import {Maskito} from "@maskito/core";
import {options} from "./mask";

export function inputWithPrefixByPostprocessor() {
  const element = document.getElementById('inputWithPrefixByPostprocessor');
  const input = element?.shadowRoot?.querySelector('input')!;

  new Maskito(input, options);
}
