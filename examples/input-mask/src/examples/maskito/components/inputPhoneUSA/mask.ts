import {MaskitoOptions} from "@maskito/core";

export const options = {
    mask: [
        '+',
        '1',
        ' ',
        '(',
        /\d/,
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
    ],
} as MaskitoOptions;