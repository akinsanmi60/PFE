import SearchFilterBox from '@shared/searchFilter';
import AppHeader from 'components/appHeader/appHeader';
import { ReactComponent as SearchVector } from '@assets/svg/searchVector.svg';
import { ReactComponent as CloseVector } from '@assets/svg/searchClose.svg';
import { useState } from 'react';
import CustomTable from '@shared/Table';
import EmptyBar from '@shared/Table/tableEmpty';
import PageContainer from 'components/Layout/PageContainer';
import { useGetAllProduce } from 'services/admin.service';
import { ITableHead } from '@shared/Table/table.interface';
import { IFilterProduceQuery, IMyProduceData } from 'types/produce.type';
import { formatDate } from '@utils/constants';
import TableLoading from '@shared/Table/tableLoading';
import { useNavigate } from 'react-router-dom';
import StatusBadge, { IStatusType } from '@shared/StatusBadge';
import { useForm } from 'react-hook-form';
import { IFilterValues } from 'types/modal.type';
import { useModalContext } from '@contexts/modalContext';
import AdminProduceFilterForm from './filterForm';
import { adminDashboardPaths } from '@utils/paths';

function ProduceList() {
  const navigate = useNavigate();
  const { modalState, handleModalOpen, handleModalClose } = useModalContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [queryParams, setQueryParams] = useState({
    search: '',
    page: 1,
    limit: 10,
  });

  const produceForm = useForm<IFilterValues>({
    defaultValues: {
      status: '',
      created_at: '',
      updated_at: '',
      on_pentrar_hub: '',
      produce_ownership: '',
    },
  });

  const updateQueryParams = (params: IFilterProduceQuery) => {
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
        `${quantity === null ? 0 : quantity} / ${
          unit === null || unit === '' ? 'KG' : unit
        }`,
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

  const openFilterBox = () => handleModalOpen('filterAdminProduce');

  const closeFilterBox = () => {
    handleModalClose('filterAdminProduce');
  };

  const submitFilter = () => {
    const startDate = produceForm.getValues('created_at') || undefined;
    const endDate = produceForm.getValues('updated_at') || undefined;
    const hubValue = produceForm.getValues('on_pentrar_hub');
    const ownershipValue =
      produceForm.getValues('produce_ownership') || undefined;

    updateQueryParams({
      page: 1,
      status:
        produceForm.getValues('status')!.length > 0
          ? (produceForm.getValues('status') as IFilterProduceQuery['status'])
          : undefined,
      created_at: startDate,
      updated_at: endDate,
      on_pentrar_hub:
        hubValue === 'on_hub'
          ? true
          : hubValue === 'not_on_hub'
          ? false
          : undefined,
      produce_ownership: ownershipValue,
    });
    closeFilterBox();
  };

  return (
    <div className="">
      <AppHeader>
        <div className="flex justify-between items-center mt-[20px] px-[24px] pb-[14px] sixm:flex-col sixm:gap-y-[20px] xlsm:px-3">
          <div className="w-full">
            <h2 className="text-primary-main leading-6 font-[500] text-[18px]">
              All Produce
            </h2>
          </div>
          <div className="w-full">
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
          tableLoader={
            <TableLoading
              title="Loading All Produces"
              className="xlsm:h-screen"
            />
          }
          showPagination
          setCurrentPage={(val: number) => updateQueryParams({ page: val })}
          setLimit={(val: number) => updateQueryParams({ limit: val })}
          onRowClick={(row: IMyProduceData) => {
            navigate(`/${adminDashboardPaths.produceDetail(row.id)}`);
          }}
        />
      </PageContainer>
      {modalState?.modalType === 'filterAdminProduce' && (
        <AdminProduceFilterForm
          closeModalBox={closeFilterBox}
          filterForm={produceForm}
          onSubmitForm={submitFilter}
          clearFunction={() =>
            updateQueryParams({
              page: 1,
              limit: 10,
              created_at: '',
              updated_at: '',
              on_pentrar_hub: undefined,
              produce_ownership: undefined,
              status: undefined,
            })
          }
        />
      )}
    </div>
  );
}

export default ProduceList;
