import { useFormData } from '@contexts/formContext';
import CustomButton from '@shared/Button';
import ControlledCheckbox from '@shared/Checkbox';
import { useForm } from 'react-hook-form';

type IUserSelection = {
  setRevealForm: React.Dispatch<
    React.SetStateAction<{
      formType: string;
      showForm: boolean;
    }>
  >;
};

const businessType = [
  { label: 'Individual', value: 'individual' },
  { label: 'Corporate', value: 'corporate' },
];
function SelectProfileType({ setRevealForm }: IUserSelection) {
  const { setFormValues } = useFormData();

  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category_type: '',
    },
  });

  const formValue = watch('category_type');

  const onSubmit = (data: any) => {
    if (data.category_type === '') {
      return setError('category_type', {
        message: 'Please select a business type',
      });
    } else {
      setFormValues(data);
      setRevealForm({
        formType: data.category_type,
        showForm: true,
      });
    }
  };

  return (
    <div className="h-full flex flex-col justify-between pb-[40px] mt-[25px]">
      <div>
        <h1 className="text-[14px] font-[500] text-primary-main leading-4">
          Select Business Type
        </h1>
        <div className={errors.category_type?.message && 'mt-5'}>
          {businessType.map(type => {
            return (
              <div key={type.label}>
                <div className="flex items-center justify-between cursor-pointer w-full border-[1px] border-[#DFE2E2] py-[16px] px-[20px] rounded-xl last:mt-[20px] ">
                  <div>
                    <label
                      htmlFor={type.value}
                      className="text-[14px] cursor-pointer font-[500]"
                    >
                      {type.label}
                    </label>
                  </div>
                  <div>
                    <ControlledCheckbox
                      control={control}
                      name="category_type"
                      checkboxValue={type.value}
                      id={type.value}
                      checked={type.value === formValue}
                      className=" accent-secondary-light-1"
                      showError={false}
                    />
                  </div>
                </div>

                {errors.category_type && (
                  <p className="text-[10px] text-[#E03137] font-[400] mt-0 mb-3">
                    {errors.category_type.message}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end">
        <CustomButton
          onClick={handleSubmit(onSubmit)}
          className="w-[150px] text-primary-white"
        >
          Continue
        </CustomButton>
      </div>
    </div>
  );
}

export default SelectProfileType;
