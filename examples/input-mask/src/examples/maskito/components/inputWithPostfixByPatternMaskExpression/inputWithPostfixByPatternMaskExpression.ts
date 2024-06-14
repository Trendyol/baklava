import {Maskito} from "@maskito/core";
import {options} from "./mask";

export function inputWithPostfixByPatternMaskExpression() {
  const element = document.getElementById('inputWithPostfixByPatternMaskExpression');
  const input = element?.shadowRoot?.querySelector('input')!;

  new Maskito(input, options);
}
