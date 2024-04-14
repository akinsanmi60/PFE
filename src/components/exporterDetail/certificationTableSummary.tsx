import { useState } from 'react';
import CustomTable from '@shared/Table';
import EmptyBar from '@shared/Table/tableEmpty';
import { ITableHead } from '@shared/Table/table.interface';
import { IUserQueryProps } from 'types/produce.type';
import TableLoading from '@shared/Table/tableLoading';
// import StatusBadge, { IStatusType } from '@shared/StatusBadge';

function ExporterCertificationTableSummary() {
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 5,
  });

  const updateQueryParams = (params: IUserQueryProps) => {
    setQueryParams(prev => ({ ...prev, ...params }));
    return queryParams;
  };

  const tableHead: ITableHead<any>[] = [
    {
      label: 'id',
      accessor: '',
      //   render: ({ pentrar_produce_id }) => pentrar_produce_id,
    },
    {
      label: 'Produce Name',
      accessor: 'name',
      //   render: ({ name }) => name,
    },
    {
      label: 'Qty',
      accessor: 'quantity',
      //   render: ({ quantity, unit }) =>
      //     `${quantity === null ? 0 : quantity}/${
      //       unit === null || unit === '' ? 'KG' : unit
      //     }`,
    },
  ];

  return (
    <div className="w-full">
      <CustomTable
        containerClassName={`px-0 py-0 mt-[5px]`}
        tableHeads={tableHead}
        loading={false}
        dataTableSource={[]}
        page_size={0}
        total={0}
        current_page={0}
        setCurrentPage={(val: number) => updateQueryParams({ page: val })}
        setLimit={(val: number) => updateQueryParams({ limit: val })}
        tableEmptyState={
          <EmptyBar emptyStateSize="sm" componentType="certification" />
        }
        tableLoader={
          <TableLoading
            title="Loading certifications..."
            size={70}
            loadingStateSize="sm"
          />
        }
        showPagination
        paginationArray={[5]}
      />
    </div>
  );
}

export default ExporterCertificationTableSummary;
