import CustomTable from '@shared/Table';
import EmptyBar from '@shared/Table/tableEmpty';
import SearchFilterBox from '@shared/searchFilter';
import PageContainer from 'components/Layout/PageContainer';
import AppHeader from 'components/appHeader/appHeader';
import { ReactComponent as SearchVector } from '@assets/svg/searchVector.svg';
import { ReactComponent as CloseVector } from '@assets/svg/searchClose.svg';

import { useState } from 'react';

function OfftakerList() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="">
      <AppHeader>
        <div className="flex justify-between items-center mt-[20px] px-[24px] pb-[14px] sixm:flex-col sixm:gap-y-[20px]">
          <div className="w-full">
            <h2 className="text-primary-main leading-6 font-[500] text-[18px]">
              All Offtakers
            </h2>
          </div>
          <div className="w-full">
            <SearchFilterBox
              searchBarProps={{
                placeholder: 'Search offtaker by name or ID',
                useStartAdornment: <SearchVector />,
                onSetTermChange: ({ target: { value } }) =>
                  setSearchTerm(value),
                term: searchTerm,
                useEndAdornment: (
                  <CloseVector
                    onClick={() => {
                      // updateQueryParams({ search: '' });
                      setSearchTerm('');
                    }}
                  />
                ),
              }}
              filterBtnsProps={{
                useFilterBtn: true,
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
              <EmptyBar emptyStateSize="lg" componentType="Offtakers" />
            }
          />
        </div>
      </PageContainer>
    </div>
  );
}
export default OfftakerList;
