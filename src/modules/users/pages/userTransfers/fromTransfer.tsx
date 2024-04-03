import SearchFilterBox from '@shared/searchFilter';
import { useState } from 'react';
import { ReactComponent as SearchVector } from '@assets/svg/searchVector.svg';
import { ITransferedProduceData, ITransferProp } from 'types/produce.type';
import CustomTable from '@shared/Table';
import EmptyBar from '@shared/Table/tableEmpty';
import TableLoading from '@shared/Table/tableLoading';
import { useAuthContext } from '@contexts/authContext';
import { useGetTransferProduces } from 'services/produce.service';
import { ITableHead } from '@shared/Table/table.interface';
import { formatDate } from '@utils/constants';
import StatusBadge, { IStatusType } from '@shared/StatusBadge';
import { useModalContext } from '@contexts/modalContext';
import SentTransferProduceDetail from './sentTransferProduceDetail';

function FromTransfers() {
  const { modalState, handleModalOpen } = useModalContext();

  const { authUser } = useAuthContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [queryParams, setQueryParams] = useState({
    search: '',
    page: 1,
    limit: 10,
    from_id: authUser?.id,
  });
  const [transferDetail, setTransferDetail] =
    useState<ITransferedProduceData | null>(null);
  const updateQueryParams = (params: ITransferProp) => {
    setQueryParams(prev => ({ ...prev, ...params }));
  };

  const { data, isLoading } = useGetTransferProduces(queryParams);

  const tableHead: ITableHead<ITransferedProduceData>[] = [
    {
      label: 'Produce Name',
      accessor: '',
      render: ({ produce_name }) => produce_name,
    },
    {
      label: 'Qty Approved',
      accessor: '',
      render: ({ qty_in_transefer, unit }) =>
        `${qty_in_transefer === null ? 0 : qty_in_transefer}/${
          unit === null || unit === '' ? 'KG' : unit
        }`,
    },
    {
      label: 'Transfer To',
      accessor: '',
      render: ({ to_owner }) => {
        return to_owner;
      },
    },
    {
      label: 'Transfer Date',
      accessor: '',
      render: ({ created_at }) => {
        return formatDate({ date: created_at, time: true });
      },
    },
    {
      label: 'Status',
      accessor: '',
      render: ({ transfer_status }) => {
        const statusText =
          transfer_status === 'in_progress'
            ? 'Progress'
            : transfer_status === 'transfer_done'
            ? 'Accepted'
            : 'Rejected';

        return <StatusBadge status={statusText as IStatusType} />;
      },
    },
  ];

  const viewProduce = (produceData: ITransferedProduceData) => {
    handleModalOpen('fromTransferDetailProduce');

    setTransferDetail(produceData);
  };

  return (
    <div>
      {' '}
      <div className="flex justify-between items-center mt-[20px] px-[24px] pb-[14px] sixm:flex-col sixm:gap-y-[20px]">
        <div className="w-full">
          <h2 className="text-primary-main leading-6 font-[500] text-[18px]">
            {/* Transfer Produces{' '} */}
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
      <CustomTable<ITransferedProduceData>
        // children={renderText()}
        tableHeads={tableHead}
        loading={isLoading}
        dataTableSource={data?.transfered_produce}
        page_size={data?.page_size}
        total={data?.total}
        current_page={data?.current_page}
        setCurrentPage={(val: number) => updateQueryParams({ page: val })}
        setLimit={(val: number) => updateQueryParams({ limit: val })}
        tableEmptyState={
          <EmptyBar emptyStateSize="lg" componentType="Transfer" />
        }
        tableLoader={<TableLoading title="Loading Produces" />}
        showPagination
        onRowClick={rowData => viewProduce(rowData)}
      />
      {modalState.modalType === 'fromTransferDetailProduce' && (
        <SentTransferProduceDetail transferDetail={transferDetail} />
      )}
    </div>
  );
}

export default FromTransfers;
