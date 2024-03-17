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
      farm_name: '',
      farm_location: '',
      farm_land_ownership: '',
      farming_scale: '',
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
        <ControlledInput control={control} name="farm_name" label="Farm Name" />
        <ControlledInput
          control={control}
          name="farm_location"
          label="Farm Address"
        />
        <div className="flex gap-x-[16px]">
          <ControlledInput
            control={control}
            name="farm_land_ownership"
            label="Land Ownership"
          />
          <ControlledInput
            control={control}
            name="farming_scale"
            label="Farming Scale"
          />
        </div>
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
