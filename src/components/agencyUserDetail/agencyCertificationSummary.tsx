import { useState } from 'react';
import CustomTable from '@shared/Table';
import EmptyBar from '@shared/Table/tableEmpty';
import { ITableHead } from '@shared/Table/table.interface';
import { IUserQueryProps } from 'types/produce.type';
import TableLoading from '@shared/Table/tableLoading';
import { useGetAllCertification } from 'services/certification.service';
import { IAgencyShowTableSummary } from 'types/agency.type';
import { ICertification } from 'types/certification.type';
import { capitalize } from '@utils/constants';
import StatusBadge, { IStatusType } from '@shared/StatusBadge';

function AgencyCertificationSummary({ analysisProp }: IAgencyShowTableSummary) {
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 5,
    agency_to: analysisProp?.id,
  });

  const updateQueryParams = (params: IUserQueryProps) => {
    setQueryParams(prev => ({ ...prev, ...params }));
    return queryParams;
  };

  const { data, isLoading, isRefetching } = useGetAllCertification(queryParams);

  const tableHead: ITableHead<ICertification>[] = [
    {
      label: 'Certification ID',
      accessor: '',
      render: ({ certification_id }) => certification_id,
    },
    {
      label: 'Exporter Name',
      accessor: '',
      render: ({ exporter_name }) => capitalize(exporter_name as string),
    },
    {
      label: 'Produce Name',
      accessor: '',
      render: ({ produce: { name } }) => {
        return capitalize(name);
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
          <EmptyBar emptyStateSize="sm" componentType="Certification" />
        }
        tableLoader={
          <TableLoading
            title="Loading Certifications..."
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

export default AgencyCertificationSummary;
