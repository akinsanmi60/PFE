import SearchFilterBox from '@shared/searchFilter';
import PageContainer from 'components/Layout/PageContainer';
import AppHeader from 'components/appHeader/appHeader';
import { ReactComponent as SearchVector } from '@assets/svg/searchVector.svg';
import { ReactComponent as CloseVector } from '@assets/svg/searchClose.svg';
import { useState } from 'react';
import CustomTable from '@shared/Table';
import EmptyBar from '@shared/Table/tableEmpty';
import CustomButton from '@shared/Button';
import { useModalContext } from '@contexts/modalContext';
import AddAdminComponent from 'components/addAdmin';
import { useGetAllSubAdmin } from 'services/admin.service';
import TableLoading from '@shared/Table/tableLoading';
import { IAdminData, ISubAdminQuery } from 'types/admin.type';
import { ITableHead } from '@shared/Table/table.interface';
import { formatDate } from '@utils/constants';
import ViewAdminComponent from 'components/viewAdmin';
import StatusBadge from '@shared/StatusBadge';

function SubAdmin() {
  const [searchTerm, setSearchTerm] = useState('');
  const { modalState, handleModalOpen } = useModalContext();
  const [collectData, setCollectData] = useState<IAdminData | null>(null);
  const [queryParams, setQueryParams] = useState({
    search: '',
    page: 1,
    limit: 10,
  });

  const updateQueryParams = (params: ISubAdminQuery) => {
    setQueryParams(prev => ({ ...prev, ...params }));
  };

  const { data, isLoading, isRefetching } = useGetAllSubAdmin(queryParams);

  const tableHead: ITableHead<IAdminData>[] = [
    {
      label: 'id',
      accessor: 'pentrar_id',
    },
    {
      label: 'Full Name',
      accessor: 'full_name',
    },
    {
      label: 'Phone Number',
      accessor: 'phone_number',
    },
    {
      label: 'Last Login',
      accessor: '',
      render: ({ last_active }) => {
        return formatDate({ date: last_active, time: true });
      },
    },
    {
      label: 'Status',
      accessor: '',
      render: ({ is_active }) => {
        const activeStatus = is_active ? 'Active' : 'Inactive';
        return <StatusBadge status={activeStatus} />;
      },
    },
  ];

  return (
    <div className="">
      <AppHeader>
        <div className="flex justify-between items-center mt-[20px] px-[24px] pb-[14px] sixm:flex-col sixm:gap-y-[20px]">
          <div className="w-full">
            <h2 className="text-primary-main leading-6 font-[500] text-[18px]">
              All Admins
            </h2>
          </div>
          <div className="w-full flex justify-between items-center gap-x-[15px] ">
            <SearchFilterBox
              searchBarProps={{
                placeholder: 'Search subadmin by name or ID',
                useStartAdornment: <SearchVector />,
                onSetTermChange: ({ target: { value } }) =>
                  setSearchTerm(value),
                term: searchTerm,
                useEndAdornment: (
                  <CloseVector
                    onClick={() => {
                      updateQueryParams({ search: '' });
                      setSearchTerm('');
                    }}
                  />
                ),
              }}
            />
            <CustomButton
              className="text-primary-white w-[180px]"
              onClick={() => handleModalOpen('addSubAdmin')}
            >
              Add Admin
            </CustomButton>
          </div>
        </div>
      </AppHeader>
      <PageContainer className="pt-0">
        <div className="w-full bg-primary-white rounded-lg mt-[30px]">
          <CustomTable<IAdminData>
            tableHeads={tableHead}
            loading={isLoading || isRefetching}
            total={data?.total}
            page_size={data?.page_size}
            dataTableSource={data?.subAdmin_list || []}
            current_page={data?.current_page}
            tableEmptyState={
              <EmptyBar emptyStateSize="lg" componentType="Sub-Admins" />
            }
            tableLoader={<TableLoading title="Loading Sub-Admins" />}
            showPagination
            setCurrentPage={(val: number) => updateQueryParams({ page: val })}
            setLimit={(val: number) => updateQueryParams({ limit: val })}
            onRowClick={(rowData: IAdminData) => {
              handleModalOpen('viewSubAdmin');
              setCollectData(rowData);
            }}
          />
        </div>
      </PageContainer>
      {modalState?.modalType === 'addSubAdmin' && <AddAdminComponent />}
      {modalState?.modalType === 'viewSubAdmin' && (
        <ViewAdminComponent incomingData={collectData as IAdminData} />
      )}
    </div>
  );
}

export default SubAdmin;
