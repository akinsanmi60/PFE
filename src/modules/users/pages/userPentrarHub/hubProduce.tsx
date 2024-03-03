import SearchFilterBox from '@shared/searchFilter';
import { ReactComponent as SearchVector } from '@assets/svg/searchVector.svg';
import { useState } from 'react';
import PopularDropdown from './popularDropdown';
import StateDropdown from './stateDropdown';
import { popularArray, stateArray } from '@db/hubData';

function HubProduce() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortObject, setSortObject] = useState({
    popular: '',
    state: '',
  });

  console.log(sortObject);

  return (
    <>
      <div className="w-full mt-[24px]">
        <SearchFilterBox
          searchBarProps={{
            placeholder: 'Search for produce',
            useStartAdornment: <SearchVector />,
            onSetTermChange: ({ target: { value } }) => setSearchTerm(value),
            term: searchTerm,
          }}
        />
      </div>
      <div className="w-full h-[500px] mt-[24px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[24px] font-[500]">
            <p className="text-[14px] leading-[20px] font-[400] font-primary text-[#666666] text-left">
              Sort by:
            </p>
            <PopularDropdown
              popularArray={popularArray}
              setSortObject={setSortObject}
            />
            <StateDropdown
              setSortObject={setSortObject}
              stateArray={stateArray}
            />
          </div>
          <p className="text-[14px] leading-[20px] font-[400] text-secondary-light-2">
            Showing 1- 15 of 200 results
          </p>
        </div>
        <div className="mt-[24px]">
          <p>HubProduce</p>
        </div>
      </div>
    </>
  );
}

export default HubProduce;
