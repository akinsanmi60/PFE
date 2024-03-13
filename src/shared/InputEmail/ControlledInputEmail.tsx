import {
  Controller,
  FieldValues,
  useController,
  useForm,
} from 'react-hook-form';
import { IControlledInputEmail } from './interface';
import { ReactComponent as GreenCheck } from '@assets/svg/green-check-input.svg';
import { ReactComponent as RedCancel } from '@assets/svg/red-error-input.svg';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDebouncedValue } from '@hooks/useDebounce';
import { useEffect, useState } from 'react';
import Input from 'shared/Input';
import { isValidEmail } from '@utils/validation';
import Spinner from '@shared/spinner/Spinner';
import { useEmailCheck } from 'services/auth.service';
import { InputRightElement } from '@chakra-ui/react';

const customErrorValue = '@!±§§±±±§§§~~~~~~';
const schema = (validationError: string | null, optional?: boolean) => {
  const baseEmailYup = yup
    .string()
    .test({
      test: (value?: string) => {
        if (!value) return true;
        return value !== customErrorValue;
      },
      message: validationError ? validationError : 'Invalid email',
    })
    .test({
      test: isValidEmail,
      message: 'Invalid email',
    });

  return yup.object({
    email: baseEmailYup[optional ? 'notRequired' : 'required'](
      optional ? undefined : 'Email is required',
    ) as yup.StringSchema<string>,
  });
};

const ControlledInputEmail = <TFieldValue extends FieldValues>(
  props: IControlledInputEmail<TFieldValue>,
) => {
  const {
    control: propsControl,
    name: propsName,
    verified,
    errorValue,
    optional,
    ...rest
  } = props;

  const propEmail = useController({
    name: propsName,
    control: propsControl,
  });

  const [initialEmail, setInitialEmail] = useState<string>('');
  const formErrorState = useState<null | string>(null);

  let formError = formErrorState[0];
  const resetFormError = formErrorState[1];

  const setFormError = (val: null | string) => {
    formError = val;
    resetFormError(val);
  };

  const {
    control,
    watch,
    trigger,
    reset,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      email: propEmail.field.value || '',
    },
    resolver: (data, ...rest) => {
      return yupResolver(schema(formError, optional))(
        { email: formError ? customErrorValue : data.email },
        ...rest,
      );
    },
    mode: 'onChange',
  });

  const debouncedEmail = useDebouncedValue(watch('email'), 500);

  const { data, isFetching, isError } = useEmailCheck(debouncedEmail);

  const email = watch('email');

  useEffect(() => {
    setInitialEmail(propEmail.field.value || '');
  }, [propEmail.field.value]);

  useEffect(() => {
    if ((isValid && !isFetching) || (optional && debouncedEmail === '')) {
      propEmail.field.onChange(debouncedEmail);
    } else {
      propEmail.field.onChange(errorValue || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, isValid, isFetching, verified, optional]);

  useEffect(() => {
    if (verified) {
      if (debouncedEmail) {
        if (isError) {
          const errorMessage =
            isError && data === undefined
              ? 'Email not found'
              : data?.message || 'Email not found';
          setFormError(errorMessage);
          trigger('email');
        } else {
          setFormError(null);
          trigger('email');
        }
      } else if (optional) {
        setFormError(null);
        trigger('email');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, initialEmail, isError, verified, data]);

  const endAdornment = (() => {
    if (isFetching) {
      return (
        <InputRightElement>
          <Spinner size={16} color="#4CB543" />
        </InputRightElement>
      );
    }
    if (formError) {
      return (
        <InputRightElement>
          <RedCancel onClick={() => reset()} />
        </InputRightElement>
      );
    }

    if (watch('email')) {
      return (
        <InputRightElement>
          <GreenCheck />
        </InputRightElement>
      );
    }

    return null;
  })();

  return (
    <Controller
      /* @ts-ignore */
      control={propsControl}
      /* @ts-ignore */
      name={propsName}
      {...(verified ? { control, name: 'email' } : {})}
      render={({ field: { ...fields }, fieldState }) => {
        return (
          <>
            <Input
              {...fields}
              {...(verified
                ? {
                    useEndAdornment: endAdornment,
                  }
                : {})}
              {...rest}
              helperText={isFetching ? undefined : fieldState.error?.message}
            />
            {data?.data?.user_name && verified && (
              <div className="text-secondary-light-1 flex justify-end text-[15px]">
                <p>{data?.data?.user_name}</p>
              </div>
            )}
          </>
        );
      }}
    />
  );
};

ControlledInputEmail.defaultProps = {
  verified: true,
};

export default ControlledInputEmail;
