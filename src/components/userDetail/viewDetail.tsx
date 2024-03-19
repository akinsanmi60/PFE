import pentrarLogo from '@assets/svg/LogoPentrar.svg';
import UserCard from './userCard';
import {
  capitalize,
  formatDate,
  getFirstSwordBeforeSpace,
} from '@utils/constants';
import { IRowBody } from '@shared/HubTable/type';
import CustomButton from '@shared/Button';

type ViewDetailProps<TData> = {
  userData: TData;
};

function ViewDetail<TData extends IRowBody>({
  userData,
}: ViewDetailProps<TData>) {
  const detailAColumnsTitleA: {
    label: string;
    accessor: keyof TData | null;
    render?: (_object: TData) => React.ReactNode;
  }[] = [
    {
      label: 'First Name',
      accessor: '',
      render: ({ full_name }) => {
        return getFirstSwordBeforeSpace(full_name);
      },
    },

    {
      label: 'Last Name',
      accessor: '',
      render: ({ full_name }) => {
        return getFirstSwordBeforeSpace(full_name, 'lastName');
      },
    },
    {
      label: 'Email',
      accessor: 'email',
    },
    {
      label: 'Phone',
      accessor: 'phone_number',
    },
    {
      label: 'Date Joined',
      accessor: '',
      render: ({ created_at }) => {
        return formatDate({ date: created_at, time: true });
      },
    },
  ];
  const detailAColumnsTitleB: {
    label: string;
    accessor: keyof TData | null;
    render?: (_object: TData) => React.ReactNode;
  }[] = [
    {
      label: 'Pentrar ID',
      accessor: 'pentrar_id',
    },
    {
      label: 'Role',
      accessor: '',
      render: ({ user_type }) => {
        return capitalize(user_type);
      },
    },

    {
      label: 'Category',
      accessor: 'category_type',
    },
    {
      label: 'Gender',
      accessor: 'gender',
      render: ({ gender }) => {
        return capitalize(gender);
      },
    },

    {
      label: 'Last Login',
      accessor: '',
      render: ({ last_active }) => {
        return formatDate({ date: last_active, time: true });
      },
    },
    {
      label: 'Active Status',
      accessor: '',
      render: ({ is_active }) => {
        const activeStatus = is_active ? 'Active' : 'Inactive';
        return (
          <span
            className={
              is_active ? 'text-statusText-success' : 'text-statusText-error'
            }
          >
            {activeStatus}
          </span>
        );
      },
    },
  ];
  const detailAColumnsTitleC: {
    label: string;
    accessor: keyof TData | null;
    render?: (_object: TData) => React.ReactNode;
  }[] = [
    {
      label:
        userData?.category_type === 'corporate' ? 'Business Name' : 'Farm Name',
      accessor: '',
      render: ({ coy_name, farm_name }) => {
        return capitalize(coy_name || farm_name);
      },
    },

    {
      label:
        userData?.category_type === 'corporate' ? 'Business Size' : 'Farm Size',
      accessor: '',
      render: ({ coy_scale, farming_scale }) => {
        return capitalize(coy_scale || farming_scale);
      },
    },
    {
      label:
        userData?.category_type === 'corporate'
          ? 'Business Address'
          : 'Farm Location',
      accessor: '',
      render: ({ coy_address, farm_location }) => {
        return capitalize(coy_address || farm_location);
      },
    },
  ];

  return (
    <div className="p-[20px] flex flex-col gap-y-[35px]">
      <div className="flex gap-x-3 items-center">
        <div className="w-[140px] h-[140px] border-[1px] border-[E2E8F0]">
          <img src={pentrarLogo} alt="imp" />
        </div>
        <div>
          <UserCard
            detailProps={{
              detailKeys: detailAColumnsTitleA,
              produceData: userData,
            }}
          />
        </div>
      </div>
      <div>
        <p className="font-[600] text-[16px] leading-[20px] text-primary-main">
          Other Details
        </p>
        <div className="w-full bg-[#E2E8F0] border[1px] h-[1px] my-2" />
        <div>
          <UserCard
            detailProps={{
              detailKeys: detailAColumnsTitleB,
              produceData: userData,
            }}
          />
        </div>
        <div className="w-full bg-[#E2E8F0] border[1px] h-[1px] my-2" />
        {userData?.category_type !== null ? (
          <div className="mt-[0px]">
            <UserCard
              detailProps={{
                detailKeys: detailAColumnsTitleC,
                produceData: userData,
              }}
            />
          </div>
        ) : (
          <div className="w-full h-full text-center p-[32px]">
            <p>No Category Details Submitted</p>
          </div>
        )}

        <div className="mt-[20px]">
          <CustomButton
            className={`${
              userData?.is_active === false
                ? 'bg-secondary-light-1'
                : 'bg-statusText-error'
            } text-primary-white text-[8px] font-[600]`}
            sx={{ borderRadius: '8px', px: 4, py: 0 }}
          >
            {userData?.is_active === false ? 'Activate' : 'Inactivate'}{' '}
            {capitalize(userData?.user_type)}
          </CustomButton>
        </div>
      </div>
    </div>
  );
}

export default ViewDetail;
