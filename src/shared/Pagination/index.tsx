import { IPagination } from './pagination.interface';

const CustomPagination = ({
  startIndex,
  endIndex,
  lengthOfData,
  currentPage,
  onChangeOfPage,
}: IPagination) => {
  return (
    <div>
      <div className="text-[14px] text-[#64748B] font-[400] tracking-normal">
        <span>
          Showing {startIndex + 1 || 0} to{' '}
          {Math.min(endIndex, lengthOfData) || 0} of {lengthOfData || 0} Records
        </span>
      </div>
      <div className="flex mt-[5px]">
        <button
          onClick={() => {
            if (onChangeOfPage) {
              onChangeOfPage(currentPage - 1);
            }
          }}
          disabled={currentPage === 1}
          className="w-[60%] p-[7px] text-sm text-[#334155] rounded-l-[10px] font-[500] border-[1px] border-[#CBD5E1] disabled:border-slate-200 disabled:text-slate-400"
        >
          {'<'} Previous
        </button>
        <button
          onClick={() => {
            if (onChangeOfPage) {
              onChangeOfPage(currentPage + 1);
            }
          }}
          disabled={endIndex >= lengthOfData}
          className="w-[40%] text-sm text-[#334155] p-[7px] rounded-r-[10px] font-[500] border-[1px] border-[#CBD5E1] disabled:text-slate-400"
        >
          Next {'>'}
        </button>
      </div>
    </div>
  );
};

export default CustomPagination;
