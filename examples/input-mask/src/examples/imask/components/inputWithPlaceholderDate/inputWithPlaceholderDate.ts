import IMask from "imask";

export function inputWithPlaceholderDate() {
  const options = {
    mask: 'd/m/Y',
    lazy: false,
    overwrite: true,
    autofix: true,
    blocks: {
      d: {
        mask: IMask.MaskedRange,
        placeholderChar: 'd',
        from: 1,
        to: 31,
        maxLength: 2,
      },
      m: {
        mask: IMask.MaskedRange,
        placeholderChar: 'm',
        from: 1,
        to: 12,
        maxLength: 2,
      },
      Y: {
        mask: IMask.MaskedRange,
        placeholderChar: 'Y',
        from: 1900,
        to: 2999,
        maxLength: 4,
      },
    },
  };

  const element = document.getElementById('inputWithPlaceholderDate');
  const input = element?.shadowRoot?.querySelector('input')!;

  IMask(input, options);
}





