import { useAuthContext } from '@contexts/authContext';
import ControlledInput from '@shared/Input/ControlledInput';
import PageTile from 'components/pageTile';
import { useForm } from 'react-hook-form';

type IBusinessInputNames =
  | 'category_type'
  | 'coy_name'
  | 'reg_number'
  | 'tin_id'
  | 'phone_number'
  | 'coy_address';
function BusinessInformation() {
  const { authUser } = useAuthContext();
  const { control } = useForm({
    defaultValues: {
      category_type: authUser?.category_type || 'Nil',
      coy_name: authUser?.coy_name || 'Nil',
      phone_number: authUser?.phone_number || 'Nil',
      reg_number: authUser?.reg_number || 'Nil',
      tin_id: authUser?.tin_id || 'Nil',
      coy_address: authUser?.coy_address || 'Nil',
    },
  });

  const personalInfoArray = [
    {
      label: 'Business Type',
      inputName: 'category_type',
    },
    {
      label: 'Business Name',
      inputName: 'coy_name',
    },
    {
      label: 'Phone Number',
      inputName: 'phone_number',
    },
    {
      label: 'Registration Number',
      inputName: 'reg_number',
    },
    {
      label: 'TIN ID Number',
      inputName: 'tin_id',
    },
    {
      label: 'Address',
      inputName: 'coy_address',
    },
  ];

  return (
    <>
      <div className="p-[24px] font-primary">
        <PageTile title="Business Information" />

        <div className="flex flex-col gap-y-[20px] mt-[30px]">
          {personalInfoArray.map(info => (
            <div key={info.label}>
              <ControlledInput
                control={control}
                name={info.inputName as IBusinessInputNames}
                label={info.label}
                readonly
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default BusinessInformation;
