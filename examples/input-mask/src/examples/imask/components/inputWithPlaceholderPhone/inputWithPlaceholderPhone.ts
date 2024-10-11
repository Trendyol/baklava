import IMask from "imask";

export function inputWithPlaceholderPhone() {
  const options = {
    mask: '+{1} (num) 000-0000',
    blocks: {
      num: {
        mask: '000',
        placeholderChar: ' ',
      },
    },
    lazy: false,
  };

  const element = document.getElementById('inputWithPlaceholderPhone');
  const input = element?.shadowRoot?.querySelector('input')!;

  IMask(input, options);
}





