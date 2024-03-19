import ModalBaseWrapper from '@shared/ModalBase';
import { capitalize, formatDate } from '@utils/constants';
import ModalHeader from 'components/appNav/modalHeader';
import DetailCard from 'components/produceDetail/detailCard';
import { IAdminData } from 'types/admin.type';
import PermissionComponent from './permissionComponent';

function ViewAdminComponent({ incomingData }: { incomingData: IAdminData }) {
  const columnSeparator: {
    label: string;
    accessor: keyof IAdminData | null;
    render?: (_object: IAdminData) => React.ReactNode;
  }[] = [
    {
      label: 'Date Added',
      accessor: null,
      render: ({ created_at }) => formatDate({ date: created_at, time: true }),
    },
    {
      label: 'Full Name',
      accessor: null,
      render: ({ full_name }) => capitalize(full_name),
    },
    {
      label: 'Email',
      accessor: 'email',
    },
    {
      label: 'Phone Number',
      accessor: 'phone_number',
    },
    {
      label: 'Gender',
      accessor: 'gender',
      render: ({ gender }) => capitalize(gender),
    },
    {
      label: 'Pentrar ID',
      accessor: 'pentrar_id',
    },
    {
      label: 'Role',
      accessor: 'role',
      render: ({ role }) => {
        const roleReform = role === 'subAdmin' && 'Sub Admin';
        return capitalize(roleReform as string);
      },
    },
  ];

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
            title: 'View Admin Details',
            actionText: 'viewSubAdmin',
          }}
        />
      </div>
      <div>
        <DetailCard
          detailProps={{
            detailKeys: columnSeparator,
            produceData: incomingData,
          }}
        />
      </div>
      <div className="w-full bg-[#E2E8F0] border[1px]  h-[1px] my-[16px]" />

      <div className="">
        <div className="flex justify-between items-center">
          <p className="font-[600]">Permission</p>
          <PermissionComponent />
        </div>
        {incomingData?.permissions.length === 0 ? (
          <div className="flex justify-center py-[24px]">
            <p>No Permission Assigned to this Sub Admin</p>
          </div>
        ) : null}
      </div>
    </ModalBaseWrapper>
  );
}

export default ViewAdminComponent;
