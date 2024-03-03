import Dropdown from '@shared/Select/uncontrolledSelect';
import { useEffect, useState } from 'react';
import { IPentrarHubDropdown } from 'types/pentrarHub.type';

function StateDropdown({ stateArray, setSortObject }: IPentrarHubDropdown) {
  const [state, setState] = useState('');

  useEffect(() => {
    setSortObject(prev => ({
      ...prev,
      state: state,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <div className="w-[130px]">
      <Dropdown
        dropDownArray={stateArray as string[]}
        setSelectedOption={setState}
        dropdownTitle="State"
        backgroundColor="none"
        height="20px"
        paddingY="0px"
        top="25px"
      />
    </div>
  );
}

export default StateDropdown;
