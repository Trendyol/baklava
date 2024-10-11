import {MaskitoOptions} from "@maskito/core";
import { maskitoWithPlaceholder } from '@maskito/kit';

export const options = {
  ...maskitoWithPlaceholder('xxx'),
  mask: /^\d{0,3}$/,
} as MaskitoOptions;
