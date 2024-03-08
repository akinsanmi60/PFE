import { EMAIL_REGEX } from '@utils/constants';
import * as yup from 'yup';

export const addAdminValidationSchema = yup
  .object({
    email: yup
      .string()
      .required('Enter your email')
      .matches(EMAIL_REGEX, 'Please enter a valid email address'),
    // permissions: yup.array().required('Enter permission'),
    phone_number: yup.string().required('Enter permission'),
    full_name: yup.string().required('Enter  full name'),
    role: yup.string().required('Enter the user role'),
  })
  .required();
