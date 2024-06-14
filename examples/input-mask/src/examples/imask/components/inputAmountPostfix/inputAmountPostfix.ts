import IMask from "imask";

export function inputAmountPostfix() {
  const options = {
    mask: 'num%',
    lazy: false,
    blocks: {
      num: {
        mask: Number,
      },
    },
  };

  const element = document.getElementById('inputAmountPostfix');
  const input = element?.shadowRoot?.querySelector('input')!;

  IMask(input, options);
}
