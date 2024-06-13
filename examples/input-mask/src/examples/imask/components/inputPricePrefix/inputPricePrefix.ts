import IMask from "imask";

export function inputPricePrefix() {
  const options = {
    mask: '$num',
    blocks: {
      num: {
        mask: Number,
      },
    },
  };

  const element = document.getElementById('inputPricePrefix');
  const input = element?.shadowRoot?.querySelector('input')!;

  IMask(input, options);
}



