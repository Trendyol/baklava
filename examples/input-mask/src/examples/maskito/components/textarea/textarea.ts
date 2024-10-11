import {Maskito} from "@maskito/core";
import {options} from "./mask.ts";

export function textarea() {
    const element = document.getElementById('textarea');
    const textarea = element?.shadowRoot?.querySelector('textarea')!;

    new Maskito(textarea, options);
}