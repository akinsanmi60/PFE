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

function UserProduce() {
  const [searchTerm, setSearchTerm] = useState('');
  const { modalState, handleModalOpen } = useModalContext();
  const [queryParams, setQueryParams] = useState({
    search: '',
    page: 1,
    limit: 10,
  });
  const navigate = useNavigate();

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
      label: 'Location',
      accessor: 'farm_state',
      render: ({ farm_state }) => farm_state,
    },
    {
      label: 'Quantity',
      accessor: 'quantity',
      render: ({ quantity, unit }) =>
        `${quantity}/${unit === null || unit === '' ? 'KG' : unit}`,
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

  const renderText = () => {
    return (
      <h2 className="text-primary-main leading-6 font-[500] text-[18px]">
        User Produce
      </h2>
    );
  };

  return (
    <div className="">
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
              onClick={() => handleModalOpen('addProduce')}
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

      {modalState?.modalType === 'addProduce' && <AddProduceComponent />}
    </div>
  );
}

export default UserProduce;
