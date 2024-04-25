import { useModalContext } from '@contexts/modalContext';
import EditPhone from './editPhone/editPhone';
import PageTile from 'components/pageTile';
import ControlledInput from '@shared/Input/ControlledInput';
import { useForm } from 'react-hook-form';
import EditEmail from './editEmail/editEmail';
import { capitalize } from '@utils/constants';
import { IIndividualFarmer } from 'types/individualFarmerAggregator.type';
import { useEffect } from 'react';
import ImageUpload from '@shared/upload/ImageUpload';

type IPersonalInputNames = 'full_name' | 'email' | 'phone_number' | 'gender';
function PersonalInformation({ data }: { data: IIndividualFarmer }) {
  const { modalState, handleModalOpen } = useModalContext();
  const { control, setValue } = useForm({
    defaultValues: {
      full_name: '',
      email: '',
      phone_number: '',
      gender: '',
    },
  });

  useEffect(() => {
    setValue('email', data?.email);
    setValue('full_name', capitalize(data?.full_name) as string);
    setValue('phone_number', data?.phone_number);
    setValue('gender', capitalize(data?.gender) as string);
  }, [data, setValue]);

  const actionArray = [
    {
      name: 'Edit phone',
      action: () => {
        handleModalOpen('phone');
      },
    },
    {
      name: 'Edit email',
      action: () => {
        handleModalOpen('email');
      },
    },
  ];

  const personalInfoArray = [
    {
      label: 'Full Name',
      inputName: 'full_name',
    },
    {
      label: 'Email',
      inputName: 'email',
    },
    {
      label: 'Phone Number',
      inputName: 'phone_number',
    },
    {
      label: 'Gender',
      inputName: 'gender',
    },
  ];

  return (
    <>
      <div className="p-[24px] font-primary">
        <PageTile actionArray={actionArray} title="Personal Information" />

        <div className="grid grid-cols-[170px_1fr] gap-x-5 my-[30px] xlsm:grid-cols-1 xlsm:gap-y-5">
          <div>
            <ImageUpload successWatcher={false} acceptType="image/*" />
          </div>
          <div className="flex flex-col gap-y-[20px]">
            {personalInfoArray.map(info => {
              return (
                <div key={info.label}>
                  <ControlledInput
                    control={control}
                    name={info.inputName as IPersonalInputNames}
                    label={info.label}
                    readonly
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {modalState.modalType === 'phone' && (
        <EditPhone phone={data?.phone_number} />
      )}
      {modalState.modalType === 'email' && <EditEmail email={data?.email} />}
    </>
  );
}

export default PersonalInformation;
