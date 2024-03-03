import * as yup from 'yup';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const personalInfoSchema = yup
  .object({
    full_name: yup.string().required('Enter first name'),
    phone_number: yup.string().required('Enter phone number'),
    email: yup
      .string()
      .required('Enter your email')
      .matches(EMAIL_REGEX, 'Please enter a valid email address'),
    gender: yup.string().required('Select your gender'),
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
  })
  .required();
