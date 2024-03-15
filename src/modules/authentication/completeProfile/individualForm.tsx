import { useAuthContext } from '@contexts/authContext';
import { useFormData } from '@contexts/formContext';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomButton from '@shared/Button';
import ControlledInput from '@shared/Input/ControlledInput';
import { UPDATE_FARMER_URL, UPDATE_AGGREGATOR_URL } from '@utils/apiUrl';
import { Resolver, useForm } from 'react-hook-form';
import { useCompleteProfile } from 'services/auth.service';
import { IFormComleteType, IFormType } from 'types/auth.type';
import { CompleteProfileIndividualSchema } from 'validation/completeProfileValidation';

function IndividualFormProfile({ setRevealForm }: IFormType) {
  const { multiFormValues } = useFormData();
  const { authUser } = useAuthContext();

  const urlSwitch =
    authUser?.role === 'farmer' ? UPDATE_FARMER_URL : UPDATE_AGGREGATOR_URL;

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      coy_name: '',
      coy_address: '',
    } as Partial<IFormComleteType>,
    resolver: yupResolver(
      CompleteProfileIndividualSchema,
    ) as unknown as Resolver<Partial<IFormComleteType>>,
  });

  const { mutate, isLoading } = useCompleteProfile({
    url: urlSwitch(authUser?.id as string),
    resetForm: reset,
    setRevealForm: setRevealForm,
  });

  const onSubmit = (data: Partial<IFormComleteType>) => {
    const payload = {
      ...data,
      category_type: multiFormValues?.category_type,
    };

    mutate({ payload: payload });
  };

  return (
    <div className="flex flex-col justify-between h-full pb-[30px]">
      <div className="flex flex-col gap-y-[16px]">
        <ControlledInput
          control={control}
          name="coy_name"
          label="Business Name"
        />
        <ControlledInput
          control={control}
          name="coy_address"
          label="Business Address"
        />
      </div>

      <div className="flex justify-end">
        <CustomButton
          onClick={handleSubmit(onSubmit)}
          className="w-[150px] text-primary-white"
          loading={isLoading}
          loadingText="Submitting..."
        >
          Submit
        </CustomButton>
      </div>
    </div>
  );
}

export default IndividualFormProfile;
