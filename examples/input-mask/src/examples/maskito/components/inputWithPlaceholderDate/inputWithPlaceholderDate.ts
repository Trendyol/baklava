import {Maskito} from "@maskito/core";
import {options} from './mask';

export function inputWithPlaceholderDate() {
  const element = document.getElementById('inputWithPlaceholderDate');
  const input = element?.shadowRoot?.querySelector('input')!;

  new Maskito(input, options);
}
