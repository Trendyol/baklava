import { BlTextarea } from '@trendyol/baklava/dist/baklava-react';
import { useIMaskWithObserver } from '../../hooks';

export default function TextArea() {
  const ref = useIMaskWithObserver({
    mask: /^[a-z1-9\s.,/]+$/i,
  });

  return (
    <BlTextarea
      ref={ref}
      size="large"
      name="textarea"
      label="Address"
      placeholder="Enter your address"
      spellCheck
    />
  );
}
