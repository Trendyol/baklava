import IMask from "imask";

export function inputPricePrefixDecimals() {
  const options = {
    mask: '$num',
    blocks: {
      num: {
        mask: Number,
        scale: 2,
        radix: '.',
      },
    },
  };

  const element = document.getElementById('inputPricePrefixDecimals');
  const input = element?.shadowRoot?.querySelector('input')!;

  IMask(input, options);
}




