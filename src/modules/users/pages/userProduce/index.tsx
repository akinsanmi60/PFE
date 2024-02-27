import SearchFilterBox from '@shared/searchFilter';
import PageContainer from 'components/Layout/PageContainer';
import { ReactComponent as SearchVector } from '@assets/svg/searchVector.svg';
import { useState } from 'react';

function UserProduce() {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <PageContainer>
      <div className="flex justify-between items-center">
        <div className="w-full">
          <h2>User Produce</h2>
        </div>
        <div className="w-full">
          <SearchFilterBox
            searchBarProps={{
              placeholder: 'Search produce by name or ID',
              useEndAdornment: <SearchVector />,
              onSetTermChange: ({ target: { value } }) => setSearchTerm(value),
              term: searchTerm,
            }}
          />
        </div>
      </div>
    </PageContainer>
  );
}

export default UserProduce;
