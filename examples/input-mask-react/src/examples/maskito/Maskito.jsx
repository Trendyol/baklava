import { Suspense } from 'react';
import InputPhoneUSA from './components/InputPhoneUSA/InputPhoneUSA';
import InputPhoneKazakhstan from './components/InputPhoneKazakhstan/InputPhoneKazakhstan';
import TextArea from './components/TextArea/TextArea';
import InputWithPrefixByPatternMaskExpression from './components/InputWithPrefixByPatternMaskExpression/InputWithPrefixByPatternMaskExpression';
import InputWithPrefixByPostprocessor from './components/InputWithPrefixByPostprocessor/InputWithPrefixByPostprocessor';
import InputWithPostfixByPatternMaskExpression from './components/InputWithPostfixByPatternMaskExpression/InputWithPostfixByPatternMaskExpression';
import InputWithPostfixByPostProcessor from './components/InputWithPostfixByPostProcessor/InputWithPostfixByPostProcessor';
import InputWithPlaceholderCVC from './components/InputWithPlaceholderCVC/InputWithPlaceholderCVC.jsx';
import InputWithPlaceholderPhone from './components/InputWithPlaceholderPhone/InputWithPlaceholderPhone.jsx';
import InputWithPlaceholderDate from './components/InputWithPlaceholderDate/InputWithPlaceholderDate.jsx';

function Maskito() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <main>
        <h1>Masked Inputs with Baklava & Maskito</h1>

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

        <h3>Input with prefix by pattern mask expression:</h3>
        <br />
        <InputWithPrefixByPatternMaskExpression />

        <br />

        <h3>Input with prefix by postprocessor:</h3>
        <br />
        <InputWithPrefixByPostprocessor />

        <br />

        <h3>Input with postfix by pattern mask expression:</h3>
        <br />
        <InputWithPostfixByPatternMaskExpression />

        <br />

        <h3>Input with postfix by postprocessor:</h3>
        <br />
        <InputWithPostfixByPostProcessor />

        <br />

        <h3>Input CVC:</h3>
        <br />
        <InputWithPlaceholderCVC />

        <br />

        <h3>Input Phone:</h3>
        <br />
        <InputWithPlaceholderPhone />

        <br />

        <h3>Input Date:</h3>
        <br />
        <InputWithPlaceholderDate />
      </main>
    </Suspense>
  );
}

export default Maskito;
