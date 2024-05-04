import {
  ALPHANUM_REGEX,
  EMAIL_REGEX,
  REGEX_CODE,
  fullNameRegex,
} from '@utils/constants';
import * as yup from 'yup';

export const AddNewAgencySchema = yup
  .object({
    email: yup.string().required('Enter your email'),
    agency_name: yup.string().required('Enter your agency name'),
    agency_state: yup.string().required('Enter your agency state'),
    agency_address: yup.string().required('Enter your agency address'),
    phone_number: yup
      .string()
      .required('Enter your phone number')
      .matches(REGEX_CODE, 'Special characters and alphabet are not accepted')
      .max(11, 'Phone number must not be greater than 14 characters'),
    agency_establishment: yup
      .string()
      .required('Enter your agency establishment')
      .max(4, 'Phone number must not be greater than 4 characters')
      .matches(REGEX_CODE, 'Special characters and alphabet are not accepted'),
    agency_reg_number: yup
      .string()
      .required('Enter your agency registration number')
      .matches(
        ALPHANUM_REGEX,
        'Special characters and alphabet are not accepted',
      ),
    head_name: yup.string().required('Enter your agency head name'),
    head_of_agency_phone: yup
      .string()
      .required('Enter your agency head phone number')
      .matches(REGEX_CODE, 'Special characters and alphabet are not accepted')
      .max(11, 'Phone number must not be greater than 14 characters'),
    head_of_agency_email: yup
      .string()
      .required('Enter your agency head email')
      .matches(EMAIL_REGEX, 'Please enter a valid email address'),
    agency_type: yup.string().required('Select your agency type'),
    gender: yup.string().required('Select your gender'),
  })
  .required();

export const AddNewTeamSchema = yup
  .object({
    agent_email: yup.string().required('Enter your email'),
    agent_full_name: yup
      .string()
      .required('Enter your agency name')
      .matches(fullNameRegex, 'Please enter a valid full name'),

    agent_role: yup.string().required('Enter your agency address'),
    agent_phone_number: yup
      .string()
      .required('Enter your phone number')
      .matches(REGEX_CODE, 'Special characters and alphabet are not accepted')
      .max(11, 'Phone number must not be greater than 14 characters'),
    agency_type: yup.string().required('Select your agency type'),
    gender: yup.string().required('Select your gender'),
  })
  .required();
