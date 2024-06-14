import {
    inputPhoneUSA,
    inputPhoneKazakhstan,
    textarea,
    inputWithPrefixByPatternMaskExpression,
    inputWithPrefixByPostprocessor,
    inputWithPostfixByPatternMaskExpression,
    inputWithPostfixByPostprocessor,
    inputWithPlaceholderCVC,
    inputWithPlaceholderDate,
    inputWithPlaceholderPhone,
} from './components';

function main() {
    inputPhoneUSA();
    inputPhoneKazakhstan();
    textarea();
    inputWithPrefixByPatternMaskExpression();
    inputWithPrefixByPostprocessor();
    inputWithPostfixByPatternMaskExpression();
    inputWithPostfixByPostprocessor();
    inputWithPlaceholderCVC();
    inputWithPlaceholderDate();
    inputWithPlaceholderPhone();
}

main();