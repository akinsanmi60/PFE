import SearchFilterBox from '@shared/searchFilter';
import AppHeader from 'components/appHeader/appHeader';
import { ReactComponent as SearchVector } from '@assets/svg/searchVector.svg';
import { useState } from 'react';
import CustomTable from '@shared/Table';
import EmptyBar from '@shared/Table/tableEmpty';
import PageContainer from 'components/Layout/PageContainer';

function ProduceList() {
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
    <div className="">
      <AppHeader>
        <div className="flex justify-between items-center mt-[20px] px-[24px] pb-[14px] sixm:flex-col sixm:gap-y-[20px]">
          <div className="w-full">
            <h2 className="text-primary-main leading-6 font-[500] text-[18px]">
              All Produce
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
          </div>
        </div>
      </AppHeader>
      <PageContainer className="pt-0">
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
    </div>
  );
}

export default ProduceList;
