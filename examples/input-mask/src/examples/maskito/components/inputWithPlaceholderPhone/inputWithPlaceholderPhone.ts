import {Maskito} from "@maskito/core";
import {options} from "./mask";

export function inputWithPlaceholderPhone() {
    const element = document.getElementById('inputWithPlaceholderPhone');
    const input = element?.shadowRoot?.querySelector('input')!;

    new Maskito(input, options);
}
