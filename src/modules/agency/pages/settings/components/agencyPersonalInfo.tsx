import { useForm } from 'react-hook-form';
import AgencySettingsLayout from './layout';
import ControlledInput from '@shared/Input/ControlledInput';
import { IAgencyTeamData } from 'types/agency.type';
import { useEffect } from 'react';
import { capitalize } from '@utils/constants';
import { useModalContext } from '@contexts/modalContext';
import PageTile from 'components/pageTile';
import EditPhone from '@modules/common/personalInformation/editPhone/editPhone';
import EditEmail from '@modules/common/personalInformation/editEmail/editEmail';

type IPersonalInputNames = 'full_name' | 'email' | 'phone_number' | 'gender';

function AgencyPersonalInfo({ data }: { data: IAgencyTeamData }) {
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
    setValue('gender', (capitalize(data?.gender) as string) || 'N/A');
  }, [data, setValue]);

  const personalInfoArray = [
    {
      label: 'Full Name',
      inputName: 'full_name',
      disable: true,
    },
    {
      label: 'Email',
      inputName: 'email',
      disable: true,
    },
    {
      label: 'Phone Number',
      inputName: 'phone_number',
      disable: true,
    },
    {
      label: 'Gender',
      inputName: 'gender',
      disable: true,
    },
  ];

  const renderTitle = () => {
    return (
      <div>
        <h1 className="text-[20px] font-[600] leading-[28px] mb-[8px]">
          Personal Information
        </h1>
        <p className="text-[14px] font-[400] leading-[20px] text-secondary-light-2">
          Update your personal information{' '}
        </p>
      </div>
    );
  };

  const renderUpload = () => {
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

    return (
      <>
        <PageTile actionArray={actionArray} useBorder={false} />
        <div className="flex flex-col gap-y-[20px]">
          {personalInfoArray.map(info => {
            return (
              <div key={info.label}>
                <ControlledInput
                  control={control}
                  name={info.inputName as IPersonalInputNames}
                  label={info.label}
                  readonly={info.disable}
                />
              </div>
            );
          })}
        </div>
      </>
    );
  };
  return (
    <>
      <div className="pb-[34px] pt-[24px] border-b border-[#E2E8F0]">
        <AgencySettingsLayout
          children={renderUpload()}
          titleChildren={renderTitle()}
        />
      </div>

      {modalState.modalType === 'phone' && (
        <EditPhone phone={data?.phone_number} />
      )}
      {modalState.modalType === 'email' && <EditEmail email={data?.email} />}
    </>
  );
}

export default AgencyPersonalInfo;
