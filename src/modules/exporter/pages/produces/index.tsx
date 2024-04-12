import SearchFilterBox from '@shared/searchFilter';
import AppHeader from 'components/appHeader/appHeader';
import { useState } from 'react';
import { useGetMyProduce } from 'services/produce.service';
import { IFilterProduceQuery, IMyProduceData } from 'types/produce.type';
import { ReactComponent as SearchVector } from '@assets/svg/searchVector.svg';
import PageContainer from 'components/Layout/PageContainer';
import { ITableHead } from '@shared/Table/table.interface';
import StatusBadge, { IStatusType } from '@shared/StatusBadge';
import TableLoading from '@shared/Table/tableLoading';
import EmptyBar from '@shared/Table/tableEmpty';
import CustomTable from '@shared/Table';
import { formatDate } from '@utils/constants';
import { useForm } from 'react-hook-form';
import { IFilterValues } from 'types/modal.type';
import { useModalContext } from '@contexts/modalContext';
import ExporterProduceFilterForm from './exporterFilterProduce';
import { ExporterPath } from '@utils/paths';
import { useNavigate } from 'react-router-dom';

function ExporterProduce() {
  const [searchTerm, setSearchTerm] = useState('');
  const { handleModalOpen, handleModalClose, modalState } = useModalContext();
  const [queryParams, setQueryParams] = useState({
    search: '',
    page: 1,
    limit: 10,
  });
  const produceForm = useForm<IFilterValues>({
    defaultValues: {
      created_at: '',
      updated_at: '',
    },
  });

  const navigate = useNavigate();

  console.log(ExporterPath.myProduceDetail('iiii'));

  const updateQueryParams = (params: IFilterProduceQuery) => {
    setQueryParams(prev => ({ ...prev, ...params }));
  };

  const { data, isLoading } = useGetMyProduce(queryParams);

  const renderText = () => {
    return (
      <h2 className="text-primary-main leading-6 font-[500] text-[18px]">
        Exporter Produce
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
      label: 'Status',
      accessor: 'status',
      render: ({ status }) => {
        return <StatusBadge status={status as IStatusType} />;
      },
    },
  ];

  const openFilterBox = () => handleModalOpen('filterExporterProduce');

  const closeFilterBox = () => {
    handleModalClose('filterExporterProduce');
  };

  const submitFilter = () => {
    const startDate = produceForm.getValues('created_at') || undefined;
    const endDate = produceForm.getValues('updated_at') || undefined;

    updateQueryParams({
      page: 1,
      created_at: startDate,
      updated_at: endDate,
    });
    closeFilterBox();
  };

  return (
    <div>
      <AppHeader>
        <div className="flex justify-between items-center mt-[20px] px-[24px] pb-[14px] sixm:flex-col sixm:gap-y-[20px]">
          <div className="w-full">
            <h2 className="text-primary-main leading-6 font-[500] text-[18px]">
              Manage your produce
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
            <EmptyBar emptyStateSize="lg" componentType="produce" />
          }
          tableLoader={<TableLoading title="Loading Produce" />}
          showPagination
          onRowClick={(row: IMyProduceData) => {
            navigate(`/${ExporterPath.myProduceDetail(row.id)}`);
          }}
        />

        {modalState?.modalType === 'filterExporterProduce' && (
          <ExporterProduceFilterForm
            closeModalBox={closeFilterBox}
            filterForm={produceForm}
            onSubmitForm={submitFilter}
            clearFunction={() =>
              updateQueryParams({
                page: 1,
                limit: 10,
                created_at: '',
                updated_at: '',
              })
            }
          />
        )}
      </PageContainer>
    </div>
  );
}

export default ExporterProduce;
