import PopularDropdown from './popularDropdown';
import StateDropdown from './stateDropdown';
import { useState } from 'react';

function ProduceSort({
  popularArray,
  stateArray,
}: {
  popularArray: string[];
  stateArray: string[];
}) {
  const [sortObject, setSortObject] = useState({
    popular: '',
    state: '',
  });

  console.log(sortObject);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-[24px] font-[500]">
        <p className="text-[14px] leading-[20px] font-[400] font-primary text-[#666666] text-left">
          Sort by:
        </p>
        <PopularDropdown
          popularArray={popularArray}
          setSortObject={setSortObject}
        />
        <StateDropdown setSortObject={setSortObject} stateArray={stateArray} />
      </div>
      <p className="text-[14px] leading-[20px] font-[400] text-secondary-light-2">
        Showing 1- 15 of 200 results
      </p>
    </div>
  );
}

export default ProduceSort;
