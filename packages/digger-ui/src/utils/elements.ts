import { isString, isNumber } from 'lodash-es';
import { inBrowser, toNumber } from '@digger/shared';

// example 1rem
export const isRem = (value: unknown): value is string => isString(value) && value.endsWith('rem');

// example 1em
export const isEm = (value: unknown): value is string =>
  isString(value) && value.endsWith('em') && !value.endsWith('rem');

// e.g. 1 || 1px
export const isPx = (value: unknown): value is string | number =>
  (isString(value) && value.endsWith('px')) || isNumber(value);

// e.g. 1%
export const isPercent = (value: unknown): value is string =>
  isString(value) && value.endsWith('%');

// e.g. 1vw
export const isVw = (value: unknown): value is string => isString(value) && value.endsWith('vw');

// e.g. 1vh
export const isVh = (value: unknown): value is string => isString(value) && value.endsWith('vh');

// e.g. 1vmin
export const isVMin = (value: unknown): value is string =>
  isString(value) && value.endsWith('vmin');

// e.g. 1vmax
export const isVMax = (value: unknown): value is string =>
  isString(value) && value.endsWith('vmax');

// e.g. calc(1px + 1px)
export const isCalc = (value: unknown): value is string =>
  isString(value) && value.startsWith('calc(');

// e.g. var(--color-primary)
export const isVar = (value: unknown): value is string =>
  isString(value) && value.startsWith('var(');

// e.g. return 1
export const toPxNum = (value: unknown): number => {
  if (isNumber(value)) {
    return value;
  }

  if (isPx(value)) {
    return +(value as string).replace('px', '');
  }

  if (!inBrowser()) {
    return 0;
  }

  if (isString(value)) {
    return toNumber(value);
  }

  // % and other
  return 0;
};

export const toSizeUnit = (value: unknown) => {
  if (value == null) {
    return undefined;
  }

  if (
    isPercent(value) ||
    isVw(value) ||
    isVh(value) ||
    isEm(value) ||
    isRem(value) ||
    isCalc(value) ||
    isVar(value) ||
    isVMin(value) ||
    isVMax(value)
  ) {
    return value;
  }

  return `${toPxNum(value)}px`;
};

export const multiplySizeUnit = (value: unknown, quantity = 1) => {
  if (value == null) {
    return undefined;
  }

  const legalSize = toSizeUnit(value) as string;

  const unit = legalSize.match(/(vh|%|r?em|px|vw|vmin|vmax)$/)![0];

  return `${parseFloat(legalSize) * quantity}${unit}`;
};
