import CustomTable from '@shared/Table';
import EmptyBar from '@shared/Table/tableEmpty';
import SearchFilterBox from '@shared/searchFilter';
import PageContainer from 'components/Layout/PageContainer';
import AppHeader from 'components/appHeader/appHeader';
import { ReactComponent as SearchVector } from '@assets/svg/searchVector.svg';
import { ReactComponent as CloseVector } from '@assets/svg/searchClose.svg';
import { useState } from 'react';
import TableLoading from '@shared/Table/tableLoading';
import { formatDate } from '@utils/constants';
import { ITableHead } from '@shared/Table/table.interface';
import { IAggregatorQueryProp } from 'types/admin.type';
import { useGetAllAggregators } from 'services/admin.service';
import { useNavigate } from 'react-router-dom';
import { AggregatorsPath } from '@utils/paths';

function AggregatorList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [queryParams, setQueryParams] = useState({
    search: '',
    page: 1,
    limit: 10,
  });
  const navigate = useNavigate();

  const updateQueryParams = (params: IAggregatorQueryProp) => {
    setQueryParams(prev => ({ ...prev, ...params }));
  };

  const { data, isLoading, isRefetching } = useGetAllAggregators(queryParams);

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
              All Aggregators
            </h2>
          </div>
          <div className="w-full flex justify-between items-center gap-x-[15px] ">
            <SearchFilterBox
              searchBarProps={{
                placeholder: 'Search aggregator by name or ID',
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
            />
          </div>
        </div>
      </AppHeader>
      <PageContainer className="pt-0">
        <CustomTable
          tableHeads={tableHead}
          loading={isLoading || isRefetching}
          total={data?.data?.total}
          page_size={data?.data?.page_size}
          dataTableSource={data?.data?.aggregators_list || []}
          current_page={data?.data?.current_page}
          tableLoader={<TableLoading title="Loading Aggregators" />}
          showPagination
          setCurrentPage={(val: number) => updateQueryParams({ page: val })}
          setLimit={(val: number) => updateQueryParams({ limit: val })}
          tableEmptyState={
            <EmptyBar emptyStateSize="lg" componentType="Aggregator" />
          }
          onRowClick={row => {
            navigate(
              `/${AggregatorsPath.aggregatorsDetails(
                row?.id as string,
                row?.user_type,
                'produces',
              )}`,
            );
          }}
        />
      </PageContainer>
    </div>
  );
}

export default AggregatorList;
