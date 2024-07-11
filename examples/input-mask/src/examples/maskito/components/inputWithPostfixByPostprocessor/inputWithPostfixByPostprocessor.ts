import {Maskito} from "@maskito/core";
import {options} from "./mask.ts";

export function inputWithPostfixByPostprocessor() {
    const element = document.getElementById('inputWithPostfixByPostprocessor');
    const input = element?.shadowRoot?.querySelector('input')!;

    new Maskito(input, options);
}
