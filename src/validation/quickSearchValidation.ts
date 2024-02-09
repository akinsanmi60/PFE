import * as yup from 'yup';

export const quickSearchSchema = yup
  .object({
    case_id: yup.string(),
    first_name: yup.string().optional(),
    last_name: yup.string(),
    victim_state: yup.string().optional(),
    victim_lga: yup.string().optional(),
  })
  .required();
