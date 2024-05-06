import { useAuthContext } from '@contexts/authContext';
import { useFormData } from '@contexts/formContext';
import { useModalContext } from '@contexts/modalContext';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomButton from '@shared/Button';
import ControlledInput from '@shared/Input/ControlledInput';
import {
  COMPLETE_AGGREGATOR_EMAIL_VERIFICATION_URL,
  COMPLETE_FARMER_EMAIL_VERIFICATION_URL,
  COMPLETE_AGENCY_EMAIL_VERIFICATION_URL,
  COMPLETE_ADMIN_EMAIL_VERIFICATION_URL,
} from '@utils/apiUrl';
import { useForm } from 'react-hook-form';
import { useCompleteEmailVerification } from 'services/persionalInformation.service';
import { ICompleteChangeEmailFormData } from 'types/personalSetting.type';
import { completeEmailVerificationSchema } from 'validation/changeEmailValidation';
import { queryKeys } from '@utils/queryKey';

function CompleteEmailVerification() {
  const { authUser } = useAuthContext();
  const { multiFormValues } = useFormData();

  const { handleModalClose } = useModalContext();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      new_email: (multiFormValues?.new_email as string) || '',
      code: '',
    },
    mode: 'all',
    resolver: yupResolver(completeEmailVerificationSchema),
  });

  const urlLink = () => {
    switch (authUser?.role) {
      case 'farmer':
        return COMPLETE_FARMER_EMAIL_VERIFICATION_URL(authUser?.id as string);

      case 'aggregator':
        return COMPLETE_AGGREGATOR_EMAIL_VERIFICATION_URL(
          authUser?.id as string,
        );

      case 'agencyAdmin':
      case 'agencySubAdmin':
      case 'agency':
        return COMPLETE_AGENCY_EMAIL_VERIFICATION_URL(authUser?.id as string);

      case 'admin':
      case 'subAdmin':
        return COMPLETE_ADMIN_EMAIL_VERIFICATION_URL(authUser?.id as string);

      default:
        return COMPLETE_FARMER_EMAIL_VERIFICATION_URL(authUser?.id as string);
    }
  };

  const queryKeyText = () => {
    switch (authUser?.role) {
      case 'farmer':
        return queryKeys.getIndividualFarmer;

      case 'aggregator':
        return queryKeys.getIndividualAggregator;

      case 'agencyAdmin':
      case 'agencySubAdmin':
        return queryKeys.getIndividualTeamMember;

      case 'admin':
      case 'subAdmin':
        return queryKeys.getIndividualSubAdmin;

      default:
        return '';
    }
  };

  const { mutate, isLoading } = useCompleteEmailVerification({
    url: urlLink(),
    closeModal: handleModalClose,
    queryText: queryKeyText(),
  });

  const onSubmit = (values: ICompleteChangeEmailFormData) => {
    const payload = {
      new_email: multiFormValues?.new_email,
      code: values.code,
    };
    mutate({ payload: payload as ICompleteChangeEmailFormData });
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

export default CompleteEmailVerification;
