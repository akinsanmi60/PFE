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
    coy_establishment: yup
      .string()
      .required('Enter your business establishment')
      .matches(/^[0-9]+$/, 'Only numbers are allowed')
      .test({
        name: 'establishmentYear',
        message: 'Year must be between 1960 and current year',
        test: function (value) {
          const currentYear = new Date().getFullYear();
          return (
            Number(value) > 0 &&
            Number(value) >= 1960 &&
            Number(value) <= currentYear
          );
        },
      }),
    coy_scale: yup.string().required('Enter your business scale'),
  })
  .required();

export const CompleteExporterProfileSchema = yup
  .object({
    coy_address: yup.string().required('Enter your business address'),
    coy_state: yup.string().required('Enter your business address'),
    reg_number: yup.string().required('Enter your registration number'),
    tin_id: yup.string().required('Enter your TIN ID'),
    coy_establishment: yup
      .string()
      .required('Enter your business establishment')
      .matches(/^[0-9]+$/, 'Only numbers are allowed')
      .test({
        name: 'establishmentYear',
        message: 'Year must be between 1960 and current year',
        test: function (value) {
          const currentYear = new Date().getFullYear();
          return (
            Number(value) > 0 &&
            Number(value) >= 1960 &&
            Number(value) <= currentYear
          );
        },
      }),
    coy_scale: yup.string().required('Enter your business scale'),
  })
  .required();
