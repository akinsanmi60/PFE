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
import { useAuthContext } from '@contexts/authContext';
import { useGetMyProduce } from 'services/produce.service';
import { GET_USER_PRODUCE_URL } from '@utils/apiUrl';
import { ITableHead } from '@shared/Table/table.interface';
import { IMyProduceData } from 'types/produce.type';
import { formatDate } from '@utils/constants';
import TableLoading from '@shared/Table/tableLoading';

function UserProduce() {
  const [searchTerm, setSearchTerm] = useState('');
  const { modalState, handleModalOpen } = useModalContext();
  const { authUser } = useAuthContext();

  const { data, isLoading } = useGetMyProduce({
    queryParamsId: authUser?.id as string,
    userType: authUser?.role as string,
    url: GET_USER_PRODUCE_URL,
  });

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
      render: ({ quantity, unit }) => `${quantity}/${unit}`,
    },
    {
      label: 'Last Updated',
      accessor: '',
      render: ({ updated_at }) => {
        return formatDate({ date: updated_at });
      },
    },
    {
      label: 'Action',
      accessor: '',
      render: () => null,
    },
  ];
  return (
    <div className="h-screen">
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
                onSetTermChange: ({ target: { value } }) =>
                  setSearchTerm(value),
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
        <div className="w-full bg-primary-white rounded-lg mt-[30px] p-[24px]">
          <h2 className="text-primary-main leading-6 font-[500] text-[18px] mb-[15px]">
            User Produce
          </h2>
          <CustomTable<IMyProduceData>
            tableHeads={tableHead}
            loading={isLoading}
            dataTableSource={data?.data?.produces_list || []}
            tableEmptyState={
              <EmptyBar emptyStateSize="lg" componentType="produces" />
            }
            tableLoader={<TableLoading title="Loading Produces" />}
            showPagination={true}
          />
        </div>
      </PageContainer>

      {modalState?.modalType === 'addProduce' && <AddProduceComponent />}
    </div>
  );
}

export default UserProduce;
