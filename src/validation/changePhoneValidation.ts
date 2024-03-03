import * as yup from 'yup';

export const StartPhoneVerificationSchema = yup
  .object({
    old_phone: yup.string().required('Enter your old phone number'),
    new_phone: yup.string().required('Enter your new phone number'),
    password: yup.string().required('Enter your password'),
  })
  .required();

export const completePhoneVerificationSchema = yup
  .object({
    new_phone: yup.string().required('Enter your new phone number'),
    code: yup.string().required('Enter OTP code'),
  })
  .required();
