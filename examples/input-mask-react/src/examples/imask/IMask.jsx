import { Suspense } from 'react';
import InputPhoneUSA from './components/InputPhoneUSA/InputPhoneUSA';
import InputPhoneKazakhstan from './components/InputPhoneKazakhstan/InputPhoneKazakhstan';
import TextArea from './components/TextArea/TextArea';
import InputPricePrefix from './components/InputPricePrefix/InputPricePrefix';
import InputAmountPostfix from './components/InputAmountPostfix/InputAmountPostfix';
import InputPricePrefixDecimals from './components/InputPricePrefixDecimals/InputPricePrefixDecimals';
import InputWithPlaceholderCVC from './components/InputWithPlaceholderCVC/InputWithPlaceholderCVC';
import InputWithPlaceholderPhone from './components/InputWithPlaceholderPhone/InputWithPlaceholderPhone';
import InputWithPlaceholderDate from './components/InputWithPlaceholderDate/InputWithPlaceholderDate';

export default function IMask() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <main>
        <h1>Masked Inputs with Baklava & IMask</h1>

        <h3>Phone - USA:</h3>
        <br />
        <InputPhoneUSA />

        <br />

        <h3>Phone - Kazakhstan:</h3>
        <br />
        <InputPhoneKazakhstan />

        <br />

        <h3>Text Area:</h3>
        <br />
        <TextArea />

        <br />

        <h3>Price Input with $ Prefix:</h3>
        <br />
        <InputPricePrefix />

        <br />

        <h3>Amount Input with % Postfix:</h3>
        <br />
        <InputAmountPostfix />

        <h3>Price Input with $ Prefix And Decimals:</h3>
        <br />
        <InputPricePrefixDecimals />

        <br />

        <h3>Input CVC:</h3>
        <br />
        <InputWithPlaceholderCVC />

        <h3>Input Phone:</h3>
        <br />
        <InputWithPlaceholderPhone />

        <h3>Input Date:</h3>
        <br />
        <InputWithPlaceholderDate />
      </main>
    </Suspense>
  );
}
