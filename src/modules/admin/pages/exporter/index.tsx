import CustomTable from '@shared/Table';
import EmptyBar from '@shared/Table/tableEmpty';
import SearchFilterBox from '@shared/searchFilter';
import PageContainer from 'components/Layout/PageContainer';
import AppHeader from 'components/appHeader/appHeader';
import { ReactComponent as SearchVector } from '@assets/svg/searchVector.svg';
import { ReactComponent as CloseVector } from '@assets/svg/searchClose.svg';
import { useState } from 'react';
import { useGetAllExporters } from 'services/exporter.service';
import TableLoading from '@shared/Table/tableLoading';
import { ITableHead } from '@shared/Table/table.interface';
import { formatDate } from '@utils/constants';
import { useModalContext } from '@contexts/modalContext';
import { IFilterValues } from 'types/modal.type';
import { useForm } from 'react-hook-form';
import { IFilterProduceQuery } from 'types/produce.type';
import CommonAdminFilterForm from '../commonFilter';
import { useNavigate } from 'react-router-dom';
import { adminDashboardPaths } from '@utils/paths';
import { IExporterData } from 'types/exporter.type';

function ExporterList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [queryParams, setQueryParams] = useState({
    search: '',
    page: 1,
    limit: 10,
  });

  const { modalState, handleModalOpen, handleModalClose } = useModalContext();

  const exporterForm = useForm<IFilterValues>({
    defaultValues: {
      is_active: '',
      created_at: '',
      updated_at: '',
    },
  });

  const updateQueryParams = (params: IFilterProduceQuery) => {
    setQueryParams(prev => ({ ...prev, ...params }));
  };
  const { data, isLoading, isRefetching } = useGetAllExporters(queryParams);

  const tableHead: ITableHead<IExporterData>[] = [
    {
      label: 'id',
      accessor: 'pentrar_id',
    },
    {
      label: 'Comppany Name',
      accessor: 'coy_name',
    },
    {
      label: 'Phone Number',
      accessor: 'phone_number',
    },
    {
      label: 'Last Updated',
      accessor: 'updated_at',
      render: ({ updated_at }) => {
        return formatDate({ date: updated_at });
      },
    },
    {
      label: 'Status',
      accessor: 'is_active',
      render: ({ is_active }) => {
        return is_active ? 'Active' : 'Inactive';
      },
    },
  ];

  const openFilterBox = () => handleModalOpen('filterExporter');

  const closeFilterBox = () => {
    handleModalClose('filterExporter');
  };

  const submitFilter = () => {
    const startDate = exporterForm.getValues('created_at') || undefined;
    const endDate = exporterForm.getValues('updated_at') || undefined;
    const exporterActiveStatus =
      exporterForm.getValues('is_active') || undefined;

    updateQueryParams({
      page: 1,
      is_active:
        exporterActiveStatus === 'active'
          ? true
          : exporterActiveStatus === 'inactive'
          ? false
          : undefined,

      created_at: startDate,
      updated_at: endDate,
    });
    closeFilterBox();
  };

  return (
    <div className="">
      <AppHeader>
        <div className="flex justify-between items-center mt-[20px] px-[24px] pb-[14px] sixm:flex-col sixm:gap-y-[20px]">
          <div className="w-full">
            <h2 className="text-primary-main leading-6 font-[500] text-[18px]">
              All Exporters
            </h2>
          </div>
          <div className="w-full">
            <SearchFilterBox
              searchBarProps={{
                placeholder: 'Search exporter by name or ID',
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
        <div className="w-full bg-primary-white rounded-lg mt-[30px]">
          <CustomTable<IExporterData>
            tableHeads={tableHead}
            loading={isLoading || isRefetching}
            total={data?.data?.total}
            page_size={data?.data?.page_size}
            current_page={data?.data?.current_page}
            dataTableSource={data?.data?.exporters_list || []}
            tableEmptyState={
              <EmptyBar emptyStateSize="lg" componentType="Exporters" />
            }
            showPagination
            setCurrentPage={(val: number) => updateQueryParams({ page: val })}
            setLimit={(val: number) => updateQueryParams({ limit: val })}
            tableLoader={
              <TableLoading
                title="Loading Exporters"
                className="xlsm:h-screen"
              />
            }
            onRowClick={(row: IExporterData) => {
              navigate(
                `/${adminDashboardPaths.exportersDetails(
                  row.id,
                  row?.user_type,
                  'produce',
                )}`,
              );
            }}
          />
        </div>
      </PageContainer>

      {modalState?.modalType === 'filterExporter' && (
        <CommonAdminFilterForm
          closeModalBox={closeFilterBox}
          filterForm={exporterForm}
          onSubmitForm={submitFilter}
          clearFunction={() =>
            updateQueryParams({
              page: 1,
              limit: 10,
              created_at: '',
              updated_at: '',
              is_active: undefined,
            })
          }
          filterTitle="Exporter"
          watchValue="is_active"
        />
      )}
    </div>
  );
}

export default ExporterList;
