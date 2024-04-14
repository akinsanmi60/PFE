import SearchFilterBox from '@shared/searchFilter';
import { useState } from 'react';
import { ReactComponent as SearchVector } from '@assets/svg/searchVector.svg';
import { ReactComponent as CloseVector } from '@assets/svg/searchClose.svg';
import {
  IFilterProduceQuery,
  ITransferedProduceData,
} from 'types/produce.type';
import CustomTable from '@shared/Table';
import EmptyBar from '@shared/Table/tableEmpty';
import TableLoading from '@shared/Table/tableLoading';
import { useAuthContext } from '@contexts/authContext';
import { useGetTransferProduces } from 'services/produce.service';
import { ITableHead } from '@shared/Table/table.interface';
import { formatDate } from '@utils/constants';
import StatusBadge, { IStatusType } from '@shared/StatusBadge';
import { useModalContext } from '@contexts/modalContext';
import { useForm } from 'react-hook-form';
import { IFilterValues } from 'types/modal.type';
import TransferFilterForm from './transferFilter';
import ReceivedTransferProduceDetail from './ReceivedTransferProduceDetail';

function FromTransfers() {
  const { modalState, handleModalOpen, handleModalClose } = useModalContext();
  const { authUser } = useAuthContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [queryParams, setQueryParams] = useState({
    search: '',
    page: 1,
    limit: 10,
    to_id: authUser?.id,
  });
  const transferedToForm = useForm<IFilterValues>({
    defaultValues: {
      status: '',
      created_at: '',
      updated_at: '',
    },
  });
  const [transferDetail, setTransferDetail] =
    useState<ITransferedProduceData | null>(null);
  const updateQueryParams = (params: IFilterProduceQuery) => {
    setQueryParams(prev => ({ ...prev, ...params }));
  };

  const { data, isLoading, isRefetching } = useGetTransferProduces(queryParams);

  const tableHead: ITableHead<ITransferedProduceData>[] = [
    {
      label: 'Produce Name',
      accessor: '',
      render: ({ produce_name }) => produce_name,
    },
    {
      label: 'Quantity in Transfer',
      accessor: '',
      render: ({ qty_in_transefer, unit }) =>
        `${qty_in_transefer === null ? 0 : qty_in_transefer}/${
          unit === null || unit === '' ? 'KG' : unit
        }`,
    },
    {
      label: 'Produce Owner',
      accessor: '',
      render: ({ from_owner }) => {
        return from_owner;
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

  const openFilterBox = () => handleModalOpen('toFilterForm');

  const closeFilterBox = () => {
    handleModalClose('toFilterForm');
  };

  const submitFilter = () => {
    const startDate = transferedToForm.getValues('created_at') || undefined;
    const endDate = transferedToForm.getValues('updated_at') || undefined;

    updateQueryParams({
      page: 1,
      status:
        transferedToForm.getValues('status')!.length > 0
          ? (transferedToForm.getValues(
              'status',
            ) as IFilterProduceQuery['status'])
          : undefined,
      created_at: startDate,
      updated_at: endDate,
    });
    closeFilterBox();
  };

  return (
    <div>
      {' '}
      <div className="flex justify-end mt-[20px] pb-[14px] xlsm:justify-normal">
        <div className="w-1/2 xlsm:w-full">
          <SearchFilterBox
            searchBarProps={{
              placeholder: 'Search produce by name or ID',
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
            filterBtnsProps={{
              useFilterBtn: true,
              onClick: openFilterBox,
            }}
          />
        </div>
      </div>
      <CustomTable<ITransferedProduceData>
        // children={renderText()}
        tableHeads={tableHead}
        loading={isLoading || isRefetching}
        dataTableSource={data?.transfered_produce}
        page_size={data?.page_size}
        total={data?.total}
        current_page={data?.current_page}
        setCurrentPage={(val: number) => updateQueryParams({ page: val })}
        setLimit={(val: number) => updateQueryParams({ limit: val })}
        tableEmptyState={
          <EmptyBar emptyStateSize="lg" componentType="Transfer" />
        }
        tableLoader={<TableLoading title="Loading Received Produce List" />}
        showPagination
        onRowClick={rowData => viewProduce(rowData)}
      />
      {modalState.modalType === 'fromTransferDetailProduce' && (
        <ReceivedTransferProduceDetail transferDetail={transferDetail} />
      )}
      {modalState.modalType === 'toFilterForm' && (
        <TransferFilterForm
          filterForm={transferedToForm}
          onSubmitForm={submitFilter}
          closeModalBox={closeFilterBox}
          clearFunction={() =>
            updateQueryParams({
              page: 1,
              limit: 10,
              created_at: '',
              updated_at: '',
              status: '',
            })
          }
        />
      )}
    </div>
  );
}

export default FromTransfers;
