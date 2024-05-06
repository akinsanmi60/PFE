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
import { useGetIndividualExporter } from 'services/exporter.service';

type IPersonalInputNames = 'coy_name' | 'email' | 'phone_number' | 'address';

function ExporterPersonalInfo() {
  const { modalState, handleModalOpen } = useModalContext();
  const { authUser } = useAuthContext();
  const { data } = useGetIndividualExporter(authUser?.id as string);

  const { control, setValue } = useForm({
    defaultValues: {
      coy_name: '',
      email: '',
      phone_number: '',
      address: '',
    },
  });

  useEffect(() => {
    setValue('email', data?.data.email as string);
    setValue('coy_name', capitalize(data?.data?.coy_name) as string);
    setValue('phone_number', data?.data?.phone_number as string);
    setValue(
      'address',
      (capitalize(data?.data?.coy_address) as string) || 'N/A',
    );
  }, [data?.data, setValue]);

  const personalInfoArray = [
    {
      label: 'Company Name',
      inputName: 'coy_name',
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
      inputName: 'address',
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
        <EditPhone phone={data?.data?.phone_number as string} />
      )}
      {modalState.modalType === 'email' && (
        <EditEmail email={data?.data?.email as string} />
      )}
    </>
  );
}

export default ExporterPersonalInfo;
