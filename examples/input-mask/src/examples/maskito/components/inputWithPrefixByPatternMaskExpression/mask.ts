import {MaskitoOptions} from "@maskito/core";

export const options = {
    mask: ({ value }) => {
        const digitsCount = value.replaceAll(/\D/g, '').length;

        return ['$', ...new Array(digitsCount || 1).fill(/\d/)];
    },
} as MaskitoOptions;