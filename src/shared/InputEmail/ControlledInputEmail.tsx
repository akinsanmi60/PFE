// import {
//   Controller,
//   FieldValues,
//   useController,
//   useForm,
// } from 'react-hook-form';
// import { IControlledInputEmail } from './interface';
// import Spinner from '@components/spinner/Spinner';
// import { GreenCheck, RedCancel } from '@assets/svg';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { useDebouncedValue } from '@hooks/useDebounce';
// import { useEffect, useState } from 'react';
// import { useValidateEmailAddressQuery } from '@services/member.service';
// import Input from 'shared/Input';
// import { isValidEmail } from 'helpers/validation';

// const customErrorValue = '@!±§§±±±§§§~~~~~~';
// const schema = (validationError: string | null, optional?: boolean) => {
//   const baseEmailYup = yup
//     .string()
//     .test({
//       test: (value?: string) => {
//         if (!value) return true;
//         return value !== customErrorValue;
//       },
//       message: validationError ? validationError : 'Invalid email',
//     })
//     .test({
//       test: isValidEmail,
//       message: 'Invalid email',
//     });

//   return yup.object({
//     email: baseEmailYup[optional ? 'notRequired' : 'required'](
//       optional ? undefined : 'Email is required',
//     ) as yup.StringSchema<string>,
//   });
// };

// const ControlledInputEmail = <TFieldValue extends FieldValues>(
//   props: IControlledInputEmail<TFieldValue>,
// ) => {
//   const {
//     control: propsControl,
//     name: propsName,
//     verified,
//     errorValue,
//     optional,
//     ...rest
//   } = props;
//   const propEmail = useController({
//     name: propsName,
//     control: propsControl,
//   });
//   const [initialEmail, setInitialEmail] = useState<string>('');
//   const formErrorState = useState<null | string>(null);
//   let formError = formErrorState[0];
//   const resetFormError = formErrorState[1];
//   const setFormError = (val: null | string) => {
//     formError = val;
//     resetFormError(val);
//   };

//   const form = useForm({
//     defaultValues: {
//       email: propEmail.field.value || '',
//     },
//     resolver: (data, ...rest) => {
//       return yupResolver(schema(formError, optional))(
//         { email: formError ? customErrorValue : data.email },
//         ...rest,
//       );
//     },
//     mode: 'onChange',
//   });

//   const {
//     control,
//     watch,
//     trigger,
//     formState: { isValid },
//   } = form;

//   const debouncedEmail = useDebouncedValue(watch('email'), 500);

//   const { data, isFetching, error } = useValidateEmailAddressQuery(
//     `?email=${encodeURIComponent(debouncedEmail)}`,
//     {
//       skip: !verified || !debouncedEmail,
//       refetchOnMountOrArgChange: true,
//     },
//   );

//   const email = watch('email');

//   useEffect(() => {
//     setInitialEmail(propEmail.field.value || '');
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     if ((isValid && !isFetching) || (optional && debouncedEmail === '')) {
//       propEmail.field.onChange(debouncedEmail);
//     } else {
//       propEmail.field.onChange(errorValue || '');
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [email, isValid, isFetching, verified, optional]);

//   useEffect(() => {
//     if (verified) {
//       if (debouncedEmail) {
//         if (error) {
//           const errorMessage =
//             (error as any)?.data?.errors?.email[0] || 'an error occurred';
//           setFormError(errorMessage);
//           trigger('email');
//         } else if (debouncedEmail !== initialEmail && data?.is_used) {
//           setFormError('Email already exists');
//           trigger('email');
//         } else {
//           setFormError(null);
//           trigger('email');
//         }
//       } else if (optional) {
//         setFormError(null);
//         trigger('email');
//       }
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [email, initialEmail, error, verified, data?.is_used]);

//   const endAdornment = (() => {
//     if (isFetching) {
//       return <Spinner size={16} color="#4CB543" />;
//     }
//     if (formError) {
//       return <RedCancel />;
//     }

//     if (watch('email')) {
//       return <GreenCheck />;
//     }

//     return null;
//   })();

//   return (
//     <Controller
//       control={propsControl}
//       name={propsName}
//       {...(verified
//         ? {
//             control: control,
//             name: 'email',
//           }
//         : {})}
//       render={({ field: { ...fields }, fieldState }) => (
//         <Input
//           {...fields}
//           {...(verified
//             ? {
//                 endAdornment,
//                 endAdornmentProps: {
//                   className: '!border-0',
//                 },
//               }
//             : {})}
//           {...rest}
//           error={!isFetching && !!fieldState.error}
//           helperText={isFetching ? undefined : fieldState.error?.message}
//         />
//       )}
//     />
//   );
// };

// ControlledInputEmail.defaultProps = {
//   verified: true,
// };

// export default ControlledInputEmail;
