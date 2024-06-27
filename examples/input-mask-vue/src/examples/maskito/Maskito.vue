<template>
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
    <br />
  </main>
</template>

<script>
import InputPhoneUSA from './components/InputPhoneUSA/InputPhoneUSA.vue';
import InputPhoneKazakhstan from './components/InputPhoneKazakhstan/InputPhoneKazakhstan.vue';
import TextArea from './components/TextArea/TextArea.vue';
import InputWithPrefixByPatternMaskExpression from './components/InputWithPrefixByPatternMaskExpression/InputWithPrefixByPatternMaskExpression.vue';
import InputWithPrefixByPostprocessor from './components/InputWithPrefixByPostprocessor/InputWithPrefixByPostprocessor.vue';
import InputWithPostfixByPatternMaskExpression from './components/InputWithPostfixByPatternMaskExpression/InputWithPostfixByPatternMaskExpression.vue';
import InputWithPostfixByPostProcessor from './components/InputWithPostfixByPostProcessor/InputWithPostfixByPostProcessor.vue';
import InputWithPlaceholderCVC from './components/InputWithPlaceholderCVC/InputWithPlaceholderCVC.vue';
import InputWithPlaceholderPhone from './components/InputWithPlaceholderPhone/InputWithPlaceholderPhone.vue';
import InputWithPlaceholderDate from './components/InputWithPlaceholderDate/InputWithPlaceholderDate.vue';

export default {
  name: 'Maskito',
  components: {
    InputPhoneUSA,
    InputPhoneKazakhstan,
    TextArea,
    InputWithPrefixByPatternMaskExpression,
    InputWithPrefixByPostprocessor,
    InputWithPostfixByPatternMaskExpression,
    InputWithPostfixByPostProcessor,
    InputWithPlaceholderCVC,
    InputWithPlaceholderPhone,
    InputWithPlaceholderDate
  },
};
</script>
