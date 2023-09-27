declare module "*.png" {
  const value: string;
  export default value;
}
declare module "*.jpg" {
  const value: string;
  export default value;
}
declare module "*.svg" {
  const content: string;
  export default content;
}
declare module "*.css";

interface HTMLInputElement {
  showPicker: () => void;
}
