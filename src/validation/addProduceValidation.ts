import * as yup from 'yup';

export const AddProduceValidationSchema = yup
  .object({
    name: yup.string().required('Enter product name'),
    quantity: yup.string().required('Enter the quantity'),
    unit: yup.string().required('Enter the unit'),
    description: yup.string().required('Enter the decsription'),
    farm_address: yup.string().required('Enter farm address'),
    harvest_date: yup.string().required('Enter harvest date'),
    farm_state: yup.string().required('Enter farm state'),
    planting_date: yup.string().required('Enter planting date'),
    produce_classification: yup
      .string()
      .required('Enter produce classification'),
    storage: yup.string().required('Enter storage'),
  })
  .required();

export const MoveToValidationSchema = yup
  .object({
    email: yup.string().required('Enter your email'),
    quantity: yup.string().required('Enter the quantity'),
    unit: yup.string().required('Enter the unit'),
    user_type: yup.string().required('Enter user type'),
  })
  .required();

export const ApproveProduceValidationSchema = yup
  .object({
    package_location: yup.string().required('Enter package location'),
    quantity: yup.string().required('Enter the quantity'),
    unit: yup.string().required('Enter the unit'),
    package_state: yup.string().required('Enter packaging state'),
  })
  .required();
