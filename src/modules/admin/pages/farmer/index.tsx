import CustomTable from '@shared/Table';
import EmptyBar from '@shared/Table/tableEmpty';
import SearchFilterBox from '@shared/searchFilter';
import PageContainer from 'components/Layout/PageContainer';
import AppHeader from 'components/appHeader/appHeader';
import { ReactComponent as SearchVector } from '@assets/svg/searchVector.svg';
import { ReactComponent as CloseVector } from '@assets/svg/searchClose.svg';
import { useState } from 'react';
import { useGetAllFarmers } from 'services/admin.service';
import TableLoading from '@shared/Table/tableLoading';
import { ITableHead } from '@shared/Table/table.interface';
import { formatDate } from '@utils/constants';
import { useNavigate } from 'react-router-dom';
import { adminDashboardPaths } from '@utils/paths';
import { IIndividualFarmer } from 'types/individualFarmerAggregator.type';
import { useModalContext } from '@contexts/modalContext';
import { useForm } from 'react-hook-form';
import { IFilterValues } from 'types/modal.type';
import { IFilterProduceQuery } from 'types/produce.type';
import CommonAdminFilterForm from '../commonFilter';

function FarmerList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [queryParams, setQueryParams] = useState({
    search: '',
    page: 1,
    limit: 10,
  });
  const navigate = useNavigate();
  const { modalState, handleModalOpen, handleModalClose } = useModalContext();

  const farmerForm = useForm<IFilterValues>({
    defaultValues: {
      is_active: '',
      created_at: '',
      updated_at: '',
    },
  });
  const updateQueryParams = (params: IFilterProduceQuery) => {
    setQueryParams(prev => ({ ...prev, ...params }));
  };

  const { data, isLoading, isRefetching } = useGetAllFarmers(queryParams);

  const tableHead: ITableHead<IIndividualFarmer>[] = [
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
      label: 'Category',
      accessor: 'category_type',
    },
    {
      label: 'Last Updated',
      accessor: 'updated_at',
      render: ({ updated_at }) => {
        return formatDate({ date: updated_at });
      },
    },
    {
      label: 'Status',
      accessor: 'is_active',
      render: ({ is_active }) => {
        return is_active ? 'Active' : 'Inactive';
      },
    },
  ];

  const openFilterBox = () => handleModalOpen('filterFarmer');

  const closeFilterBox = () => {
    handleModalClose('filterFarmer');
  };

  const submitFilter = () => {
    const startDate = farmerForm.getValues('created_at') || undefined;
    const endDate = farmerForm.getValues('updated_at') || undefined;
    const farmerActiveStatus = farmerForm.getValues('is_active') || undefined;

    updateQueryParams({
      page: 1,
      is_active:
        farmerActiveStatus === 'active'
          ? true
          : farmerActiveStatus === 'inactive'
          ? false
          : undefined,

      created_at: startDate,
      updated_at: endDate,
    });
    closeFilterBox();
  };

  return (
    <div className="">
      <AppHeader>
        <div className="flex justify-between items-center mt-[20px] px-[24px] pb-[14px] sixm:flex-col sixm:gap-y-[20px]">
          <div className="w-full">
            <h2 className="text-primary-main leading-6 font-[500] text-[18px]">
              All Farmers
            </h2>
          </div>
          <div className="w-full">
            <SearchFilterBox
              searchBarProps={{
                placeholder: 'Search farmer by name or ID',
                useStartAdornment: <SearchVector />,
                onSetTermChange: ({ target: { value } }) => {
                  setSearchTerm(value);
                  updateQueryParams({ search: value });
                },
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
              filterBtnsProps={{
                useFilterBtn: true,
                onClick: openFilterBox,
              }}
            />
          </div>
        </div>
      </AppHeader>
      <PageContainer className="pt-0">
        <CustomTable<IIndividualFarmer>
          tableHeads={tableHead}
          total={data?.data?.total}
          page_size={data?.data?.page_size}
          dataTableSource={data?.data?.farmers_list || []}
          loading={isLoading || isRefetching}
          current_page={data?.data?.current_page}
          tableEmptyState={
            <EmptyBar emptyStateSize="lg" componentType="Farmers" />
          }
          tableLoader={
            <TableLoading title="Loading Farmers" className="xlsm:h-screen" />
          }
          showPagination
          setCurrentPage={(val: number) => updateQueryParams({ page: val })}
          setLimit={(val: number) => updateQueryParams({ limit: val })}
          onRowClick={(row: IIndividualFarmer) => {
            navigate(
              `/${adminDashboardPaths.farmersDetails(
                row?.id as string,
                row?.user_type,
                'produce',
              )}`,
            );
          }}
        />
      </PageContainer>

      {modalState?.modalType === 'filterFarmer' && (
        <CommonAdminFilterForm
          closeModalBox={closeFilterBox}
          filterForm={farmerForm}
          onSubmitForm={submitFilter}
          clearFunction={() =>
            updateQueryParams({
              page: 1,
              limit: 10,
              created_at: '',
              updated_at: '',
            })
          }
          filterTitle="Farmers"
          watchValue="is_active"
        />
      )}
    </div>
  );
}
export default FarmerList;
