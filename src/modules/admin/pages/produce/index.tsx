import SearchFilterBox from '@shared/searchFilter';
import AppHeader from 'components/appHeader/appHeader';
import { ReactComponent as SearchVector } from '@assets/svg/searchVector.svg';
import { useState } from 'react';
import CustomTable from '@shared/Table';
import EmptyBar from '@shared/Table/tableEmpty';
import PageContainer from 'components/Layout/PageContainer';
import { useGetAllProduce } from 'services/admin.service';
import { IProduceQueryProp } from 'types/admin.type';
import { ITableHead } from '@shared/Table/table.interface';
import { IMyProduceData } from 'types/produce.type';
import { formatDate } from '@utils/constants';
import TableLoading from '@shared/Table/tableLoading';
import { useNavigate } from 'react-router-dom';
import StatusBadge, { IStatusType } from '@shared/StatusBadge';

function ProduceList() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [queryParams, setQueryParams] = useState({
    search: '',
    page: 1,
    limit: 10,
  });

  const updateQueryParams = (params: IProduceQueryProp) => {
    setQueryParams(prev => ({ ...prev, ...params }));
  };

  const { data, isLoading, isRefetching } = useGetAllProduce(queryParams);

  const tableHead: ITableHead<IMyProduceData>[] = [
    {
      label: 'id',
      accessor: '',
      render: ({ pentrar_produce_id }) => pentrar_produce_id,
    },
    {
      label: 'Produce Name',
      accessor: 'name',
      render: ({ name }) => name,
    },
    {
      label: 'Location',
      accessor: 'farm_state',
      render: ({ farm_state }) => farm_state,
    },
    {
      label: 'Quantity',
      accessor: 'quantity',
      render: ({ quantity, unit }) =>
        `${quantity}/${unit === null || unit === '' ? 'KG' : unit}`,
    },
    {
      label: 'Last Updated',
      accessor: '',
      render: ({ updated_at }) => {
        return formatDate({ date: updated_at });
      },
    },
    {
      label: 'Status',
      accessor: 'status',
      render: ({ status }) => {
        return <StatusBadge status={status as IStatusType} />;
      },
    },
  ];

  return (
    <div className="">
      <AppHeader>
        <div className="flex justify-between items-center mt-[20px] px-[24px] pb-[14px] sixm:flex-col sixm:gap-y-[20px]">
          <div className="w-full">
            <h2 className="text-primary-main leading-6 font-[500] text-[18px]">
              All Produce
            </h2>
          </div>
          <div className="w-full flex justify-between items-center gap-x-[15px] ">
            <SearchFilterBox
              searchBarProps={{
                placeholder: 'Search produce by name or ID',
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
        <CustomTable<IMyProduceData>
          tableHeads={tableHead}
          loading={isLoading || isRefetching}
          dataTableSource={data?.data?.produces_list || []}
          total={data?.data?.total}
          page_size={data?.data?.page_size}
          current_page={data?.data?.current_page}
          tableEmptyState={
            <EmptyBar emptyStateSize="lg" componentType="produces" />
          }
          tableLoader={<TableLoading title="Loading All Produces" />}
          showPagination
          setCurrentPage={(val: number) => updateQueryParams({ page: val })}
          setLimit={(val: number) => updateQueryParams({ limit: val })}
          onRowClick={(row: IMyProduceData) => {
            navigate(`/pentrar/admin/all-produces/${row.id}/produce-detail`);
          }}
        />
      </PageContainer>
    </div>
  );
}

export default ProduceList;
