import { useAuthContext } from '@contexts/authContext';
import { useFormData } from '@contexts/formContext';
import { useModalContext } from '@contexts/modalContext';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomButton from '@shared/Button';
import ControlledInput from '@shared/Input/ControlledInput';
import {
  COMPLETE_AGGREGATOR_PHONE_VERIFICATION_URL,
  COMPLETE_FARMER_PHONE_VERIFICATION_URL,
  COMPLETE_TEAM_PHONE_VERIFICATION_URL,
} from '@utils/apiUrl';
import { useForm } from 'react-hook-form';
import { useCompletePhoneVerification } from 'services/persionalInformation.service';
import {
  ICompleteChangeFormData,
  ICompleteFormData,
} from 'types/personalSetting.type';
import { completePhoneVerificationSchema } from 'validation/changePhoneValidation';

function CompletePhoneVerification() {
  const { authUser } = useAuthContext();
  const { multiFormValues } = useFormData();

  const { handleModalClose } = useModalContext();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      new_phone: (multiFormValues?.new_phone as string) || '',
      code: '',
    },
    mode: 'all',
    resolver: yupResolver(completePhoneVerificationSchema),
  });

  const urlLink = () => {
    switch (authUser?.role) {
      case 'farmer':
        return COMPLETE_FARMER_PHONE_VERIFICATION_URL(authUser?.id as string);

      case 'aggregator':
        return COMPLETE_AGGREGATOR_PHONE_VERIFICATION_URL(
          authUser?.id as string,
        );

      case 'agencyAdmin':
      case 'agencySubAdmin':
        return COMPLETE_TEAM_PHONE_VERIFICATION_URL(authUser?.id as string);

      default:
        return COMPLETE_FARMER_PHONE_VERIFICATION_URL(authUser?.id as string);
    }
  };

  const { mutate, isLoading } = useCompletePhoneVerification({
    url: urlLink(),
    closeModal: handleModalClose,
  });

  const onSubmit = (values: ICompleteChangeFormData) => {
    const payload = {
      code: values.code,
      new_phone: values.new_phone,
    };
    mutate({ payload: payload as ICompleteFormData });
  };

  return (
    <div>
      <p className="text-[16px] font-[600] leading-[28px]">
        Complete your phone number verification kindly enter your verification
        code sent to {authUser?.phone_number} or {authUser?.email}{' '}
      </p>

      <form className="mt-[24px]">
        <div className="flex flex-col gap-y-[20px]">
          <ControlledInput
            control={control}
            label="Phone Number"
            name="new_phone"
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
              className="bg-primary-main text-primary-white w-[180px]"
              onClick={handleSubmit(onSubmit)}
              loading={isLoading}
              loadingText="Confirming..."
            >
              Confirm
            </CustomButton>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CompletePhoneVerification;
