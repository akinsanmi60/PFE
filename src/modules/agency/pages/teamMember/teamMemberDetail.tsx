import StatusBadge, { IStatusType } from '@shared/StatusBadge';
import { ITableHead } from '@shared/Table/table.interface';
import { capitalize, formatDate } from '@utils/constants';
import AppHeader from 'components/appHeader/appHeader';
import PageContainer from 'components/Layout/PageContainer';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { ICertification } from 'types/certification.type';
import { IFilterValues } from 'types/modal.type';
import { IFilterProduceQuery } from 'types/produce.type';
import { ReactComponent as SearchVector } from '@assets/svg/searchVector.svg';
import { ReactComponent as CloseVector } from '@assets/svg/searchClose.svg';
import SearchFilterBox from '@shared/searchFilter';
import BreadCrumbs from '@shared/BreadCrumbs';
import { AgencyUserPath, cerTabs } from '@utils/paths';
import TeamMemberDetailView from './components/teamMemberDetailView';
import { useGetIndividualTeamTask } from 'services/agency.service';
import { useGetIdForFetch } from 'services/auth.service';
import CustomTable from '@shared/Table';
import TableLoading from '@shared/Table/tableLoading';
import EmptyBar from '@shared/Table/tableEmpty';
import AgentTaskFilterForm from './agentTaskFilterForm';
import { useModalContext } from '@contexts/modalContext';

function TeamMemberDetail() {
  const { id } = useParams();
  const { modalState, handleModalOpen, handleModalClose } = useModalContext();
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();
  const { idFOrFetch } = useGetIdForFetch();

  const [searchTerm, setSearchTerm] = useState('');
  const [queryParams, setQueryParams] = useState({
    search: '',
    page: 1,
    limit: 10,
  });

  const taskForm = useForm<IFilterValues>({
    defaultValues: {
      created_at: '',
      updated_at: '',
      status: '',
    },
  });

  const updateQueryParams = (params: IFilterProduceQuery) => {
    setQueryParams(prev => ({ ...prev, ...params }));
  };

  const { data, isLoading, isRefetching } = useGetIndividualTeamTask(
    id as string,
    idFOrFetch as string,
    queryParams,
  );

  const openAgentFilterModal = (val: string) => {
    handleModalOpen(val);
  };

  const closeAgentFilterModal = (val: string) => {
    handleModalClose(val);
  };

  const submitFilter = () => {
    const startDate = taskForm.getValues('created_at') || undefined;
    const endDate = taskForm.getValues('updated_at') || undefined;
    const status = taskForm.getValues('status') || undefined;

    updateQueryParams({
      page: 1,
      created_at: startDate,
      updated_at: endDate,
      status: status,
    });

    closeAgentFilterModal('filterAgentTask');
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
      label: 'Created Date',
      accessor: '',
      render: ({ created_at }) => {
        return !created_at
          ? '--'
          : formatDate({ date: created_at as string, time: true });
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
      <AppHeader>
        <div className="flex justify-between items-center mt-[20px] px-[24px] pb-[14px] sixm:flex-col sixm:gap-y-[20px] xlsm:px-3">
          <div className="w-full">
            <h2 className="text-primary-main leading-6 font-[500] text-[18px]">
              <BreadCrumbs
                items={[
                  {
                    href: `/${AgencyUserPath.team()}`,
                    text: 'Team Members',
                  },
                  {
                    href: '',
                    text: 'Team Member Detail',
                  },
                ]}
              />
            </h2>
          </div>
          <div className="w-full">
            <SearchFilterBox
              searchBarProps={{
                placeholder: 'Search task by name or ID',
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
                onClick: () => openAgentFilterModal('filterAgentTask'),
              }}
            />
          </div>
        </div>
      </AppHeader>
      <PageContainer>
        <div className="w-full">
          <TeamMemberDetailView
            id={id as string}
            handleSetType={(val: string) => setUserType(val)}
          />
        </div>

        <div className="w-full bg-primary-white rounded-lg mt-[30px]">
          <CustomTable<ICertification>
            tableHeads={tableHead}
            loading={isLoading || isRefetching}
            dataTableSource={(data?.tasks as ICertification[]) || []}
            page_size={data?.page_size}
            total={data?.total}
            current_page={data?.current_page}
            tableEmptyState={
              <EmptyBar emptyStateSize="lg" componentType="Tasks" />
            }
            tableLoader={<TableLoading title="Loading Tasks..." />}
            showPagination
            setCurrentPage={(val: number) => updateQueryParams({ page: val })}
            setLimit={(val: number) => updateQueryParams({ limit: val })}
            onRowClick={(row: ICertification) => {
              navigate(
                `/${AgencyUserPath.certificationDetial(
                  row?.id,
                  row?.status as cerTabs,
                )}`,
              );
            }}
          />
        </div>
      </PageContainer>

      {modalState?.modalType === 'filterAgentTask' && (
        <AgentTaskFilterForm
          closeModalBox={() => closeAgentFilterModal('filterAgentTask')}
          filterForm={taskForm}
          onSubmitForm={submitFilter}
          userType={userType}
          clearFunction={() =>
            updateQueryParams({
              page: 1,
              limit: 10,
              created_at: '',
              updated_at: '',
              status: undefined,
            })
          }
        />
      )}
    </div>
  );
}

export default TeamMemberDetail;
