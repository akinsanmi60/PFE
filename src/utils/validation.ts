import isEmail from 'validator/lib/isEmail';
import { isMoney, isNumberOnly } from './regex';

export const numbersOnly = (value?: string) => {
  if (!value) return true;
  return isNumberOnly(value);
};

export const isValidPhoneNumber = (value?: string, isOptional?: boolean) => {
  if (!value) return isOptional;
  let phoneNumber = value;
  if (phoneNumber.startsWith('+')) {
    phoneNumber = phoneNumber.substring(1);
  }
  return isNumberOnly(phoneNumber);
};

export const isValidMoney = (value?: string) => {
  if (!value) return true;
  return isMoney(value);
};

export const isValidPercentage = (value?: string) => {
  if (!value) return true;
  const percent = Number(value);
  return !isNaN(percent) && percent >= 0 && percent <= 100;
};

export const isValidEmail = (value?: string) => {
  if (!value) return true;
  return isEmail(value);
};
