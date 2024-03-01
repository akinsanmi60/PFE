import SearchFilterBox from '@shared/searchFilter';
import PageContainer from 'components/Layout/PageContainer';
import { ReactComponent as SearchVector } from '@assets/svg/searchVector.svg';
import { useState } from 'react';
import AppHeader from 'components/appHeader/appHeader';
import CustomTable from '@shared/Table';
import EmptyBar from '@shared/Table/tableEmpty';

function UserProduce() {
  const [searchTerm, setSearchTerm] = useState('');
  const tableHead = [
    {
      label: 'id',
      accessor: '',
      render: () => null,
    },
    {
      label: 'Produce Name',
      accessor: '',
      render: () => null,
    },
    {
      label: 'Location',
      accessor: '',
      render: () => null,
    },
    {
      label: 'Quantity',
      accessor: '',
      render: () => null,
    },
    {
      label: 'Last Updated',
      accessor: '',
      render: () => null,
    },
    {
      label: 'Action',
      accessor: '',
      render: () => null,
    },
  ];
  return (
    <>
      <AppHeader>
        <div className="flex justify-between items-center mt-[20px] px-[24px] pb-[14px]">
          <div className="w-full">
            <h2 className="text-primary-main leading-6 font-[500] text-[18px]">
              User Produce
            </h2>
          </div>
          <div className="w-full">
            <SearchFilterBox
              searchBarProps={{
                placeholder: 'Search produce by name or ID',
                useEndAdornment: <SearchVector />,
                onSetTermChange: ({ target: { value } }) =>
                  setSearchTerm(value),
                term: searchTerm,
              }}
            />
          </div>
        </div>
      </AppHeader>
      <PageContainer>
        <div className="w-full bg-primary-white rounded-lg mt-[30px]">
          <CustomTable
            tableHeads={tableHead}
            dataTableSource={[]}
            tableEmptyState={
              <EmptyBar emptyStateSize="lg" componentType="produces" />
            }
          />
        </div>
      </PageContainer>
    </>
  );
}

export default UserProduce;
