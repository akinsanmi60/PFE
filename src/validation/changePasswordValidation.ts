import * as yup from 'yup';
import { EMAIL_REGEX, REGEX_CODE } from '@utils/constants';

export const changePasswordSchema = yup
  .object({
    old_password: yup.string().required('Enter your old password'),
    new_password: yup.string().required('Enter your new password'),
    confirm_password: yup
      .string()
      .oneOf([yup.ref('new_password'), null], 'Passwords must match')
      .required('Enter your new password'),
  })
  .required();

export const verifyPasswordSchema = yup
  .object({
    code: yup
      .string()
      .required('Enter your verification code')
      .matches(REGEX_CODE, 'Special characters and alphabet are not accepted')
      .min(6, 'Verification code must be atleast 6 characters')
      .max(6, 'Verification code must not be greater than 6 characters'),
  })
  .required();

export const forgetPasswordSchema = yup.object({
  email: yup
    .string()
    .required('Enter your email')
    .matches(EMAIL_REGEX, 'Please enter a valid email address'),
});
export const securitySchema = yup.object({
  security_question: yup.string().required('Select security question'),
  security_answer: yup.string().required('Answer security question'),
  password: yup.string().required('Enter your password'),
});
