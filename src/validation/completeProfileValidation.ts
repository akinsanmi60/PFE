import * as yup from 'yup';

export const CompleteProfileIndividualSchema = yup
  .object({
    coy_name: yup.string().required('Enter your business name'),
    coy_address: yup.string().required('Enter your business address'),
  })
  .required();

export const CompleteProfileBusinessSchema = yup
  .object({
    coy_name: yup.string().required('Enter your business name'),
    coy_address: yup.string().required('Enter your business address'),
    reg_number: yup.string().required('Enter your registration number'),
    tin_id: yup.string().required('Enter your TIN ID'),
  })
  .required();
