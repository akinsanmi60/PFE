import CustomButton from '@shared/Button';
import ControlledInputEmail from '@shared/InputEmail/ControlledInputEmail';
import ModalBaseWrapper from '@shared/ModalBase';
import ModalHeader from 'components/appNav/modalHeader';
import { useForm } from 'react-hook-form';
import { userTypeData } from '@db/authData';
import ControlledSelect from '@shared/Select/ControlledSelect';
import { yupResolver } from '@hookform/resolvers/yup';
import { MoveToValidationSchema } from 'validation/addProduceValidation';
import ControlledInput from '@shared/Input/ControlledInput';

function MoveProduceTo() {
  const {
    control,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useForm({
    defaultValues: {
      email: '',
      quantity: '',
      unit: 'KG' || '',
      user_type: '',
    },
    mode: 'all',
    resolver: yupResolver(MoveToValidationSchema),
  });

  const submitHandler = (val: any) => {
    return val;
  };

  return (
    <ModalBaseWrapper
      modalBaseProp={{
        formWidth: '690px',
        showCloseBtn: false,
      }}
    >
      <ModalHeader
        modalHeaderProp={{
          title: 'Move To',
          actionText: 'MoveTo',
        }}
      />
      <div className="flex flex-col justify-between gap-y-[20px]">
        <div>
          <ControlledSelect
            control={control}
            label="User Type"
            name="user_type"
            optionArray={userTypeData}
            placeholder="Please select  user type"
          />
        </div>
        <div>
          <ControlledInputEmail
            verified
            control={control}
            name="email"
            label="Email"
          />
        </div>

        <div>
          <div className="w-full flex justify-between gap-x-[15px]">
            <ControlledInput
              control={control}
              label="Quantity"
              name="quantity"
              type="text"
            />
            <ControlledInput
              control={control}
              label="Unit"
              name="unit"
              type="text"
            />
          </div>
        </div>
        <div className="w-full flex justify-end mb-[-40px]">
          <CustomButton
            className='"w-full text-primary-white'
            onClick={handleSubmit(submitHandler)}
            disabled={!isValid || !isDirty}
          >
            Move To
          </CustomButton>
        </div>
      </div>
    </ModalBaseWrapper>
  );
}

export default MoveProduceTo;
