import { givenState } from '@db/general';
import Dropdown from '@shared/Select/uncontrolledSelect';
import { useEffect, useState } from 'react';
import { IPentrarHubDropdown } from 'types/pentrarHub.type';

function StateDropdown({ setState }: IPentrarHubDropdown) {
  const [stateChosen, setStateChosen] = useState('');

  useEffect(() => {
    setState && setState(stateChosen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateChosen]);

  return (
    <div className="w-[150px]">
      <Dropdown
        dropDownArray={givenState() as string[]}
        setSelectedOption={setStateChosen}
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
