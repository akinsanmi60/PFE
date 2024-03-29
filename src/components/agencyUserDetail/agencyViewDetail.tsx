import { capitalize, formatDate } from '@utils/constants';
import { IRowBody } from '@shared/HubTable/type';
import imagePlaceholder from '@assets/png/maleImagePlaceholder.png';
import UserCard from 'components/userCard';
import ChangeStatusButton from 'components/farmerAggregatorUserDetail/changeStatusButton';
// import ChangeStatusButton from './changeStatusButton';

type ViewDetailProps<TData> = {
  userData: TData;
};

function ViewAgencyDetail<TData extends IRowBody>({
  userData,
}: ViewDetailProps<TData>) {
  const detailAColumnsTitleA: {
    label: string;
    accessor: keyof TData | null;
    render?: (_object: TData) => React.ReactNode;
  }[] = [
    {
      label: 'Role',
      accessor: '',
      render: ({ user_type }) => {
        return capitalize(user_type);
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
    {
      label: 'Pentrar ID',
      accessor: 'pentrar_id',
    },
  ];
  const detailAColumnsTitleB: {
    label: string;
    accessor: keyof TData | null;
    render?: (_object: TData) => React.ReactNode;
  }[] = [
    {
      label: 'Agency Name',
      accessor: '',
      render: ({ agency_name }) => {
        return capitalize(agency_name);
      },
    },
    {
      label: 'Year Registered',
      accessor: '',
      render: ({ agency_establishment }) => {
        return capitalize(agency_establishment);
      },
    },
    {
      label: 'Address',
      accessor: '',
      render: ({ agency_address }) => {
        return capitalize(agency_address);
      },
    },
    {
      label: 'State',
      accessor: '',
      render: ({ agency_state }) => {
        return capitalize(agency_state);
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
      label: 'Reg. Number',
      accessor: '',
      render: ({ agency_reg_number }) => {
        return agency_reg_number.toLocaleUpperCase();
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

  return (
    <div className="p-[20px] flex flex-col gap-y-[35px]">
      <div className="flex gap-x-3 items-center">
        <div className="w-[140px] h-[140px] border-[1px] border-[E2E8F0]">
          <img src={imagePlaceholder} alt="imp" className="w-full h-full" />
        </div>
        <div>
          <UserCard
            detailProps={{
              detailKeys: detailAColumnsTitleA,
              incomingData: userData,
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
              incomingData: userData,
            }}
          />
        </div>
        <div className="w-full bg-[#E2E8F0] border[1px] h-[1px] my-2" />
        <div className="mt-[20px]">
          <ChangeStatusButton
            statusProp={{
              id: userData?.id,
              status: userData?.status,
              userType: userData?.user_type,
              is_active: userData?.is_active,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ViewAgencyDetail;
