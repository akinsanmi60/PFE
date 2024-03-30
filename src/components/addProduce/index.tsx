import { useAuthContext } from '@contexts/authContext';
import CustomButton from '@shared/Button';
import ControlledInput from '@shared/Input/ControlledInput';
import ModalBaseWrapper from '@shared/ModalBase';
import ControlledSelect from '@shared/Select/ControlledSelect';
import ControlledTextArea from '@shared/Textarea/ControlledInput';
import { toastOptions } from '@shared/Toast/Toast';
import ArrayImageUpload from '@shared/upload/ArrayImageUpload';
import ModalHeader from 'components/appNav/modalHeader';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  useProduceCreationMutation,
  useProduceUpdateMutation,
} from 'services/produce.service';
import { IAddProducePayload, IMyProduceData } from 'types/produce.type';

const produceClassification = [
  'Cereal',
  'Fruit',
  'Vegetable',
  'Root',
  'Leaf',
  'Fiber',
  'Other',
];

type IAddProduce = {
  produceAddProps: {
    formTitle: string;
    actionText: string;
    produceData?: IMyProduceData;
  };
};

function AddProduceComponent({ produceAddProps }: IAddProduce) {
  const { authUser } = useAuthContext();
  const [imageString, setImageString] = useState<File[] | null>(null);
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      name: (produceAddProps?.produceData?.name as string) || '',
      quantity: String(produceAddProps?.produceData?.submitted_quantity) || '',
      unit: produceAddProps?.produceData?.unit || '',
      description: produceAddProps?.produceData?.description || '',
      farm_address: produceAddProps?.produceData?.farm_address || '',
      harvest_date: '',
      farm_state: produceAddProps?.produceData?.farm_state || '',
      planting_date: '',
      produce_classification:
        produceAddProps?.produceData?.produce_classification || '',
      storage: produceAddProps?.produceData?.storage || '',
    },
  });

  const { mutate, isLoading, isSuccess } = useProduceCreationMutation({
    id: authUser?.id as string,
    reset,
    setImageString,
  });

  const {
    mutate: updateMutate,
    isLoading: updateIsLoading,
    isSuccess: updateIsSuccess,
  } = useProduceUpdateMutation({
    id: authUser?.id as string,
    reset,
    setImageString,
  });

  const onAddProduce = (val: Omit<IAddProducePayload, 'images'>) => {
    if (!imageString) {
      toast.error('Please add at least one image', toastOptions);
      return;
    }

    const imgData = new FormData();

    Array.from(imageString as File[]).forEach(file => {
      imgData.append('files', file);
    });
    const payload = {
      ...val,
      images: imgData,
    };

    if (produceAddProps?.actionText === 'addProduce') {
      mutate({ payload });
    } else if (produceAddProps?.actionText === 'editProduce') {
      updateMutate({ payload });
    }
  };

  return (
    <ModalBaseWrapper
      modalBaseProp={{
        showCloseBtn: false,
        className: 'w-[600px]',
      }}
    >
      <div className="p-[6px]">
        <ModalHeader
          modalHeaderProp={{
            title: produceAddProps?.formTitle,
            actionText: produceAddProps?.actionText,
          }}
        />

        <div className="flex gap-y-[25px] mt-[20px] flex-col  w-[540px]">
          <div className="mb-[5px]">
            <p className="text-[14px] tracking-normal leading-[20px] font-[500] ">
              Add Images
            </p>
            <p className="text-[12px] leading-[17px] tracking-normal font-[400]">
              You are allowed to upload 4 images.
            </p>
            <ArrayImageUpload
              setChosenImages={val => setImageString(val)}
              acceptType="image/*"
              successWatcher={isSuccess || updateIsSuccess}
            />
          </div>

          <ControlledInput
            name="name"
            label="Produce Name"
            placeholder="Enter produce name"
            control={control}
          />

          <ControlledTextArea
            name="description"
            label="Produce Description"
            placeholder="Enter description"
            control={control}
          />

          <div className="grid grid-cols-2 gap-4">
            <ControlledInput
              name="planting_date"
              label="Planting Date"
              control={control}
              type="date"
            />
            <ControlledSelect
              name="produce_classification"
              label="Produce Classification"
              placeholder="Select Classification"
              control={control}
              optionArray={produceClassification}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ControlledInput
              name="harvest_date"
              label="Harvest Date"
              control={control}
              type="date"
            />

            <ControlledInput
              name="quantity"
              label="Quantity (kg)"
              placeholder="Enter produce quantity"
              control={control}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ControlledInput
              name="farm_address"
              label="Farm Address"
              placeholder="Enter Farm Address"
              control={control}
            />

            <ControlledInput
              name="farm_state"
              label="Farm State"
              control={control}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ControlledInput
              name="storage"
              label="Farm Storage"
              control={control}
            />
          </div>

          <div className="flex justify-end mt-[8px] mb-[-50px]">
            <CustomButton
              onClick={handleSubmit(onAddProduce)}
              disabled={!isDirty || isLoading || updateIsLoading}
              className="text-primary-white w-[180px]"
              loading={isLoading}
              loadingText="Adding..."
              variant={!isDirty || isLoading || updateIsLoading ? 'solid' : ''}
            >
              Submit Produce
            </CustomButton>
          </div>
        </div>
      </div>
    </ModalBaseWrapper>
  );
}

export default AddProduceComponent;
