import { fullNameRegex, REGEX_CODE } from '@utils/constants';
import * as yup from 'yup';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const personalInfoSchema = yup
  .object({
    full_name: yup
      .string()
      .required('Enter first name')
      .matches(fullNameRegex, 'Please enter a valid full name'),
    phone_number: yup
      .string()
      .required('Enter phone number')
      .matches(REGEX_CODE, 'Please enter a valid phone number')
      .min(11, 'Phone number must be 11 characters')
      .max(11, 'Phone number must be 11 characters'),
    email: yup
      .string()
      .required('Enter your email')
      .matches(EMAIL_REGEX, 'Please enter a valid email address'),
    gender: yup.string().required('Select your gender'),
    user_type: yup.string().required('Select your user type'),
  })
  .required();

export const exporterInfoSchema = yup
  .object({
    coy_name: yup.string().required('Enter first name'),
    phone_number: yup
      .string()
      .required('Enter phone number')
      .matches(REGEX_CODE, 'Please enter a valid phone number')
      .min(11, 'Phone number must be 11 characters')
      .max(11, 'Phone number must be 11 characters'),
    email: yup
      .string()
      .required('Enter your email')
      .matches(EMAIL_REGEX, 'Please enter a valid email address'),
    reg_number: yup.string().required('PLease enter your registration number'),
    user_type: yup.string().required('Select your user type'),
  })
  .required();

export const agencySechma = yup
  .object({
    agency_state: yup.string().required('Please select agency state'),
    agency_lga: yup.string().required('Please select agency lga'),
    agency_name: yup.string().required('Please enter agency name'),
  })
  .required();

export const createPasswordSchema = yup
  .object({
    password: yup.string().required('Enter your password'),
    confirm_password: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Enter your password'),
    terms_condition: yup.string().required('Please accept terms & conditions'),
  })
  .required();
