import { ALPHANUM_REGEX, ALPHAREGEX_CODE } from '@utils/constants';
import * as yup from 'yup';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const accountInfoSchema = yup
  .object({
    email: yup
      .string()
      .required('Enter your email')
      .matches(EMAIL_REGEX, 'Please enter a valid email address'),
    confirm_email: yup
      .string()
      .oneOf([yup.ref('email'), null], 'Emails must match')
      .required('Enter your email')
      .matches(EMAIL_REGEX, 'Please enter a valid email address'),
    password: yup.string().required('Enter your password'),
    confirm_password: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Enter your password'),
    security_question: yup.string().required('Select security question'),
    security_answer: yup.string().required('Answer security question'),
  })
  .required();

export const personalInfoSchema = yup
  .object({
    first_name: yup
      .string()
      .required('Enter first name')
      .matches(ALPHAREGEX_CODE, 'Special characters not accepted'),
    middle_name: yup
      .string()
      .required('Enter middle name')
      .matches(ALPHAREGEX_CODE, 'Special characters not accepted'),
    last_name: yup
      .string()
      .required('Enter last name')
      .matches(ALPHAREGEX_CODE, 'Special characters not accepted'),
    address: yup.string().required('Enter home address'),
    state: yup.string().required('Enter state of residence'),
    area: yup
      .string()
      .required('Enter area of residence')
      .matches(ALPHANUM_REGEX, 'Special characters not accepted'),
    lga: yup.string().required('Enter local goverment'),
    phone_number: yup.string().required('Enter phone number'),
  })
  .required();

export const accountSelectionType = yup
  .object({
    account_type: yup.string().required('Please select account type'),
    professional_Role: yup.string().optional(),
  })
  .required();

export const agencySechma = yup
  .object({
    agency_state: yup.string().required('Please select agency state'),
    agency_lga: yup.string().required('Please select agency lga'),
    agency_name: yup.string().required('Please enter agency name'),
  })
  .required();

export const sponsorSchema = yup.object({
  sponsor_first_name: yup.string().required('Enter sponsor first name'),
  sponsor_last_name: yup.string().required('Enter sponsor last name'),
  sponsor_job_title: yup.string().required('Enter sponsor job title'),
  sponsor_phone_number: yup.string().required('Enter sponsor phone number'),
  sponsor_email: yup.string().required('Enter sponsor email'),
  sponsor_workplace: yup.string().required('Enter sponsor workplace'),
});
