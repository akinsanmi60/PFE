import * as yup from 'yup';

export const addProduceValidationSchema = yup
  .object({
    name: yup.string().required('Enter product name'),
    quantity: yup.number().required('Enter the quantity'),
    unit: yup.string().required('Enter the unit'),
    description: yup.string().required('Enter the decsription'),
    farm_address: yup.string().required('Enter farm address'),
    harvest_date: yup.string().required('Enter harvest date'),
    farm_state: yup.string().required('Enter farm state'),
    planting_date: yup.string().required('Enter planting date'),
    storage: yup.string().required('Enter storage'),
    season: yup.string().required('Enter season'),
    weather: yup.string().required('Enter weather'),
  })
  .required();
