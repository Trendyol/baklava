import {Maskito} from "@maskito/core";
import {options} from "./mask";

export function inputPhoneUSA() {
    const element = document.getElementById('inputPhoneUSA');
    const input = element?.shadowRoot?.querySelector('input')!;

    new Maskito(input, options);
}
