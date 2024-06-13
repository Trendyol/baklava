import { IMask } from 'react-imask';
import { BlInput } from '@trendyol/baklava/dist/baklava-react';
import { useIMaskWithObserver } from '../../hooks';

export default function InputWithPlaceholderCVC() {
  const ref = useIMaskWithObserver({
    mask: IMask.MaskedRange,
    from: 0,
    to: 999,
    maxLength: 3,
    placeholderChar: 'x',
    lazy: false,
  });

  return (
    <BlInput
      ref={ref}
      size="large"
      icon="wallet"
      label="CVC"
      placeholder="xxx"
    />
  );
}
