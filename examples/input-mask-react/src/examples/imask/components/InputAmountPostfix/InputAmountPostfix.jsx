import { BlInput } from '@trendyol/baklava/dist/baklava-react';
import { useIMaskWithObserver } from '../../hooks';

const InputAmountPostfix = () => {
  const ref = useIMaskWithObserver({
    mask: 'num%',
    lazy: false,
    blocks: {
      num: {
        mask: Number,
      },
    },
  });

  return (
    <BlInput
      ref={ref}
      size="large"
      name="amount"
      label="Amount"
      placeholder="Enter amount"
      helpText="example: 99%"
      labelFixed
    />
  );
};

export default InputAmountPostfix;
