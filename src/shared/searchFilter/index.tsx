import { SetStateAction } from 'react';
import { IsearchFilterBox } from './searchFilter.type';
import { FaMagnifyingGlass, FaFilter } from 'react-icons/fa6';
import { useDebouncedValue } from '@hooks/useDebounce';
import { TriangleDownIcon } from '@chakra-ui/icons';

type InputSearchboxProp = {
  placeholder?: string;
  onSetTermChange: React.Dispatch<React.SetStateAction<string>>;
  term: string;
  width?: string;
};

export const InputSearchBox = ({
  placeholder,
  onSetTermChange,
  term,
  width,
}: InputSearchboxProp) => {
  const debounceDelay = 100;
  const debouncedTerm = useDebouncedValue(term, debounceDelay);
  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    onSetTermChange(e.target.value);
  };

  const widthValue = width ? width : '85%';

  return (
    <div
      className={`flex items-center rounded-[12px] border border-[#E2E8F0] px-[16px] w-[${widthValue}]`}
    >
      <FaMagnifyingGlass />
      <input
        id="searchInput"
        type="text"
        name=""
        onChange={handleChange}
        value={debouncedTerm}
        placeholder={placeholder}
        className="outline-[0px] text-md focus:outline-0 focus:border-none border-[0px] px-2 py-[4px] w-full placeholder:text-[13.5px] placeholder:text-[#64748B] PhoneInputInput"
      />
    </div>
  );
};

const SearchFilterBox = ({
  handleFilterOpen,
  placeholder,
  onSetTermChange,
  term,
  viewAddBtn,
  svg,
  btnTitle,
  handleAction,
  useArrow,
}: IsearchFilterBox) => {
  const renderActionBtn = () => {
    return (
      <>
        {viewAddBtn && (
          <div
            onClick={handleAction}
            id={btnTitle}
            className="flex  bg-[#0000FF] text-white gap-2 items-center w-[100%] border-[#E2E8F0] px-[14px] py-[7px] cursor-pointer  rounded-[12px] border"
          >
            <span>{svg}</span>
            <span className="text-[14px] leading-[20px] font-[600px] whitespace-nowrap">
              {btnTitle}
            </span>
            <span>{useArrow && <TriangleDownIcon />}</span>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="font-[Inter] z-20 sticky top-0" id="searchFilterBox">
      <div className="flex justify-between items-center">
        <div className="w-1/2">
          <InputSearchBox
            onSetTermChange={onSetTermChange}
            placeholder={placeholder as string}
            term={term as string}
          />
        </div>

        <div className="">
          <div className="flex items-end gap-2">
            <div>
              <div
                className="flex gap-2 items-center border py-[6px] px-[12px] rounded-[12px] cursor-pointer text-gray-500"
                onClick={handleFilterOpen}
                id="filterButton"
              >
                <span>
                  <FaFilter />
                </span>
                <span className="text-[14px] leading-[20px]">Filter</span>
              </div>
            </div>

            {renderActionBtn()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilterBox;
