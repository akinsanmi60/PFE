import AppHeader from 'components/appHeader/appHeader';
import PageContainer from 'components/Layout/PageContainer';
import TeamMemberDashboard from './components/teamMemberDashboard';
import { useState } from 'react';
import { useGetAgencyTeamMember } from 'services/agency.service';
import { capitalize, formatDate } from '@utils/constants';
import StatusBadge, { IStatusType } from '@shared/StatusBadge';
import { ITableHead } from '@shared/Table/table.interface';
import { useAuthContext } from '@contexts/authContext';
import { IAgencyTeamData } from 'types/agency.type';
import EmptyBar from '@shared/Table/tableEmpty';
import TableLoading from '@shared/Table/tableLoading';
import CustomTable from '@shared/Table';
import { ReactComponent as SearchVector } from '@assets/svg/searchVector.svg';
import { ReactComponent as CloseVector } from '@assets/svg/searchClose.svg';
import { useModalContext } from '@contexts/modalContext';
import SearchFilterBox from '@shared/searchFilter';
import { IFilterProduceQuery } from 'types/produce.type';
import { useForm } from 'react-hook-form';
import { IFilterValues } from 'types/modal.type';
import TeamFilterForm from './teamFilter';
import AddTeamMember from './addTeamMember';

function TeamMember() {
  const [searchTerm, setSearchTerm] = useState('');
  const { modalState, handleModalOpen, handleModalClose } = useModalContext();

  const { authUser } = useAuthContext();

  const idFOrFetch =
    authUser?.agency_attached_to !== null
      ? authUser?.agency_attached_to
      : authUser?.id;

  const [queryParams, setQueryParams] = useState({
    search: '',
    page: 1,
    limit: 10,
  });

  const teamMemberForm = useForm<IFilterValues>({
    defaultValues: {
      is_active: '',
      agency_type: '',
      created_at: '',
      updated_at: '',
    },
  });

  const updateQueryParams = (params: IFilterProduceQuery) => {
    setQueryParams(prev => ({ ...prev, ...params }));
  };

  const { data, isLoading, isRefetching } = useGetAgencyTeamMember(
    queryParams,
    idFOrFetch as string,
  );

  const tableHead: ITableHead<IAgencyTeamData>[] = [
    {
      label: 'id',
      accessor: 'agency_team_id',
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
      label: 'Agent Classification',
      accessor: null,
      render: ({ agency_type }) => {
        return agency_type === null
          ? '--'
          : agency_type === 'labAgent'
          ? 'Lab Agent'
          : 'Field Agent';
      },
    },
    {
      label: 'Last Updated',
      accessor: '',
      render: ({ updated_at }) => {
        return !updated_at
          ? '--'
          : formatDate({ date: updated_at as string, time: true });
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

  const openTeamMemberModal = (val: string) => {
    if (val === 'addTeamMember') {
      handleModalOpen('addTeamMember');
    } else if (val === 'filterTeamMember') {
      handleModalOpen('filterTeamMember');
    }
  };

  const closeTeamMemberModal = (val: string) => {
    handleModalClose(val);
  };

  const submitFilter = () => {
    const startDate = teamMemberForm.getValues('created_at') || undefined;
    const endDate = teamMemberForm.getValues('updated_at') || undefined;
    const activeStatus = teamMemberForm.getValues('is_active') || undefined;
    const agencyType = teamMemberForm.getValues('agency_type') || undefined;

    updateQueryParams({
      page: 1,
      created_at: startDate,
      updated_at: endDate,
      is_active:
        activeStatus === 'active'
          ? true
          : activeStatus === 'inactive'
          ? false
          : undefined,
      agency_type: agencyType,
    });

    closeTeamMemberModal('filterTeamMember');
  };

  return (
    <div>
      <AppHeader>
        <div className="flex justify-between items-center mt-[20px] px-[24px] pb-[14px] sixm:flex-col sixm:gap-y-[20px] xlsm:px-3">
          <div className="w-full">
            <h2 className="text-primary-main leading-6 font-[500] text-[18px]">
              Team Member{' '}
            </h2>
          </div>
          <div className="w-full">
            <SearchFilterBox
              searchBarProps={{
                placeholder: 'Search member by name or ID',
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
                onClick: () => openTeamMemberModal('filterTeamMember'),
              }}
            />
          </div>
        </div>
      </AppHeader>
      <TeamMemberDashboard
        onClick={() => openTeamMemberModal('addTeamMember')}
      />

      <PageContainer className="pt-0">
        <div className="w-full bg-primary-white rounded-lg mt-[30px]">
          <CustomTable<IAgencyTeamData>
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
      </PageContainer>

      {modalState?.modalType === 'addTeamMember' && (
        <AddTeamMember id={idFOrFetch as string} />
      )}
      {modalState?.modalType === 'filterTeamMember' && (
        <TeamFilterForm
          closeModalBox={() => closeTeamMemberModal('filterTeamMember')}
          filterForm={teamMemberForm}
          onSubmitForm={submitFilter}
          clearFunction={() =>
            updateQueryParams({
              page: 1,
              limit: 10,
              created_at: '',
              updated_at: '',
              is_active: undefined,
              agency_type: '',
            })
          }
        />
      )}
    </div>
  );
}

export default TeamMember;
