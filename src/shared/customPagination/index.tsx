import { ReactComponent as PrevIcon } from '@assets/svg/prev.svg';
import { ReactComponent as NextIcon } from '@assets/svg/next.svg';
import { ICustomPagination } from './pagination.interface';
import ShowButton from './showButton';

function CustomPagination({
  startIndex,
  endIndex,
  lengthOfData,
  currentPage,
  onChangeOfPage,
  onChangeofPageSize,
  limit,
  paginationArray,
}: ICustomPagination) {
  return (
    <div className="w-full mt-[24px] flex items-center justify-between relative xlsm:flex-col xlsm:gap-y-4">
      <div className="flex items-center gap-[24px]">
        <button
          className="w-[32px] h-[32px] flex justify-center items-center rounded-[8px]  border-[1px] border-gray-100 cursor-pointer"
          onClick={() => {
            if (onChangeOfPage) {
              onChangeOfPage(currentPage - 1);
            }
          }}
          disabled={currentPage === 1}
        >
          {currentPage === 1 ? (
            <PrevIcon />
          ) : (
            <NextIcon className="rotate-180" />
          )}
        </button>
        <div>
          <p className="w-[32px] h-[32px] font-[600] text-[12px] leading-[19px] text-secondary-dark-1 flex justify-center items-center rounded-[10px] bg-tertiary-light-4   cursor-pointer">
            {currentPage}
          </p>
        </div>
        <button
          className="w-[32px] h-[32px] flex justify-center items-center rounded-[8px]  border-[1px] border-gray-100 cursor-pointer"
          onClick={() => {
            if (onChangeOfPage) {
              onChangeOfPage(currentPage + 1);
            }
          }}
          disabled={endIndex >= lengthOfData}
        >
          {endIndex >= lengthOfData ? (
            <PrevIcon className="rotate-180" />
          ) : (
            <NextIcon />
          )}
        </button>
      </div>
      <div className="flex items-center gap-[16px]">
        <p className=" font-[500] text-[12px] leading-[19px] text-primary-light">
          Showing {startIndex + 1 || 0} to{' '}
          {Math.min(endIndex, lengthOfData) || 0} of {lengthOfData || 0} entries
        </p>

        <ShowButton
          onChangeofPageSize={onChangeofPageSize}
          limit={limit}
          paginationArray={paginationArray}
        />
      </div>
    </div>
  );
}

export default CustomPagination;
