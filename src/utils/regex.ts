// import { Country } from 'react-phone-number-input';

export const escapeRegExpChar = (text: string) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

// export const formatMoney = (amount: string | number, country?: Country) => {
//   const currency = country ? getCountryCurrency(country).symbol : undefined;

//   const amnt = Number(amount);
//   return `${currency ? `${currency} ` : ''}${toReadableNumber(
//     amnt.toFixed(0),
//   )}`;
// };

export const toReadableNumber = (amount: string | number) => {
  const amnt = String(amount);
  return `${amnt.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')}`;
};

export const isNumberOnly = (value?: number | string): boolean => {
  if (value === undefined) return true;
  return /^\d*\.?\d*$/.test(String(value));
};

export const isMoney = (amount: number | string): boolean => {
  return /^(0|[0-9][0-9]{0,2})(,?\d{3})*(\.\d{1,2})?$/.test(String(amount));
};

export const isEmail = (value: string): boolean => {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value);
};
