import SearchFilterBox from '@shared/searchFilter';
import { ReactComponent as SearchVector } from '@assets/svg/searchVector.svg';
import { useEffect, useMemo, useState } from 'react';
import { popularArray, stateArray } from '@db/hubData';
import ProduceSort from './produceSort';
import ProduceList from './produceList';
import { ReactComponent as PrevIcon } from '@assets/svg/prev.svg';
import { ReactComponent as NextIcon } from '@assets/svg/next.svg';
import { ReactComponent as ChevronUp } from '@assets/svg/chevron-up.svg';
import { produceListData } from '@db/hubData';
import { IProduceItemList } from 'types/pentrarHub.type';

function HubProduce() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<IProduceItemList>([]);

  const sortProduce = useMemo(() => {
    return <ProduceSort popularArray={popularArray} stateArray={stateArray} />;
  }, []);

  // Filter data based on search term
  useEffect(() => {
    const filtered = produceListData.filter(item =>
      item.name.toLowerCase().startsWith(searchTerm.toLowerCase()),
    );
    setFilteredData(filtered);
  }, [searchTerm]);

  const displayedData = filteredData;

  return (
    <div className=" mt-[24px] p-[24px] bg-primary-white rounded-[8px] border-[1px] border-background-borderlight">
      <div className="w-full mt-[24px]">
        <SearchFilterBox
          searchBarProps={{
            placeholder: 'Search for produce',
            useStartAdornment: <SearchVector />,
            onSetTermChange: ({ target: { value } }) => setSearchTerm(value),
            term: searchTerm,
            borderColor: '#F2F2F2',
            className: 'w-full border-[1px]',
          }}
        />
      </div>
      <div className="w-full mt-[24px]">{sortProduce}</div>
      <div className="w-full mt-[24px]">
        <ProduceList produceListData={displayedData} />
      </div>
      <div className="w-full mt-[24px] flex items-center justify-between">
        <div className="flex items-center gap-[24px]">
          <div className="w-[32px] h-[32px] flex justify-center items-center rounded-[8px]  border-[1px] border-gray-100 cursor-pointer">
            <PrevIcon />
          </div>
          <div>
            <p className="w-[32px] h-[32px] font-[600] text-[12px] leading-[19px] text-secondary-dark-1 flex justify-center items-center rounded-[10px] bg-tertiary-light-4   cursor-pointer">
              1
            </p>
          </div>
          <div className="w-[32px] h-[32px] flex justify-center items-center rounded-[8px]  border-[1px] border-gray-100 cursor-pointer">
            <NextIcon />
          </div>
        </div>
        <div className="flex items-center gap-[16px]">
          <p className=" font-[500] text-[12px] leading-[19px] text-primary-light">
            Showing 1 to 5 of 100 entries{' '}
          </p>
          <div className="rounded-[8px] cursor-pointer p-[10px] border-[1px] border-gray-100 flex items-center gap-[10px]">
            <p className=" font-[500] text-[12px] leading-[19px] text-dark-500 ">
              Show 8{' '}
            </p>
            <ChevronUp />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HubProduce;
