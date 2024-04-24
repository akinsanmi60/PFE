import SearchFilterBox from '@shared/searchFilter';
import { useState } from 'react';
import { ReactComponent as SearchVector } from '@assets/svg/searchVector.svg';
import { ReactComponent as CloseVector } from '@assets/svg/searchClose.svg';
import { IFilterProduceQuery } from 'types/produce.type';
import { useModalContext } from '@contexts/modalContext';
import { useForm } from 'react-hook-form';
import { IFilterValues } from 'types/modal.type';
import { ICertification } from 'types/certification.type';
import { capitalize, formatDate } from '@utils/constants';
import StatusBadge, { IStatusType } from '@shared/StatusBadge';
import CustomTable from '@shared/Table';
import { useGetAllCertification } from 'services/certification.service';
import { ITableHead } from '@shared/Table/table.interface';
import EmptyBar from '@shared/Table/tableEmpty';
import TableLoading from '@shared/Table/tableLoading';
import AgencyCertificationFilterForm from './certificationFilterForm';
import { useNavigate } from 'react-router-dom';
import { AgencyUserPath } from '@utils/paths';

function CollectedCertification() {
  const navigate = useNavigate();

  const { modalState, handleModalOpen, handleModalClose } = useModalContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [queryParams, setQueryParams] = useState({
    search: '',
    page: 1,
    limit: 10,
    status: 'collected',
  });

  const certificationForm = useForm<IFilterValues>({
    defaultValues: {
      created_at: '',
      updated_at: '',
    },
  });

  const { data, isLoading, isRefetching } = useGetAllCertification(queryParams);

  const updateQueryParams = (params: IFilterProduceQuery) => {
    setQueryParams(prev => ({ ...prev, ...params }));
  };

  const openFilterBox = () => handleModalOpen('collectedFilterForm');

  const closeFilterBox = () => {
    handleModalClose('collectedFilterForm');
  };

  const submitFilter = () => {
    const startDate = certificationForm.getValues('created_at') || undefined;
    const endDate = certificationForm.getValues('updated_at') || undefined;

    updateQueryParams({
      page: 1,
      created_at: startDate,
      updated_at: endDate,
    });
    closeFilterBox();
  };

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
      label: 'Produce Location',
      accessor: '',
      render: ({ export: { coy_state } }) => {
        return capitalize(coy_state as string);
      },
    },
    {
      label: 'Collected Date',
      accessor: '',
      render: ({ updated_at }) => {
        return !updated_at ? '--' : formatDate({ date: updated_at as string });
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
    <div>
      <div className="flex justify-end mt-[20px] pb-[14px] xlsm:justify-normal">
        <div className="w-1/2 xlsm:w-full">
          <SearchFilterBox
            searchBarProps={{
              placeholder: 'Search certification by name or ID',
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

      <div className="w-full bg-primary-white rounded-lg mt-[30px]">
        <CustomTable<ICertification>
          tableHeads={tableHead}
          loading={isLoading || isRefetching}
          dataTableSource={data?.certifications || []}
          page_size={data?.page_size}
          total={data?.total}
          current_page={data?.current_page}
          tableEmptyState={
            <EmptyBar emptyStateSize="lg" componentType="Certification" />
          }
          tableLoader={<TableLoading title="Loading Certifications..." />}
          showPagination
          setCurrentPage={(val: number) => updateQueryParams({ page: val })}
          setLimit={(val: number) => updateQueryParams({ limit: val })}
          onRowClick={(row: ICertification) => {
            navigate(
              `/${AgencyUserPath.certificationDetial(row?.id, 'collected')}`,
            );
          }}
        />
      </div>

      {modalState?.modalType === 'collectedFilterForm' && (
        <AgencyCertificationFilterForm
          closeModalBox={closeFilterBox}
          filterForm={certificationForm}
          onSubmitForm={submitFilter}
          clearFunction={() =>
            updateQueryParams({
              page: 1,
              limit: 10,
              created_at: '',
              updated_at: '',
              status: 'collected',
            })
          }
        />
      )}
    </div>
  );
}

export default CollectedCertification;
