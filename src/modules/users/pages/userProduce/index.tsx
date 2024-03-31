import SearchFilterBox from '@shared/searchFilter';
import PageContainer from 'components/Layout/PageContainer';
import { ReactComponent as SearchVector } from '@assets/svg/searchVector.svg';
import { useState } from 'react';
import AppHeader from 'components/appHeader/appHeader';
import CustomTable from '@shared/Table';
import EmptyBar from '@shared/Table/tableEmpty';
import CustomButton from '@shared/Button';
import { useModalContext } from '@contexts/modalContext';
import AddProduceComponent from 'components/addProduce';
import { useGetMyProduce } from 'services/produce.service';
import { ITableHead } from '@shared/Table/table.interface';
import { IMyProduceData, IUserQueryProps } from 'types/produce.type';
import { formatDate } from '@utils/constants';
import TableLoading from '@shared/Table/tableLoading';
import StatusBadge, { IStatusType } from '@shared/StatusBadge';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@contexts/authContext';
import { toastOptions } from '@shared/Toast/Toast';
import { toast } from 'react-toastify';
import {
  useGetIndividualAggregatorDependent,
  useGetIndividualFarmerDependent,
} from 'services/individualFarmerAggregator.service';

function UserProduce() {
  const [searchTerm, setSearchTerm] = useState('');
  const { authUser } = useAuthContext();
  const { modalState, handleModalOpen } = useModalContext();
  const [queryParams, setQueryParams] = useState({
    search: '',
    page: 1,
    limit: 10,
  });
  const navigate = useNavigate();

  const { data: individualAggregator } = useGetIndividualAggregatorDependent();
  const { data: individualFarmer } = useGetIndividualFarmerDependent();

  const currentUserStatus = () => {
    switch (authUser?.role) {
      case 'farmer':
        return individualFarmer?.is_active;
      case 'aggregator':
        return individualAggregator?.is_active;
    }
  };

  const updateQueryParams = (params: IUserQueryProps) => {
    setQueryParams(prev => ({ ...prev, ...params }));
  };

  const { data, isLoading } = useGetMyProduce(queryParams);

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
      label: 'Qty Submitted',
      accessor: 'submitted_quantity',
      render: ({ submitted_quantity, submitted_unit }) =>
        `${submitted_quantity === null ? 0 : submitted_quantity}/${
          submitted_unit === null || submitted_unit === ''
            ? 'KG'
            : submitted_unit
        }`,
    },
    {
      label: 'Status',
      accessor: 'status',
      render: ({ status }) => {
        return <StatusBadge status={status as IStatusType} />;
      },
    },
  ];

  const renderText = () => {
    return (
      <h2 className="text-primary-main leading-6 font-[500] text-[18px]">
        User Produce
      </h2>
    );
  };

  return (
    <div className="w-full">
      <AppHeader>
        <div className="flex justify-between items-center mt-[20px] px-[24px] pb-[14px] sixm:flex-col sixm:gap-y-[20px]">
          <div className="w-full">
            <h2 className="text-primary-main leading-6 font-[500] text-[18px]">
              Manage your produces{' '}
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
            <CustomButton
              className="text-primary-white w-[180px]"
              onClick={() => {
                if (
                  authUser?.status === 'pending' ||
                  currentUserStatus() === false
                ) {
                  return toast.error(
                    'Account not approved, please contact admin',
                    toastOptions,
                  );
                } else {
                  handleModalOpen('addProduce');
                }
              }}
            >
              Add Produce
            </CustomButton>
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
            <EmptyBar emptyStateSize="lg" componentType="produces" />
          }
          tableLoader={<TableLoading title="Loading Produces" />}
          showPagination
          onRowClick={(row: IMyProduceData) => {
            navigate(`/pentrar/user/my-produce/${row.id}/details`);
          }}
        />
      </PageContainer>

      {modalState?.modalType === 'addProduce' && (
        <AddProduceComponent
          produceAddProps={{
            formTitle: 'Add Produce',
            actionText: 'addProduce',
          }}
        />
      )}
    </div>
  );
}

export default UserProduce;
