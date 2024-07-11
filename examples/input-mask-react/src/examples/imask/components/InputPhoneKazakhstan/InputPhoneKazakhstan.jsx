import { BlInput } from '@trendyol/baklava/dist/baklava-react';
import { useIMaskWithObserver } from '../../hooks';

export default function InputPhoneKazakhstan() {
  const ref = useIMaskWithObserver({
    mask: '+7 (000) 000-00-00',
  });

  return (
    <BlInput
      ref={ref}
      size="large"
      icon="phone"
      label="Phone Number"
      placeholder="Enter phone number"
      name="phone-kazakhstan"
      labelFixed
    />
  );
}
