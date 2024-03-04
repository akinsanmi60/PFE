import Dropdown from '@shared/Select/uncontrolledSelect';
import { useEffect, useState } from 'react';
import { IPentrarHubDropdown } from 'types/pentrarHub.type';

function PopularDropdown({ popularArray, setSortObject }: IPentrarHubDropdown) {
  const [popular, setPopular] = useState('');

  useEffect(() => {
    setSortObject(prev => ({
      ...prev,
      popular: popular,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popular]);

  return (
    <div className="w-[180px]">
      <Dropdown
        dropDownArray={popularArray as string[]}
        setSelectedOption={setPopular}
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
