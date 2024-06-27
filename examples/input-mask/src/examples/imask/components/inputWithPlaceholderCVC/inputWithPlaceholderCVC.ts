import IMask from "imask";

export function inputWithPlaceholderCVC() {
  const options = {
    mask: IMask.MaskedRange,
    from: 0,
    to: 999,
    maxLength: 3,
    placeholderChar: 'x',
    lazy: false,
  };

  const element = document.getElementById('inputWithPlaceholderCVC');
  const input = element?.shadowRoot?.querySelector('input')!;

  IMask(input, options);
}





