import { IMask } from 'react-imask';
import { BlInput } from '@trendyol/baklava/dist/baklava-react';
import { useIMaskWithObserver } from '../../hooks';

export default function InputWithPlaceholderDate() {
  const ref = useIMaskWithObserver({
    mask: 'd/m/Y',
    lazy: false,
    overwrite: true,
    autofix: true,
    blocks: {
      d: {
        mask: IMask.MaskedRange,
        placeholderChar: 'd',
        from: 1,
        to: 31,
        maxLength: 2,
      },
      m: {
        mask: IMask.MaskedRange,
        placeholderChar: 'm',
        from: 1,
        to: 12,
        maxLength: 2,
      },
      Y: {
        mask: IMask.MaskedRange,
        placeholderChar: 'Y',
        from: 1900,
        to: 2999,
        maxLength: 4,
      },
    },
  });

  return <BlInput ref={ref} size="large" name="date" label="Date" labelFixed />;
}
