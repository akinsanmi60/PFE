import { useAuthContext } from '@contexts/authContext';
import CustomButton from '@shared/Button';
import ControlledInput from '@shared/Input/ControlledInput';
import ModalBaseWrapper from '@shared/ModalBase';
import ControlledSelect from '@shared/Select/ControlledSelect';
import ControlledTextArea from '@shared/Textarea/ControlledInput';
import ArrayImageUpload from '@shared/upload/ArrayImageUpload';
import ModalHeader from 'components/appNav/modalHeader';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useProduceCreationMutation } from 'services/produce.service';
import { IAddProducePayload } from 'types/produce.type';

function AddProduceComponent() {
  const { authUser } = useAuthContext();
  const [imageString, setImageString] = useState<File[]>([]);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      quantity: 0,
      unit: '',
      description: '',
      farm_address: '',
      harvest_date: '',
      farm_state: '',
      planting_date: '',
      storage: '',
      season: '',
      weather: '',
    },
  });

  const { mutate } = useProduceCreationMutation({ id: authUser?.id as string });

  const onAddProduce = (val: Omit<IAddProducePayload, 'images'>) => {
    const imgData = new FormData();

    Array.from(imageString).forEach(file => {
      imgData.append('files', file);
    });
    const payload = {
      ...val,
      images: imgData,
    };
    mutate({ payload });
  };

  return (
    <ModalBaseWrapper
      modalBaseProp={{
        formWidth: '761px',
        showCloseBtn: false,
      }}
    >
      <div className="p-[6px]">
        <ModalHeader
          modalHeaderProp={{
            title: 'Add Produce',
            actionText: 'addProduce',
          }}
        />

        <div className="flex gap-y-[25px] mt-[20px] flex-col  w-[540px]">
          <div className="mb-[5px]">
            <p>Add Images</p>
            <p>You are allowed to upload 4 images.</p>
            <ArrayImageUpload
              setChosenImages={val => setImageString(val)}
              acceptType="image/*"
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
              name="season"
              label="Season"
              placeholder="Select Season"
              control={control}
              optionArray={[]}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ControlledInput
              name="harvest_date"
              label="Harvest Date"
              control={control}
              type="date"
            />
            <ControlledSelect
              name="weather"
              label="Weather Condition"
              placeholder="Select Season"
              control={control}
              optionArray={[]}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ControlledInput
              name="farm_address"
              label="Farm Address"
              placeholder="Enter Farm Address"
              control={control}
            />
            <ControlledSelect
              name="farm_state"
              label="Farm State"
              placeholder="Select Farm State"
              control={control}
              optionArray={[]}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ControlledInput
              name="quantity"
              label="Quantity"
              placeholder="Enter produce quantity"
              control={control}
            />
            <ControlledSelect
              name="storage"
              label="Storage"
              placeholder="Select produce name"
              control={control}
              optionArray={[]}
            />
          </div>

          <div className="flex justify-end mt-[8px] mb-[-50px]">
            <CustomButton
              onClick={handleSubmit(onAddProduce)}
              className="bg-primary-main text-primary-white w-[180px]"
            >
              Save Produce
            </CustomButton>
          </div>
        </div>
      </div>
    </ModalBaseWrapper>
  );
}

export default AddProduceComponent;
