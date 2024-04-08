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
import { useTransferProduce } from 'services/produce.service';
import { ITransferProducePayload } from 'types/produce.type';

function MoveProduceTo({ produceId }: { produceId: string }) {
  const {
    control,
    handleSubmit,
    reset,
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

  const { mutate, isLoading } = useTransferProduce({
    resetForm: reset,
  });

  const submitHandler = (val: ITransferProducePayload) => {
    mutate({ payload: val, id: produceId });
  };

  return (
    <ModalBaseWrapper
      modalBaseProp={{
        showCloseBtn: false,
        className: 'w-[690px]',
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
            placeholder="Enter user email"
          />
        </div>

        <div>
          <div className="w-full flex justify-between gap-x-[15px]">
            <ControlledInput
              control={control}
              label="Quantity"
              name="quantity"
              placeholder="Enter quantity"
              type="text"
            />
            <ControlledInput
              control={control}
              label="Unit"
              name="unit"
              type="text"
              readonly
            />
          </div>
        </div>
        <div className="w-full flex justify-end mb-[-40px]">
          <CustomButton
            className='"w-full text-primary-white'
            onClick={handleSubmit(submitHandler)}
            disabled={!isValid || !isDirty}
            loadingText="Transfering..."
            loading={isLoading}
            variant={!isDirty || isLoading ? 'solid' : ''}
          >
            Complete Transfer
          </CustomButton>
        </div>
      </div>
    </ModalBaseWrapper>
  );
}

export default MoveProduceTo;
