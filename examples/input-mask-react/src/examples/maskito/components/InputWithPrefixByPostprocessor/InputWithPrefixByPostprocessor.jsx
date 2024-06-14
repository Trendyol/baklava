import { useMaskito } from '@maskito/react';
import { BlInput } from '@trendyol/baklava/dist/baklava-react';

import options from './mask';
import { elementPredicate } from '../../helpers';

export default function InputWithPrefixByPostprocessor() {
  const maskedInputRef = useMaskito({
    options,
    elementPredicate,
  });

  return (
    <BlInput
      ref={maskedInputRef}
      size="large"
      name="price-prefix"
      label="Price"
      placeholder="Enter price"
      icon="money"
    />
  );
}
