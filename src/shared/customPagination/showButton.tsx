import { useState } from 'react';
import { ICustomPagination } from './pagination.interface';
import { ReactComponent as ChevronUp } from '@assets/svg/chevron-up.svg';
import { ReactComponent as DoubleMark } from '@assets/svg/doubleMark.svg';

const pageSizeOptions = [5, 10, 20, 30, 40, 50];

function ShowButton({ onChangeofPageSize, limit }: Partial<ICustomPagination>) {
  const [selectOption, setSelectOption] = useState({
    pageSize: limit ? limit : pageSizeOptions[1],
    isOpen: false,
  });
  const handleOpenOption = () => {
    setSelectOption({
      ...selectOption,
      isOpen: !selectOption.isOpen,
    });
  };

  return (
    <div>
      <div
        className="rounded-[8px] cursor-pointer py-[10px] px-[11px] border-[1px] border-gray-100 flex items-center gap-x-[9px] w-[100px]"
        onClick={handleOpenOption}
      >
        <div className="w-[80%]">
          <p className=" font-[500] text-[12px] leading-[19px] text-dark-500 ">
            Show {selectOption.pageSize}
          </p>
        </div>
        <div className="w-[20%]">
          <ChevronUp className="w-[15px] h-[10px]" />
        </div>
      </div>
      {selectOption.isOpen && (
        <div className="absolute bottom-0 right-0 mb-[50px] border-[1px] px-[10px] pb-[9px] rounded-[8px] z-50 max-h-[120px] translate-y-1 overflow-auto   border-solid border-[#DFE2E2] bg-primary-white text-[#131515] scrollbar-thin scrollbar-none text-[12px]">
          {pageSizeOptions.map(item => {
            return (
              <p
                onClick={() => {
                  if (onChangeofPageSize) {
                    onChangeofPageSize(item);
                    setSelectOption({
                      pageSize: item,
                      isOpen: false,
                    });
                  }
                }}
                key={item}
                className="cursor-pointer flex justify-between items-center gap-3 mt-[9px]"
              >
                {item} Pages{' '}
                {selectOption.pageSize === item && (
                  <DoubleMark className="w-[15px] h-[10px]" />
                )}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ShowButton;
