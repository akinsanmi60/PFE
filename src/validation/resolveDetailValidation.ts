import * as yup from 'yup';

export const ResolveDetailSchema = yup
  .object({
    found_date: yup.string().required('Enter date found'),
    people_assisted: yup.string().required('Enter people assisted'),
    isFamily_notified: yup.string().required('Enter family notified'),
    identification_confirmBy: yup.string().required('Enter confirm by'),
    identification_confirmAgency: yup.string().required('Enter confirm agency'),
    method_of_identification: yup
      .string()
      .required('Enter method of identification'),
    details_of_identification: yup
      .string()
      .required('Enter details of identification'),
    date_remains_identified: yup
      .string()
      .required('Enter date remains identified'),
    cause_of_death: yup.string().required('Enter cause of death'),
    details_of_death: yup.string().required('Enter details of death'),
    found_city: yup.string().required('Enter city found'),
    found_state: yup.string().required('Enter state found'),
    found_address: yup.string().required('Enter address found'),
  })
  .required();

export const ResolveDetailAliveSchema = yup
  .object({
    found_date: yup.string().required('Enter date found'),
    people_assisted: yup.string().required('Enter people assisted'),
    isFamily_notified: yup.string().required('Enter family notified'),
    identification_confirmBy: yup.string().required('Enter confirm by'),
    identification_confirmAgency: yup.string().required('Enter confirm agency'),
    method_of_identification: yup
      .string()
      .required('Enter method of identification'),
    details_of_identification: yup
      .string()
      .required('Enter details of identification'),
  })
  .required();
