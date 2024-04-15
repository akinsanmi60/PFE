import { useAuthContext } from '@contexts/authContext';
import { useFormData } from '@contexts/formContext';
import { businessScale, premisesOwnerShip } from '@db/authData';
import { givenState } from '@db/general';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomButton from '@shared/Button';
import ControlledInput from '@shared/Input/ControlledInput';
import ControlledSelect from '@shared/Select/ControlledSelect';
import { UPDATE_FARMER_URL, UPDATE_AGGREGATOR_URL } from '@utils/apiUrl';
import { queryKeys } from '@utils/queryKey';
import { Resolver, useForm } from 'react-hook-form';
import { useCompleteProfile } from 'services/auth.service';
import { IFormComleteType, IFormType } from 'types/auth.type';
import { CompleteProfileIndividualSchema } from 'validation/completeProfileValidation';

function IndividualFormProfile({ setRevealForm }: IFormType) {
  const { multiFormValues } = useFormData();
  const { authUser } = useAuthContext();

  const urlSwitch =
    authUser?.role === 'farmer' ? UPDATE_FARMER_URL : UPDATE_AGGREGATOR_URL;

  const textQuery =
    authUser?.role === 'farmer'
      ? queryKeys.getIndividualFarmer
      : queryKeys.getIndividualAggregator;

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = useForm({
    defaultValues: {
      farm_name: '',
      farm_location: '',
      farm_state: '',
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
    queryText: textQuery,
  });

  const onSubmit = (data: Partial<IFormComleteType>) => {
    const payload = {
      ...data,
      category_type: multiFormValues?.category_type,
    };

    mutate({ payload: payload as Partial<IFormComleteType> });
  };

  return (
    <div className="flex flex-col justify-between h-full pb-[30px]">
      <div className="flex flex-col gap-y-[16px]">
        <ControlledInput control={control} name="farm_name" label="Farm Name" />
        <div className="flex gap-[16px] xlsm:flex-col">
          <div className="w-[70%] xlsm:w-full">
            <ControlledInput
              control={control}
              name="farm_location"
              label="Farm Address"
            />
          </div>
          <div className="w-[30%] xlsm:w-full">
            <ControlledSelect
              control={control}
              name="farm_state"
              label="Farm State"
              placeholder="Please select"
              optionArray={givenState()}
            />
          </div>
        </div>

        <div className="flex gap-x-[16px]">
          <ControlledSelect
            control={control}
            name="farm_land_ownership"
            label="Land Ownership"
            placeholder="Please select"
            optionArray={premisesOwnerShip}
          />
          <ControlledSelect
            control={control}
            name="farming_scale"
            label="Farming Scale"
            placeholder="Please select"
            optionArray={businessScale}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <CustomButton
          onClick={handleSubmit(onSubmit)}
          className="w-[150px] text-primary-white"
          loading={isLoading}
          loadingText="Submitting..."
          disabled={!isValid || !isDirty || isLoading}
          variant={!isValid || !isDirty || isLoading ? 'solid' : ''}
        >
          Submit
        </CustomButton>
      </div>
    </div>
  );
}

export default IndividualFormProfile;
