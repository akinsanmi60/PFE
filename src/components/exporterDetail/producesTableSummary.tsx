import { useState } from 'react';
import CustomTable from '@shared/Table';
import EmptyBar from '@shared/Table/tableEmpty';
import { ITableHead } from '@shared/Table/table.interface';
import { IMyProduceData, IUserQueryProps } from 'types/produce.type';
import TableLoading from '@shared/Table/tableLoading';
import StatusBadge, { IStatusType } from '@shared/StatusBadge';
import { useFarmerAggregatorProduce as useGetExporterProduce } from 'services/individualFarmerAggregator.service';

type IProps = {
  fetcherProp: {
    id: string;
    role: string;
  };
};
function ExporterProduce({ fetcherProp }: IProps) {
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 5,
  });

  const updateQueryParams = (params: IUserQueryProps) => {
    setQueryParams(prev => ({ ...prev, ...params }));
  };

  const { data, isLoading, isRefetching } = useGetExporterProduce(
    queryParams,
    fetcherProp?.id,
    fetcherProp?.role,
  );

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
      label: 'Qty',
      accessor: 'quantity',
      render: ({ quantity, unit }) =>
        `${quantity === null ? 0 : quantity}/${
          unit === null || unit === '' ? 'KG' : unit
        }`,
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
    <div className="w-full">
      <CustomTable<IMyProduceData>
        containerClassName={`px-0 py-0 mt-[5px]`}
        tableHeads={tableHead}
        loading={isLoading || isRefetching}
        dataTableSource={data?.data?.produces_list || []}
        page_size={data?.data?.page_size}
        total={data?.data?.total}
        current_page={data?.data?.current_page}
        setCurrentPage={(val: number) => updateQueryParams({ page: val })}
        setLimit={(val: number) => updateQueryParams({ limit: val })}
        tableEmptyState={
          <EmptyBar emptyStateSize="sm" componentType="produces" />
        }
        tableLoader={
          <TableLoading
            title="Loading Produces"
            size={80}
            loadingStateSize="sm"
          />
        }
        showPagination
        paginationArray={[5]}
      />
    </div>
  );
}

export default ExporterProduce;
