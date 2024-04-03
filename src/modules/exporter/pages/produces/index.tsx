import SearchFilterBox from '@shared/searchFilter';
import AppHeader from 'components/appHeader/appHeader';
import { useState } from 'react';
import { useGetMyProduce } from 'services/produce.service';
import { IMyProduceData, IUserQueryProps } from 'types/produce.type';
import { ReactComponent as SearchVector } from '@assets/svg/searchVector.svg';
import PageContainer from 'components/Layout/PageContainer';
import { ITableHead } from '@shared/Table/table.interface';
import StatusBadge, { IStatusType } from '@shared/StatusBadge';
import TableLoading from '@shared/Table/tableLoading';
import EmptyBar from '@shared/Table/tableEmpty';
import CustomTable from '@shared/Table';
import { formatDate } from '@utils/constants';

function ExporterProduce() {
  const [searchTerm, setSearchTerm] = useState('');
  const [queryParams, setQueryParams] = useState({
    search: '',
    page: 1,
    limit: 10,
  });

  const updateQueryParams = (params: IUserQueryProps) => {
    setQueryParams(prev => ({ ...prev, ...params }));
  };

  const { data, isLoading } = useGetMyProduce(queryParams);

  const renderText = () => {
    return (
      <h2 className="text-primary-main leading-6 font-[500] text-[18px]">
        Produces
      </h2>
    );
  };

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
      label: 'Qty Approved',
      accessor: 'quantity',
      render: ({ quantity, unit }) =>
        `${quantity === null ? 0 : quantity}/${
          unit === null || unit === '' ? 'KG' : unit
        }`,
    },
    {
      label: 'Last Updated',
      accessor: '',
      render: ({ updated_at }) => {
        return formatDate({ date: updated_at, time: true });
      },
    },
    {
      label: 'Qty Submitted',
      accessor: 'submitted_quantity',
      render: ({ submitted_quantity, submitted_unit }) =>
        `${submitted_quantity === null ? 0 : submitted_quantity}/${
          submitted_unit === null || submitted_unit === ''
            ? 'KG'
            : submitted_unit
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
    <div>
      <AppHeader>
        <div className="flex justify-between items-center mt-[20px] px-[24px] pb-[14px] sixm:flex-col sixm:gap-y-[20px]">
          <div className="w-full">
            <h2 className="text-primary-main leading-6 font-[500] text-[18px]">
              Manage your produces{' '}
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
          children={renderText()}
          tableHeads={tableHead}
          loading={isLoading}
          dataTableSource={data?.data?.produces_list || []}
          page_size={data?.data?.page_size}
          total={data?.data?.total}
          current_page={data?.data?.current_page}
          setCurrentPage={(val: number) => updateQueryParams({ page: val })}
          setLimit={(val: number) => updateQueryParams({ limit: val })}
          tableEmptyState={
            <EmptyBar emptyStateSize="lg" componentType="produces" />
          }
          tableLoader={<TableLoading title="Loading Produces" />}
          showPagination
          // onRowClick={(row: IMyProduceData) => {
          //   navigate(`/pentrar/user/my-produce/${row.id}/details`);
          // }}
        />
      </PageContainer>
    </div>
  );
}

export default ExporterProduce;
