import * as yup from 'yup';
import { ALPHAREGEX_CODE, EMAIL_REGEX, REGEX_CODE } from '@utils/constants';

export const contactSchema = yup
  .object({
    email: yup
      .string()
      .required()
      .matches(EMAIL_REGEX, 'Please enter a valid email address'),
    full_name: yup.string().required(),
    phone_number: yup
      .string()
      .required('Enter a phone number')
      .matches(REGEX_CODE, 'Special characters and alphabet are not accepted')
      .max(14, 'Phone number must not be greater than 14 characters'),

    message_title: yup
      .string()
      .required('Please provide a message title to your form')
      .matches(
        ALPHAREGEX_CODE,
        'Special characters and numbers are not accepted',
      ),
    message: yup.string().required(),
  })
  .required();
