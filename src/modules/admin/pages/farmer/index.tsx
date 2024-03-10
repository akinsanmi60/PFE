import CustomTable from '@shared/Table';
import EmptyBar from '@shared/Table/tableEmpty';
import SearchFilterBox from '@shared/searchFilter';
import PageContainer from 'components/Layout/PageContainer';
import AppHeader from 'components/appHeader/appHeader';
import { ReactComponent as SearchVector } from '@assets/svg/searchVector.svg';
import { useState } from 'react';
import { useGetAllFarmers } from 'services/admin.service';
import TableLoading from '@shared/Table/tableLoading';
import { ITableHead } from '@shared/Table/table.interface';
import { formatDate } from '@utils/constants';
import { IFarmerQueryProp } from 'types/admin.type';

function FarmerList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [queryParams, setQueryParams] = useState({
    search: '',
    page: 1,
    limit: 10,
  });

  const updateQueryParams = (params: IFarmerQueryProp) => {
    setQueryParams(prev => ({ ...prev, ...params }));
  };

  const { data, isLoading, isRefetching } = useGetAllFarmers(queryParams);

  const tableHead: ITableHead<any>[] = [
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
      accessor: 'status',
    },
  ];

  return (
    <div className="">
      <AppHeader>
        <div className="flex justify-between items-center mt-[20px] px-[24px] pb-[14px] sixm:flex-col sixm:gap-y-[20px]">
          <div className="w-full">
            <h2 className="text-primary-main leading-6 font-[500] text-[18px]">
              All Farmers
            </h2>
          </div>
          <div className="w-full flex justify-between items-center gap-x-[15px] ">
            <SearchFilterBox
              searchBarProps={{
                placeholder: 'Search farmer by name or ID',
                useStartAdornment: <SearchVector />,
                onSetTermChange: ({ target: { value } }) => {
                  setSearchTerm(value);
                  updateQueryParams({ search: value });
                },
                term: searchTerm,
              }}
            />
          </div>
        </div>
      </AppHeader>
      <PageContainer className="pt-0">
        <div className="w-full bg-primary-white rounded-lg mt-[30px] p-[24px]">
          <CustomTable
            tableHeads={tableHead}
            total={data?.data?.total}
            page_size={data?.data?.page_size}
            dataTableSource={data?.data?.farmers_list || []}
            loading={isLoading || isRefetching}
            current_page={data?.data?.current_page}
            tableEmptyState={
              <EmptyBar emptyStateSize="lg" componentType="Farmers" />
            }
            tableLoader={<TableLoading title="Loading Farmers" />}
            showPagination
            setCurrentPage={(val: number) => updateQueryParams({ page: val })}
            setLimit={(val: number) => updateQueryParams({ limit: val })}
          />
        </div>
      </PageContainer>
    </div>
  );
}
export default FarmerList;
