<template>
  <div>
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

      <br />

      <h3>Price Input with $ Prefix And Decimals:</h3>
      <br />
      <InputPricePrefixDecimals />

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
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import InputPhoneUSA from './components/InputPhoneUSA/InputPhoneUSA.vue';
import InputPhoneKazakhstan from './components/InputPhoneKazakhstan/InputPhoneKazakhstan.vue';
import TextArea from './components/TextArea/TextArea.vue';
import InputPricePrefix from './components/InputPricePrefix/InputPricePrefix.vue';
import InputAmountPostfix from './components/InputAmountPostfix/InputAmountPostfix.vue';
import InputPricePrefixDecimals from './components/InputPricePrefixDecimals/InputPricePrefixDecimals.vue';
import InputWithPlaceholderCVC from './components/InputWithPlaceholderCVC/InputWithPlaceholderCVC.vue';
import InputWithPlaceholderPhone from './components/InputWithPlaceholderPhone/InputWithPlaceholderPhone.vue';
import InputWithPlaceholderDate from './components/InputWithPlaceholderDate/InputWithPlaceholderDate.vue';

export default defineComponent({
  name: 'IMask',
  components: {
    InputPhoneUSA,
    InputPhoneKazakhstan,
    TextArea,
    InputPricePrefix,
    InputAmountPostfix,
    InputPricePrefixDecimals,
    InputWithPlaceholderCVC,
    InputWithPlaceholderPhone,
    InputWithPlaceholderDate,
  },
});
</script>
