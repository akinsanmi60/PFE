import { useState } from 'react';
import CustomTable from '@shared/Table';
import EmptyBar from '@shared/Table/tableEmpty';
import { ITableHead } from '@shared/Table/table.interface';
import { IUserQueryProps } from 'types/produce.type';
import TableLoading from '@shared/Table/tableLoading';
import StatusBadge, { IStatusType } from '@shared/StatusBadge';
import { formatDate, capitalize } from '@utils/constants';
import { ICertification } from 'types/certification.type';
import { useGetAllCertification } from 'services/certification.service';

function ExporterCertificationTableSummary({ userId }: { userId: string }) {
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 5,
    created_by: userId as string,
  });

  const updateQueryParams = (params: IUserQueryProps) => {
    setQueryParams(prev => ({ ...prev, ...params }));
    return queryParams;
  };

  const { data, isLoading, isRefetching } = useGetAllCertification(queryParams);

  const tableHead: ITableHead<ICertification>[] = [
    {
      label: 'id',
      accessor: '',
      render: ({ certification_id }) => certification_id,
    },
    {
      label: 'Agency Name',
      accessor: '',
      render: ({ agency: { agency_name } }) =>
        capitalize(agency_name as string),
    },
    {
      label: 'Date Sent',
      accessor: '',
      render: ({ send_date }) => formatDate({ date: send_date }),
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
      <CustomTable
        containerClassName={`px-0 py-0 mt-[5px]`}
        tableHeads={tableHead}
        loading={isLoading || isRefetching}
        dataTableSource={data?.certifications || []}
        page_size={data?.page_size}
        total={data?.total}
        current_page={data?.current_page}
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
