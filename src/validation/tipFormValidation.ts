import { ALPHAREGEX_CODE, REGEX_CODE } from '@utils/constants';
import * as yup from 'yup';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const tipFormSchema = yup
  .object({
    last_name: yup
      .string()
      .required('Enter last name')
      .matches(ALPHAREGEX_CODE, 'Special characters not accepted'),
    first_name: yup
      .string()
      .required('Enter last name')
      .matches(ALPHAREGEX_CODE, 'Special characters not accepted'),

    address: yup.string().required('Enter address'),
    state: yup.string().required('Enter state'),
    lga: yup.string().required('Enter LGA'),
    email: yup
      .string()
      .required()
      .matches(EMAIL_REGEX, 'Please enter a valid email address'),
    phone_number: yup
      .string()
      .required('Enter phone number')
      .matches(REGEX_CODE, 'Special characters and alphabet are not accepted')
      .max(14, 'Phone number must not be greater than 14 characters'),
    employment: yup.string().required('Enter employment'),
    gender: yup.string().required('Enter gender'),
    age: yup
      .string()
      .required('Enter age')
      .matches(REGEX_CODE, 'Special characters not accepted'),
    victim_type: yup.string().required('Enter tip type'),
    victim_name: yup.string().required('Please provide victim name'),
    tip_content: yup.string().required('Enter tip content'),
    police_lga: yup.string().required('select police station lga'),
    police_state: yup.string().required('Select police station state'),
    police_station_name: yup
      .string()
      .required('provide the police station name'),
    police_officer_name: yup
      .string()
      .required('provide the police officer name'),
    police_station_address: yup
      .string()
      .required('Enter police station address'),
    police_number: yup
      .string()
      .required('Enter police phone number')
      .matches(REGEX_CODE, 'Special characters and alphabet are not accepted'),
    otp_number: yup
      .string()
      .required('Enter OTP')
      .min(6, 'OTP code must be atleast 6 characters')
      .max(6, 'OTP code must not be greater than 6 characters')
      .matches(REGEX_CODE, 'Special characters and alphabet are not accepted'),
  })
  .required();
