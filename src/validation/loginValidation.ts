import { EMAIL_REGEX } from '@utils/constants';
import * as yup from 'yup';

export const LoginSchema = yup
  .object({
    email: yup
      .string()
      .required('Enter your email')
      .matches(EMAIL_REGEX, 'Please enter a valid email address'),
    password: yup.string().required('Enter your password'),
  })
  .required();
