import CustomTable from '@shared/Table';
import EmptyBar from '@shared/Table/tableEmpty';
import SearchFilterBox from '@shared/searchFilter';
import PageContainer from 'components/Layout/PageContainer';
import AppHeader from 'components/appHeader/appHeader';
import { ReactComponent as SearchVector } from '@assets/svg/searchVector.svg';
import { ReactComponent as CloseVector } from '@assets/svg/searchClose.svg';
import { useState } from 'react';
import CustomButton from '@shared/Button';
import { useModalContext } from '@contexts/modalContext';
import AddAgency from './addAgency';
import { IAgencyQuery } from 'types/admin.type';
import { useGetAllAgency } from 'services/agency.service';
import { IIndividualAgencyData } from 'types/agency.type';
import { formatDate } from '@utils/constants';
import { ITableHead } from '@shared/Table/table.interface';
import TableLoading from '@shared/Table/tableLoading';
import { useNavigate } from 'react-router-dom';
import { adminDashboardPaths } from '@utils/paths';

function AgencyList() {
  const [searchTerm, setSearchTerm] = useState('');
  const { modalState, handleModalOpen } = useModalContext();
  const [queryParams, setQueryParams] = useState({
    search: '',
    page: 1,
    limit: 10,
  });

  const updateQueryParams = (params: IAgencyQuery) => {
    setQueryParams(prev => ({ ...prev, ...params }));
  };

  const navigate = useNavigate();

  const tableHead: ITableHead<IIndividualAgencyData>[] = [
    {
      label: 'id',
      accessor: 'pentrar_id',
    },
    {
      label: 'Full Name',
      accessor: 'agency_name',
    },
    {
      label: 'Phone Number',
      accessor: 'phone_number',
    },
    {
      label: 'Last Login',
      accessor: '',
      render: ({ last_active }) => {
        return formatDate({ date: last_active, time: true });
      },
    },
    {
      label: 'Status',
      accessor: 'status',
    },
  ];

  const { data, isLoading, isRefetching } = useGetAllAgency(queryParams);

  return (
    <div className="">
      <AppHeader>
        <div className="flex justify-between items-center mt-[20px] px-[24px] pb-[14px] sixm:flex-col sixm:gap-y-[20px] xlsm:px-3">
          <div className="w-full">
            <h2 className="text-primary-main leading-6 font-[500] text-[18px]">
              All Agencies
            </h2>
          </div>
          <div className="w-full">
            <SearchFilterBox
              searchBarProps={{
                placeholder: 'Search agency by name or ID',
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
              }}
              action={
                <CustomButton
                  className="text-primary-white bg-secondary-light-1"
                  onClick={() => handleModalOpen('createAgency')}
                >
                  Add Agency
                </CustomButton>
              }
            />
          </div>
        </div>
      </AppHeader>
      <PageContainer className="pt-0">
        <div className="w-full bg-primary-white rounded-lg mt-[30px]">
          <CustomTable<IIndividualAgencyData>
            tableHeads={tableHead}
            loading={isLoading || isRefetching}
            total={data?.total}
            page_size={data?.page_size}
            dataTableSource={data?.agency_list || []}
            tableEmptyState={
              <EmptyBar emptyStateSize="lg" componentType="Agency" />
            }
            tableLoader={
              <TableLoading
                title="Loading Agencies"
                className="xlsm:h-screen"
              />
            }
            showPagination
            setCurrentPage={(val: number) => updateQueryParams({ page: val })}
            setLimit={(val: number) => updateQueryParams({ limit: val })}
            current_page={data?.current_page}
            onRowClick={row =>
              navigate(
                `/${adminDashboardPaths.agencyDetails(row?.id, 'members')}`,
              )
            }
          />
        </div>
      </PageContainer>

      {modalState?.modalType === 'createAgency' && <AddAgency />}
    </div>
  );
}
export default AgencyList;
