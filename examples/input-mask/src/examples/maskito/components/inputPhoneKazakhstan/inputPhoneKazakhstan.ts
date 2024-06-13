import {Maskito} from '@maskito/core';
import {options} from './mask';

export function inputPhoneKazakhstan() {
    const element = document.getElementById('inputPhoneKazakhstan');
    const input = element?.shadowRoot?.querySelector('input')!;

    new Maskito(input, options);
}