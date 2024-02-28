import { useModalContext } from '@contexts/modalContext';
import EditPhone from './editPhone/editPhone';
import PageTile from 'components/pageTile';
import { useAuthContext } from '@contexts/authContext';
import ControlledInput from '@shared/Input/ControlledInput';
import { useForm } from 'react-hook-form';

type IPersonalInputNames = 'full_name' | 'email' | 'phone_number' | 'gender';
function PersonalInformation() {
  const { authUser } = useAuthContext();
  const { modalState, handleModalOpen } = useModalContext();
  const { control } = useForm({
    defaultValues: {
      full_name: authUser?.full_name || 'Nil',
      email: authUser?.email || 'Nil',
      phone_number: authUser?.phone_number || 'Nil',
      gender: authUser?.gender || 'Nil',
    },
  });

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

        <div className="flex flex-col gap-y-[20px] mt-[30px]">
          {personalInfoArray.map(info => (
            <div key={info.label}>
              <ControlledInput
                control={control}
                name={info.inputName as IPersonalInputNames}
                label={info.label}
                readonly
              />
            </div>
          ))}
        </div>
      </div>

      {modalState.modalType === 'phone' && <EditPhone />}
      {modalState.modalType === 'email' && <> hi</>}
    </>
  );
}

export default PersonalInformation;
