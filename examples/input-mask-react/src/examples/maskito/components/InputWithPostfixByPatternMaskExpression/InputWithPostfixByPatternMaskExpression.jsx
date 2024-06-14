import { useMaskito } from '@maskito/react';
import { BlInput } from '@trendyol/baklava/dist/baklava-react';

import options from './mask';
import { elementPredicate } from '../../helpers';

export default function InputWithPostfixByPatternMaskExpression() {
  const maskedInputRef = useMaskito({
    options,
    elementPredicate,
  });

  return (
    <BlInput
      ref={maskedInputRef}
      size="large"
      name="amount"
      label="Amount"
      placeholder="Enter amount"
      helpText="example: 99%"
      labelFixed
    />
  );
}
