import { MouseEvent, useEffect, useRef, useState } from 'react';

function Dropdown({
  dropDownArray,
  setSelectedOption,
  height = '67px',
  backgroundColor = 'bg-primary-white',
  dropdownTitle = 'Select a user type',
  paddingY = '20px',
  top = '60px',
}: {
  dropDownArray: string[];
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  height?: string;
  backgroundColor?: string;
  dropdownTitle?: string;
  paddingY?: string;
  top?: string;
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef<HTMLDivElement | null>(null);

  const handleInputClick = () => {
    setShowMenu(!showMenu);
  };

  // this useeffect is for closing the dropmenu on clicking outside the dropmenu
  useEffect(() => {
    const handler = (e: { target: EventTarget | null }) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target as HTMLElement)
      ) {
        setShowMenu(false);
      }
    };

    window.addEventListener('click', handler);
    return () => {
      window.removeEventListener('click', handler);
    };
  }, []);

  const handleSetValue = (e: MouseEvent<HTMLDivElement>) => {
    const clickedItem = e.target as HTMLDivElement;
    setSearchValue(clickedItem.innerText);
    if (setSelectedOption) {
      setSelectedOption(clickedItem.innerText);
    }
  };

  return (
    <div
      className={`h-[${height}] ${backgroundColor} py-[${paddingY}] relative w-full cursor-pointer rounded-tl-[12px] rounded-bl-[12px] border-none xlsm:rounded-[12px]`}
    >
      <div
        ref={inputRef}
        className="flex justify-between px-[16px] items-center"
        onClick={handleInputClick}
      >
        <p className="text-[16px] leading-[24px] text-white mr-[-30px]">
          {searchValue ? searchValue : dropdownTitle}
        </p>

        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          style={{ color: 'black' }}
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {showMenu && (
        <div
          className={`top-[${top}] absolute shadow-primary-lighter rounded-[8px] z-50 max-h-[100px] w-full translate-y-1 overflow-auto border  border-solid border-[#DFE2E2] bg-primary-white text-[#131515] scrollbar-thin scrollbar-none`}
        >
          {dropDownArray.map((value, index) => (
            <div
              key={index}
              className="cursor-pointer px-4 py-1 text-[13px] hover:bg-slate-100"
              onClick={(e: MouseEvent<HTMLDivElement>) => handleSetValue(e)}
            >
              {value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
