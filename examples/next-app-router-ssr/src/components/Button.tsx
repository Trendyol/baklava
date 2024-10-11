"use client"; // This is a client-side component

import { BlButton } from "@trendyol/baklava/dist/baklava-react"; // Import the component from the library

// Create a new component that uses the library component
const Button = (props: React.ComponentProps<typeof BlButton>) => (
  <BlButton {...props}>Click me!</BlButton>
);

export default Button;
