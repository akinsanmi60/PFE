import { EMAIL_REGEX } from '@utils/constants';
import * as yup from 'yup';

export const StartEmailVerificationSchema = yup
  .object({
    old_email: yup
      .string()
      .required('Enter your email')
      .matches(EMAIL_REGEX, 'Please enter a valid email address'),
    new_email: yup
      .string()
      .required('Enter your email')
      .matches(EMAIL_REGEX, 'Please enter a valid email address'),
    password: yup.string().required('Enter your password'),
  })
  .required();

export const completeEmailVerificationSchema = yup
  .object({
    new_email: yup
      .string()
      .required('Enter your email')
      .matches(EMAIL_REGEX, 'Please enter a valid email address'),
    code: yup.string().required('Enter OTP code'),
  })
  .required();
