import CustomTable from '@shared/Table';
import EmptyBar from '@shared/Table/tableEmpty';
import SearchFilterBox from '@shared/searchFilter';
import PageContainer from 'components/Layout/PageContainer';
import AppHeader from 'components/appHeader/appHeader';
import { ReactComponent as SearchVector } from '@assets/svg/searchVector.svg';
import { useState } from 'react';

function AgencyList() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="h-screen">
      <AppHeader>
        <div className="flex justify-between items-center mt-[20px] px-[24px] pb-[14px] sixm:flex-col sixm:gap-y-[20px]">
          <div className="w-full">
            <h2 className="text-primary-main leading-6 font-[500] text-[18px]">
              All Agencies
            </h2>
          </div>
          <div className="w-full flex justify-between items-center gap-x-[15px] ">
            <SearchFilterBox
              searchBarProps={{
                placeholder: 'Search agency by name or ID',
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
            tableHeads={[]}
            dataTableSource={[]}
            tableEmptyState={
              <EmptyBar emptyStateSize="lg" componentType="Agency" />
            }
          />
        </div>
      </PageContainer>
    </div>
  );
}
export default AgencyList;
