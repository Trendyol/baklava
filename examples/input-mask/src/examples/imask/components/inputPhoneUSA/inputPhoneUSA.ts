import IMask from "imask";

export function inputPhoneUSA() {
  const options = {
    mask: '+1 (000) 000-0000',
  };

  const element = document.getElementById('inputPhoneUSA');
  const input = element?.shadowRoot?.querySelector('input')!;

  IMask(input, options);
}


