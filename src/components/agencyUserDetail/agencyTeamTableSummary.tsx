import StatusBadge, { IStatusType } from '@shared/StatusBadge';
import CustomTable from '@shared/Table';
import { ITableHead } from '@shared/Table/table.interface';
import EmptyBar from '@shared/Table/tableEmpty';
import TableLoading from '@shared/Table/tableLoading';
import { capitalize } from '@utils/constants';
import { useState } from 'react';
import { useGetAgencyTeamMember } from 'services/agency.service';
import { IAgencyShowTableSummary, IAgencyTeamData } from 'types/agency.type';
import { IFilterProduceQuery } from 'types/produce.type';

function AgencyTeamTableSummary({ analysisProp }: IAgencyShowTableSummary) {
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 5,
  });

  const updateQueryParams = (params: IFilterProduceQuery) => {
    setQueryParams(prev => ({ ...prev, ...params }));
  };

  const { data, isLoading, isRefetching } = useGetAgencyTeamMember(
    queryParams,
    analysisProp?.id,
  );

  const tableHead: ITableHead<IAgencyTeamData>[] = [
    {
      label: 'id',
      accessor: 'agency_team_id',
      //  render: ({ id }) => pentrar_produce_id,
    },
    {
      label: 'Full Name',
      accessor: '',
      render: ({ full_name }) => capitalize(full_name),
    },
    {
      label: 'Phone Number',
      accessor: 'phone_number',
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
      <CustomTable<IAgencyTeamData>
        containerClassName={`px-0 py-0 mt-[5px]`}
        tableHeads={tableHead}
        loading={isLoading || isRefetching}
        dataTableSource={data?.agency_member_list || []}
        page_size={data?.page_size}
        total={data?.total}
        current_page={data?.current_page}
        setCurrentPage={(val: number) => updateQueryParams({ page: val })}
        setLimit={(val: number) => updateQueryParams({ limit: val })}
        tableEmptyState={
          <EmptyBar emptyStateSize="sm" componentType="team members" />
        }
        tableLoader={
          <TableLoading
            title="Loading team members"
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

export default AgencyTeamTableSummary;
