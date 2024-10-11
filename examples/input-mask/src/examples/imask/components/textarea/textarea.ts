import IMask from "imask";

export function textarea() {
  const options = {
    mask: /^[a-z1-9\s.,/]+$/i,
  };

  const element = document.getElementById('textarea');
  const input = element?.shadowRoot?.querySelector('textarea')!;

  IMask(input, options);
}





