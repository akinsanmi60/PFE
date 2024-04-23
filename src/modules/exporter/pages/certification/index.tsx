import SearchFilterBox from '@shared/searchFilter';
import CustomTable from '@shared/Table';
import EmptyBar from '@shared/Table/tableEmpty';
import { ReactComponent as SearchVector } from '@assets/svg/searchVector.svg';
import { ReactComponent as CloseVector } from '@assets/svg/searchClose.svg';
import { useState } from 'react';
import { useModalContext } from '@contexts/modalContext';
import { useForm } from 'react-hook-form';
import { IFilterProduceQuery } from 'types/produce.type';
import { IFilterValues } from 'types/modal.type';
import AppHeader from 'components/appHeader/appHeader';
import PageContainer from 'components/Layout/PageContainer';
import CertificationFilterForm from './certificationFilterForm';
import { useAuthContext } from '@contexts/authContext';
import { useGetAllCertification } from 'services/certification.service';
import TableLoading from '@shared/Table/tableLoading';
import { ICertification } from 'types/certification.type';
import { ITableHead } from '@shared/Table/table.interface';
import StatusBadge, { IStatusType } from '@shared/StatusBadge';
import { capitalize, formatDate } from '@utils/constants';
import { ExporterPath } from '@utils/paths';
import { useNavigate } from 'react-router-dom';

function ExporterCertificationPage() {
  const navigate = useNavigate();
  const { authUser } = useAuthContext();
  const [searchTerm, setSearchTerm] = useState('');
  const { modalState, handleModalOpen, handleModalClose } = useModalContext();
  const [queryParams, setQueryParams] = useState({
    search: '',
    page: 1,
    limit: 10,
    created_by: authUser?.id as string,
  });

  const certificationForm = useForm<IFilterValues>({
    defaultValues: {
      status: '',
      created_at: '',
      updated_at: '',
    },
  });

  const { data, isLoading, isRefetching } = useGetAllCertification(queryParams);

  const updateQueryParams = (params: IFilterProduceQuery) => {
    setQueryParams(prev => ({ ...prev, ...params }));
    return queryParams;
  };

  const openFilterBox = () => handleModalOpen('filterCertification');

  const closeFilterBox = () => {
    handleModalClose('filterCertification');
  };

  const submitFilter = () => {
    const startDate = certificationForm.getValues('created_at') || undefined;
    const endDate = certificationForm.getValues('updated_at') || undefined;

    updateQueryParams({
      page: 1,
      status: certificationForm.getValues('status') || undefined,
      created_at: startDate,
      updated_at: endDate,
    });
    closeFilterBox();
  };

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
      label: 'Date To Be Sent',
      accessor: '',
      render: ({ send_date }) => formatDate({ date: send_date }),
    },
    {
      label: 'Quantity',
      accessor: '',
      render: ({ produce: { quantity, unit } }) =>
        `${quantity === null ? 0 : quantity}/${
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

  return (
    <div className="">
      <AppHeader>
        <div className="flex justify-between items-center mt-[20px] px-[24px] pb-[14px] sixm:flex-col sixm:gap-y-[20px] xlsm:px-3">
          <div className="w-full">
            <h2 className="text-primary-main leading-6 font-[500] text-[18px]">
              Track your certifications
            </h2>
          </div>
          <div className="w-full">
            <SearchFilterBox
              searchBarProps={{
                placeholder: 'Search certifications by name or ID',
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
      <PageContainer className="pt-0 xlsm:px-3">
        <div className="w-full bg-primary-white rounded-lg mt-[30px]">
          <CustomTable
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
              navigate(`/${ExporterPath.certificationRequestDetail(row.id)}`);
            }}
          />
        </div>
      </PageContainer>

      {modalState?.modalType === 'filterCertification' && (
        <CertificationFilterForm
          closeModalBox={closeFilterBox}
          filterForm={certificationForm}
          onSubmitForm={submitFilter}
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

export default ExporterCertificationPage;
