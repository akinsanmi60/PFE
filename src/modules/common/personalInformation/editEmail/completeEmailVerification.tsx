import { useAuthContext } from '@contexts/authContext';
import { useModalContext } from '@contexts/modalContext';
import CustomButton from '@shared/Button';
import ControlledInput from '@shared/Input/ControlledInput';
import { useForm } from 'react-hook-form';
import { useCompleteEmailVerification } from 'services/persionalInformationService';
import {
  ICompleteChangeEmailFormData,
  ICompleteEmailFormData,
} from 'types/personalSetting.type';

function CompleteEmailVerification() {
  const { authUser } = useAuthContext();
  const { handleModalClose } = useModalContext();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      new_email: authUser?.email || '',
      code: '',
    },
    mode: 'all',
    //    resolver: yupResolver(changePasswordSchema),
  });

  const { mutate } = useCompleteEmailVerification({
    id: authUser?.id || '',
  });

  const onSubmit = (values: ICompleteChangeEmailFormData) => {
    const payload = {
      code: values.code,
    };
    mutate({ payload: payload as ICompleteEmailFormData });
  };

  return (
    <div>
      <p className="text-[16px] font-[600] leading-[28px]">
        Complete your email verification kindly enter your verification code
        sent to {authUser?.phone_number} or {authUser?.email}{' '}
      </p>

      <form className="mt-[24px]">
        <div className="flex flex-col gap-y-[20px]">
          <ControlledInput
            control={control}
            label="Email"
            name="new_email"
            type="text"
            readonly
          />

          <ControlledInput
            control={control}
            label="Verification Code"
            name="code"
            type="text"
          />
        </div>
        <div className="flex justify-end gap-x-4 mt-[30px] mb-[-40px] w-[100%]">
          <div className="flex items-center gap-[15px]">
            <CustomButton
              variant={'outline'}
              onClick={() => handleModalClose('phone')}
              className="border-primary-main border-[1px]  bg-transparent text-primary-main w-[120px]"
            >
              Decline{' '}
            </CustomButton>
            <CustomButton
              className="bg-primary-main text-primary-white w-[180px]"
              onClick={handleSubmit(onSubmit)}
            >
              Confirm{' '}
            </CustomButton>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CompleteEmailVerification;
