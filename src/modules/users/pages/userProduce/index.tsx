import SearchFilterBox from '@shared/searchFilter';
import PageContainer from 'components/Layout/PageContainer';
import { ReactComponent as SearchVector } from '@assets/svg/searchVector.svg';
import { ReactComponent as CloseVector } from '@assets/svg/searchClose.svg';
import { useState } from 'react';
import AppHeader from 'components/appHeader/appHeader';
import CustomTable from '@shared/Table';
import EmptyBar from '@shared/Table/tableEmpty';
import CustomButton from '@shared/Button';
import { useModalContext } from '@contexts/modalContext';
import AddProduceComponent from 'components/addProduce';
import { useGetMyProduce } from 'services/produce.service';
import { ITableHead } from '@shared/Table/table.interface';
import { IFilterProduceQuery, IMyProduceData } from 'types/produce.type';
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
import { IFilterValues } from '../../../../types/modal.type';
import { useForm } from 'react-hook-form';
import UserProduceFilterForm from './filterForm';

function UserProduce() {
  const [searchTerm, setSearchTerm] = useState('');
  const { authUser } = useAuthContext();
  const { modalState, handleModalOpen, handleModalClose } = useModalContext();
  const [queryParams, setQueryParams] = useState({
    search: '',
    page: 1,
    limit: 10,
  });
  const navigate = useNavigate();
  const produceForm = useForm<IFilterValues>({
    defaultValues: {
      status: '',
      created_at: '',
      updated_at: '',
    },
  });

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

  const userState =
    (individualFarmer &&
      (individualFarmer?.farm_state || individualFarmer?.coy_state)) ||
    (individualAggregator &&
      (individualAggregator?.farm_state || individualAggregator?.coy_state));

  const userAddress =
    (individualFarmer &&
      (individualFarmer?.farm_location || individualFarmer?.coy_address)) ||
    (individualAggregator &&
      (individualAggregator?.farm_location ||
        individualAggregator?.coy_address));

  const updateQueryParams = (params: IFilterProduceQuery) => {
    setQueryParams(prev => ({ ...prev, ...params }));
  };

  const { data, isLoading, isRefetching } = useGetMyProduce(queryParams);

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

  const openFilterBox = () => handleModalOpen('filterUserProduce');

  const closeFilterBox = () => {
    handleModalClose('filterUserProduce');
  };

  const submitFilter = () => {
    const startDate = produceForm.getValues('created_at') || undefined;
    const endDate = produceForm.getValues('updated_at') || undefined;

    updateQueryParams({
      page: 1,
      status:
        produceForm.getValues('status')!.length > 0
          ? (produceForm.getValues('status') as IFilterProduceQuery['status'])
          : undefined,
      created_at: startDate,
      updated_at: endDate,
    });
    closeFilterBox();
  };

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
              Manage your produce{' '}
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
              action={
                <CustomButton
                  className="text-primary-white"
                  onClick={() => {
                    if (currentUserStatus() === false) {
                      return toast.error(
                        'Account need to be activated, please contact admin',
                        toastOptions,
                      );
                    } else {
                      handleModalOpen('addProduce');
                    }
                  }}
                >
                  Add Produce
                </CustomButton>
              }
            />
          </div>
        </div>
      </AppHeader>
      <PageContainer className="pt-0">
        <CustomTable<IMyProduceData>
          children={renderText()}
          tableHeads={tableHead}
          loading={isLoading || isRefetching}
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
            navigate(`/pentrar/user/my-produce/${row.id}/details`);
          }}
        />
      </PageContainer>

      {modalState?.modalType === 'addProduce' && (
        <AddProduceComponent
          produceAddProps={{
            formTitle: 'Add Produce',
            actionText: 'addProduce',
            userAddress: userAddress as string,
            userState: userState as string,
          }}
        />
      )}

      {modalState?.modalType === 'filterUserProduce' && (
        <UserProduceFilterForm
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
    </div>
  );
}

export default UserProduce;
