import { useAuthContext } from '@contexts/authContext';
import { useFormData } from '@contexts/formContext';
import { businessScale } from '@db/authData';
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
import { CompleteProfileBusinessSchema } from 'validation/completeProfileValidation';

function CorporateFormProfile({ setRevealForm }: IFormType) {
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
      coy_name: '',
      coy_address: '',
      coy_state: '',
      reg_number: '',
      tin_id: '',
      coy_establishment: '',
      coy_scale: '',
    } as Partial<IFormComleteType>,
    resolver: yupResolver(CompleteProfileBusinessSchema) as unknown as Resolver<
      Partial<IFormComleteType>
    >,
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
        <div>
          <ControlledInput
            control={control}
            name="coy_name"
            label="Business Name"
          />
        </div>
        <div className="flex gap-x-[16px]">
          <ControlledInput
            control={control}
            name="reg_number"
            label="Registration Number"
          />
          <ControlledInput
            control={control}
            name="tin_id"
            label="Tax Identification Number"
          />
        </div>
        <div className="flex gap-[16px] xlsm:flex-col">
          <div className="w-[70%] xlsm:w-full">
            <ControlledInput
              control={control}
              name="coy_address"
              label="Business Address"
            />
          </div>
          <div className="w-[30%] xlsm:w-full">
            <ControlledSelect
              control={control}
              name="coy_state"
              label="Business State"
              placeholder="Please select"
              optionArray={givenState()}
            />
          </div>
        </div>

        <div className="flex gap-x-[16px]">
          <ControlledInput
            control={control}
            name="coy_establishment"
            label="Year of Establishment"
          />
          <ControlledSelect
            control={control}
            name="coy_scale"
            label="Business Scale"
            placeholder="Please select"
            optionArray={businessScale}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <CustomButton
          onClick={handleSubmit(onSubmit)}
          className="w-[150px] text-primary-white"
          isLoading={isLoading}
          loadingText="Submitting..."
          variant={!isValid || !isDirty || isLoading ? 'solid' : ''}
          disabled={!isValid || !isDirty || isLoading}
        >
          Submit
        </CustomButton>
      </div>
    </div>
  );
}

export default CorporateFormProfile;
