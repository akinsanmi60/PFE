import { ALPHAREGEX_CODE, REGEX_CODE } from '@utils/constants';
import * as yup from 'yup';

export const createCaseSchema = yup
  .object({
    first_name: yup
      .string()
      .required('Victim first name is required')
      .matches(ALPHAREGEX_CODE, 'Special characters not accepted'),
    middle_name: yup
      .string()
      .required()
      .matches(ALPHAREGEX_CODE, 'Special chara23cters not accepted'),
    last_name: yup
      .string()
      .required('Victim last name is required')
      .matches(ALPHAREGEX_CODE, 'Special characters not accepted'),
    gender: yup.string().required('Select one'),
    victim_type: yup.string(),
    ethnicity: yup.string().required('Select one'),
    physical_feature: yup.string().required('Select one'),
    age: yup
      .string()
      .required('Victim age is required')
      .max(3, 'Age must not be greater than 3 characters'),
    DOB: yup.string().required('Victim date of birth is required'),
    height_measurement: yup
      .string()
      .required('Vicitm height is required')
      .max(3, 'Height must not be greater than 3 characters')
      .matches(REGEX_CODE, 'Special characters and alphabet are not accepted'),
    weight_measurement: yup
      .string()
      .max(3, 'Weight must not be greater than 3 characters')
      .matches(REGEX_CODE, 'Special characters and alphabet are not accepted'),
    skin: yup.string().required('Skin color is required'),
    hair: yup.string().required('Victim hair type is required'),
    body: yup.string().required('Victim body type is requirred'),
    victim_state: yup.string().required('Victim state is required'),
    victim_address: yup.string().required('Victim address is required'),
    victim_city: yup.string().required('Victim city is required'),
    victim_lga: yup.string().required('Victim lga is required'),
    victim_father: yup.string().required('Victim father’s name is required'),
    victim_mother: yup.string().required('Victim mother’s name is required'),
    victim_sibling: yup.string().required('Victim sibling’s name is required'),
    parent_address: yup.string().required('Victim parent’s address'),
    parent_contact: yup
      .string()
      .required('Victim parent’s a phone number')
      .matches(REGEX_CODE, 'Special characters and alphabet are not accepted'),
    last_seen_date: yup.string().required('Victim last seen date is required'),
    last_seen_state: yup.string().required('Victim last state is required'),
    last_seen_lga: yup.string().required('Victim last lga is required'),
    last_seen_city: yup.string().required('Victim last city is required'),
    // images: yup.string().required('Select one image for upload'),
    police_officer_name: yup
      .string()
      .required('Enter police officer in charge name'),
    // police_report_pdf: yup.string().required('select pdf file'),
    police_state: yup.string().required('Select police station state'),
    police_lga: yup.string().required('select police station lga'),
    police_station_address: yup
      .string()
      .required('Enter police station address'),
    police_number: yup
      .string()
      .required('Enter police phone number')
      .matches(REGEX_CODE, 'Special characters and alphabet are not accepted'),
    police_case_number: yup
      .string()
      .required('Enter a valid police case number'),
    date_reported: yup.string().required('Select a date'),
    reportedBy_relationship: yup
      .string()
      .required('Please select your relationship with victim'),
    reportedBy_otp: yup.string().max(6, 'code must be 6 characters'),
    police_station_city: yup.string().required('Enter police station city'),
  })
  .required();
