import { useAuthContext } from '@contexts/authContext';
import { useFormData } from '@contexts/formContext';
import { useModalContext } from '@contexts/modalContext';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomButton from '@shared/Button';
import ControlledInput from '@shared/Input/ControlledInput';
import {
  START_AGGREGATOR_EMAIL_VERIFICATION_URL,
  START_FARMER_EMAIL_VERIFICATION_URL,
  START_TEAM_EMAIL_VERIFICATION_URL,
  START_ADMIN_EMAIL_VERIFICATION_URL,
} from '@utils/apiUrl';
import { useForm } from 'react-hook-form';
import { useStartEmailVerification } from 'services/persionalInformation.service';
import {
  IStartChangeEmailFormData,
  IStartEmailFormData,
} from 'types/personalSetting.type';
import { StartEmailVerificationSchema } from 'validation/changeEmailValidation';

function StartEmailVerification({
  switchView,
  email,
}: {
  switchView: React.Dispatch<React.SetStateAction<number>>;
  email: string;
}) {
  const { authUser } = useAuthContext();
  const { setFormValues } = useFormData();
  const { handleModalClose } = useModalContext();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      old_email: email || '',
      new_email: '',
      password: '',
    },
    mode: 'all',
    resolver: yupResolver(StartEmailVerificationSchema),
  });

  const urlLink = () => {
    switch (authUser?.role) {
      case 'farmer':
        return START_FARMER_EMAIL_VERIFICATION_URL(authUser?.id as string);

      case 'aggregator':
        return START_AGGREGATOR_EMAIL_VERIFICATION_URL(authUser?.id as string);

      case 'agencyAdmin':
      case 'agencySubAdmin':
        return START_TEAM_EMAIL_VERIFICATION_URL(authUser?.id as string);

      case 'admin':
      case 'subAdmin':
        return START_ADMIN_EMAIL_VERIFICATION_URL(authUser?.id as string);

      default:
        return START_FARMER_EMAIL_VERIFICATION_URL(authUser?.id as string);
    }
  };

  const { mutate, isLoading } = useStartEmailVerification({
    switchView,
    url: urlLink(),
  });

  const onSubmit = (values: IStartChangeEmailFormData) => {
    const payload = {
      new_email: values.new_email,
      password: values.password,
    };
    setFormValues({ new_email: payload?.new_email as string });
    mutate({ payload: payload as IStartEmailFormData });
  };

  return (
    <div>
      <p className="text-[20px] font-[600] leading-[28px]">
        Edit your Email Address
      </p>
      <form className="mt-[24px]">
        <div className="flex flex-col gap-y-[20px]">
          <ControlledInput
            control={control}
            label="Old Email"
            name="old_email"
            type="text"
            readonly
          />
          <ControlledInput
            control={control}
            label="New Email"
            name="new_email"
            type="text"
          />
          <ControlledInput
            control={control}
            label="Password"
            name="password"
            type="text"
          />
        </div>
        <div className="flex justify-end gap-x-4 mt-[30px] w-[100%]">
          <div className="flex items-center gap-[15px]">
            <CustomButton
              variant={'outline'}
              onClick={() => handleModalClose('phone')}
              className="border-primary-main border-[1px]  bg-transparent text-primary-main w-[120px]"
            >
              Decline{' '}
            </CustomButton>
            <CustomButton
              className=" text-primary-white w-[180px]"
              onClick={handleSubmit(onSubmit)}
              loading={isLoading}
              loadingText="Loading..."
            >
              Continue
            </CustomButton>
          </div>
        </div>
      </form>
    </div>
  );
}

export default StartEmailVerification;
