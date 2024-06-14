import { BlInput } from '@trendyol/baklava/dist/baklava-react';
import { useIMaskWithObserver } from '../../hooks';

export default function InputPhoneUSA() {
  const ref = useIMaskWithObserver({
    mask: '+1 (000) 000-0000',
  });

  return (
    <BlInput
      ref={ref}
      size="large"
      icon="phone"
      label="Phone Number"
      placeholder="Enter phone number"
      name="phone-usa"
      autofocus
    />
  );
}
