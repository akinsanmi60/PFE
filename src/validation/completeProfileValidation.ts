import * as yup from 'yup';

export const CompleteProfileIndividualSchema = yup
  .object({
    farm_name: yup.string().required('Enter your Farm name'),
    farm_location: yup.string().required('Enter your Farm address'),
    farm_state: yup.string().required('Enter your Farm address'),
    farm_land_ownership: yup
      .string()
      .required('Enter your Farm land ownership'),
    farming_scale: yup.string().required('Enter your Farming scale'),
  })
  .required();

export const CompleteProfileBusinessSchema = yup
  .object({
    coy_name: yup.string().required('Enter your business name'),
    coy_address: yup.string().required('Enter your business address'),
    coy_state: yup.string().required('Enter your business address'),
    reg_number: yup.string().required('Enter your registration number'),
    tin_id: yup.string().required('Enter your TIN ID'),
  })
  .required();
