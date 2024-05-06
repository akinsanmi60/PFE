import { useForm } from 'react-hook-form';
import AgencySettingsLayout from '../../../../../components/settingsLayout';
import ControlledInput from '@shared/Input/ControlledInput';
import { useEffect } from 'react';
import { capitalize } from '@utils/constants';
import { useModalContext } from '@contexts/modalContext';
import PageTile from 'components/pageTile';
import EditPhone from '@modules/common/personalInformation/editPhone/editPhone';
import EditEmail from '@modules/common/personalInformation/editEmail/editEmail';
import { useAuthContext } from '@contexts/authContext';
import { useGetIndividualAgency } from 'services/agency.service';

type IPersonalInputNames =
  | 'agency_name'
  | 'email'
  | 'phone_number'
  | 'agency_address';

function AgencyPersonalInfo() {
  const { authUser } = useAuthContext();
  const { data } = useGetIndividualAgency(authUser?.id as string);
  const { modalState, handleModalOpen } = useModalContext();

  const { control, setValue } = useForm({
    defaultValues: {
      agency_name: '',
      email: '',
      phone_number: '',
      agency_address: '',
    },
  });

  useEffect(() => {
    setValue('email', data?.email);
    setValue('agency_name', capitalize(data?.agency_name) as string);
    setValue('phone_number', data?.phone_number);
    setValue(
      'agency_address',
      (capitalize(data?.agency_address) as string) || 'N/A',
    );
  }, [data, setValue]);

  const personalInfoArray = [
    {
      label: 'Agency Name',
      inputName: 'agency_name',
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
      label: 'Address',
      inputName: 'agency_address',
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
