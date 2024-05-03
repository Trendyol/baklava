import {Maskito} from "@maskito/core";
import {options} from "./mask";

export function inputWithPrefixByPatternMaskExpression() {
    const element = document.getElementById('inputWithPrefixByPatternMaskExpression');
    const input = element?.shadowRoot?.querySelector('input')!;

    new Maskito(input, options);
}
