import Dropdown from '@shared/Select/uncontrolledSelect';
import { useEffect, useState } from 'react';
import { IPentrarHubDropdown } from 'types/pentrarHub.type';
import { popularArray } from '@db/hubData';

function PopularDropdown({ setPopluar }: IPentrarHubDropdown) {
  const [popularProduce, setPopularProduce] = useState('');

  useEffect(() => {
    setPopluar && setPopluar(popularProduce);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popularProduce]);

  return (
    <div className="w-[180px]">
      <Dropdown
        dropDownArray={popularArray as string[]}
        setSelectedOption={setPopularProduce}
        dropdownTitle="Most popular"
        backgroundColor="bg-none"
        height="20px"
        paddingY="0px"
        top="25px"
      />
    </div>
  );
}

export default PopularDropdown;
