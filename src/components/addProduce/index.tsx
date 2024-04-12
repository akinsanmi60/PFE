import { useAuthContext } from '@contexts/authContext';
import { givenState } from '@db/general';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomButton from '@shared/Button';
import ControlledInput from '@shared/Input/ControlledInput';
import ModalBaseWrapper from '@shared/ModalBase';
import ControlledSelect from '@shared/Select/ControlledSelect';
import ControlledTextArea from '@shared/Textarea/ControlledInput';
import { toastOptions } from '@shared/Toast/Toast';
import ArrayImageUpload from '@shared/upload/ArrayImageUpload';
import ModalHeader from 'components/appNav/modalHeader';
import { useEffect, useState } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  useProduceCreationMutation,
  useProduceUpdateMutation,
} from 'services/produce.service';
import { IAddProducePayload, IMyProduceData } from 'types/produce.type';
import { AddProduceValidationSchema } from 'validation/addProduceValidation';
import { produceClassification, storageCapacity } from '../../db/produceData';
import { capitalize } from '@utils/constants';

type IAddProduce = {
  produceAddProps: {
    formTitle: string;
    actionText: string;
    userAddress?: string;
    userState?: string;
  };

  produceData?: IMyProduceData;
};

function AddProduceComponent({ produceAddProps, produceData }: IAddProduce) {
  const { authUser } = useAuthContext();
  const [imageString, setImageString] = useState<File[] | null>(null);
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
    setValue,
  } = useForm({
    resolver: yupResolver(AddProduceValidationSchema) as unknown as Resolver<
      Omit<IAddProducePayload, 'images'>
    >,
    defaultValues: {
      name: '',
      quantity: '',
      unit: '',
      description: '',
      nearest_landmark: '',
      farm_address: '',
      harvest_date: '',
      farm_state: '',
      planting_date: '',
      produce_classification: '',
      storage: '',
      storage_capacity: '',
    } as IAddProducePayload,
  });

  useEffect(() => {
    setValue('unit', produceData?.unit || 'KG');
    setValue('storage', produceData?.storage || '');
    setValue('nearest_landmark', produceData?.nearest_landmark || '');
    setValue('farm_address', (produceData?.farm_address as string) || '');
    setValue('farm_state', produceData?.farm_state || '');
    setValue('harvest_date', '');
    setValue('planting_date', '');
    setValue(
      'produce_classification',
      produceData?.produce_classification || '',
    );
    setValue('description', produceData?.description || '');
    setValue(
      'quantity',
      produceData?.submitted_quantity
        ? String(produceData?.submitted_quantity)
        : '',
    );
    setValue('name', produceData?.name || '');
  }, [
    produceAddProps?.userAddress,
    produceAddProps?.userState,
    produceData,
    setValue,
  ]);

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
    id: produceData?.id as string,
    setImageString,
    reset,
  });

  const onAddProduce = (val: IAddProducePayload) => {
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
          <div className="">
            <ControlledInput
              name="farm_address"
              label="Farm Address"
              placeholder="Enter Farm Address"
              control={control}
            />
            <p
              className="text-tertiary-light-3 text-[10px] font-[500] cursor-pointer mt-1"
              onClick={() => {
                setValue(
                  'farm_address',
                  capitalize(produceAddProps?.userAddress) || '',
                );
                setValue(
                  'farm_state',
                  capitalize(produceAddProps?.userState) || '',
                );
              }}
            >
              Use my address details
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ControlledInput
              name="unit"
              label="Quantity in Unit"
              readonly
              control={control}
            />

            <ControlledSelect
              name="farm_state"
              label="Farm State "
              placeholder="Select state"
              control={control}
              optionArray={givenState()}
            />
          </div>
          <div className="">
            <ControlledInput
              name="storage"
              label="Farm Storage Address"
              control={control}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ControlledSelect
              name="storage_capacity"
              label="Farm Storage"
              control={control}
              placeholder="Select capacity"
              optionArray={storageCapacity}
            />
          </div>

          <ControlledTextArea
            name="nearest_landmark"
            label="Nearest Landmark"
            placeholder="Enter Landmark"
            control={control}
          />

          <div className="flex justify-end mt-[8px]">
            <CustomButton
              onClick={handleSubmit(onAddProduce)}
              disabled={!isDirty || !isValid || isLoading || updateIsLoading}
              className="text-primary-white w-[180px]"
              loading={isLoading || updateIsLoading}
              loadingText="Adding..."
              variant={
                !isDirty || !isValid || isLoading || updateIsLoading
                  ? 'solid'
                  : ''
              }
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
