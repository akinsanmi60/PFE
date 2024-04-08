import CustomButton from '@shared/Button';
import ModalBaseWrapper from '@shared/ModalBase';
import ModalHeader from 'components/appNav/modalHeader';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ApproveProduceValidationSchema } from 'validation/addProduceValidation';
import ControlledInput from '@shared/Input/ControlledInput';
import { IApproveProducePayload, IMyProduceData } from 'types/produce.type';
import { useAuthContext } from '@contexts/authContext';
import { useApproveProduce } from 'services/produce.service';

function ApproveProduceByAdmin({
  produceData,
}: {
  produceData: IMyProduceData;
}) {
  const { authUser } = useAuthContext();

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { isValid, isDirty },
  } = useForm({
    defaultValues: {
      package_location: '',
      package_state: '',
      quantity: '',
      unit: 'KG' || '',
    },
    mode: 'all',
    resolver: yupResolver(ApproveProduceValidationSchema),
  });

  const { mutate, isLoading } = useApproveProduce({
    produceId: produceData?.id,
    resetForm: reset,
    userId: authUser?.id as string,
  });

  const submitHandler = (val: IApproveProducePayload) => {
    mutate({ payload: val });
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
          title: 'Approve Produce',
          actionText: 'ApproveProduce',
        }}
      />
      <div className="flex flex-col justify-between gap-y-[20px]">
        <div className="w-full">
          <div className="w-full flex justify-between gap-x-[15px]">
            <ControlledInput
              control={control}
              label="Package Location"
              name="package_location"
              placeholder="Enter package location"
              type="text"
            />
            <ControlledInput
              control={control}
              label="Package State"
              name="package_state"
              placeholder="Enter package state"
              type="text"
            />
          </div>
          <p
            className="text-tertiary-light-3 text-[10px] font-[500] cursor-pointer mt-1"
            onClick={() => {
              setValue('package_location', produceData?.farm_address);
              setValue('package_state', produceData?.farm_state);
            }}
          >
            Use the initial produce location
          </p>
        </div>
        <div className="w-full">
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
          <p
            className="text-tertiary-light-3 text-[10px] font-[500] cursor-pointer mt-1"
            onClick={() => {
              setValue('quantity', String(produceData?.submitted_quantity));
            }}
          >
            Use the initial produce quantity
          </p>
        </div>

        <div className="w-full flex justify-end mb-[-40px]">
          <CustomButton
            className='"w-full text-primary-white bg-secondary-light-1'
            onClick={handleSubmit(submitHandler)}
            disabled={!isValid || !isDirty}
            loadingText="Approving..."
            loading={isLoading}
          >
            Approve Produce
          </CustomButton>
        </div>
      </div>
    </ModalBaseWrapper>
  );
}

export default ApproveProduceByAdmin;
