import {
    inputAmountPostfix,
    inputPhoneKazakhstan,
    inputPhoneUSA,
    inputPricePrefix,
    inputPricePrefixDecimals,
    inputWithPlaceholderCVC,
    inputWithPlaceholderDate,
    inputWithPlaceholderPhone,
    textarea,
} from './components';

function main() {
    inputAmountPostfix();
    inputPhoneKazakhstan();
    inputPhoneUSA();
    inputPricePrefix();
    inputPricePrefixDecimals();
    inputWithPlaceholderCVC();
    inputWithPlaceholderDate();
    inputWithPlaceholderPhone();
    textarea();
}

main();