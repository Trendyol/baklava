import { useMaskito } from '@maskito/react';
import { BlTextarea } from '@trendyol/baklava/dist/baklava-react';

import options from './mask';
import { elementPredicate } from '../../helpers';

export default function TextArea() {
  const maskedInputRef = useMaskito({
    options,
    elementPredicate,
  });

  return (
    <BlTextarea
      ref={maskedInputRef}
      size="large"
      name="textarea"
      label="Address"
      placeholder="Enter your address"
      spellCheck
    />
  );
}
