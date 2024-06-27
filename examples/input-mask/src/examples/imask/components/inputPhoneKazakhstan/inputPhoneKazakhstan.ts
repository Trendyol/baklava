import IMask from "imask";

export function inputPhoneKazakhstan() {
  const options = {
    mask: '+7 (000) 000-00-00',
  };

  const element = document.getElementById('inputPhoneKazakhstan');
  const input = element?.shadowRoot?.querySelector('input')!;

  IMask(input, options);
}

