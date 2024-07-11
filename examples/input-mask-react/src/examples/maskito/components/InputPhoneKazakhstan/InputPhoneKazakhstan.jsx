import { useMaskito } from '@maskito/react';
import { BlInput } from '@trendyol/baklava/dist/baklava-react';

import options from './mask';
import { elementPredicate } from '../../helpers';

export default function InputPhoneKazakhstan() {
  const maskedInputRef = useMaskito({
    options,
    elementPredicate,
  });

  return (
    <BlInput
      ref={maskedInputRef}
      size="large"
      icon="phone"
      label="Phone Number"
      placeholder="Enter phone number"
      name="phone-kazakhstan"
      labelFixed
    />
  );
}
