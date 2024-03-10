import CustomPagination from '@shared/customPagination';
import { IHubProp, IRowBody } from './type';
import { formatDate } from '@utils/constants';
import defaultImage from '@assets/png/hubImgC.png';

function CustomHubTable<TData extends IRowBody>({
  dataBody,
  currentPage,
  setCurrentPage,
  total,
  page_size,
  showPagination = true,
  loading,
  tableLoader,
  tableEmptyState,
  setLimit,
  onRowClick,
}: IHubProp<TData>) {
  const dataLength = total as number;

  const itemsPerPage = page_size as number; // Number of items to display per page

  // Calculate the indexes for the current page
  const startIndex = ((currentPage as number) - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const handlePageChange = (page: number) => {
    if (setCurrentPage) {
      setCurrentPage(page);
    }
  };

  const handleSetLimit = (value: number) => {
    setLimit && setLimit(value);
  };

  return (
    <>
      <div className="bg-primary-white">
        {loading
          ? tableLoader
          : !loading && dataBody?.length > 0
          ? dataBody?.map((item, i: any) => (
              <div
                onClick={() => {
                  onRowClick && onRowClick(item);
                }}
                key={i}
                className="sixm:flex-col py-[12px] cursor-pointer  border-b-[1px] border-background-borderlight flex items-center gap-[24px] font-primary"
              >
                <div className="sixm:w-full  min-w-[240px]">
                  <img
                    src={
                      item?.images?.length === 0
                        ? defaultImage
                        : item?.images[0]
                    }
                    alt="produce"
                    className="w-[240px] h-[160px] rounded-[4px] sixm:w-full sixm:h-[320px]"
                  />
                </div>
                <div className="w-full">
                  <p className="text-[12px] leading-[16px] font-[400] text-tertiary-light-3">
                    {formatDate({ date: item?.created_at })}
                  </p>
                  <div className="mt-[12px]">
                    <p className="text-[24px] leading-[33px] font-[500] text-primary-main">
                      {item?.name}
                    </p>
                    <p className="mt-[4px] text-[14px] leading-[20px] font-[400] text-primary-lighter">
                      {item?.description}
                    </p>
                  </div>
                  <div className="mt-[12px] flex items-center gap-x-[48px] xlsm:gap-x-[15px] xlsm:flex-wrap">
                    <div className="flex items-center gap-[10px]">
                      <p className="mt-[4px] text-[14px] leading-[20px] font-[400] text-primary-lighter">
                        Quantity:
                      </p>
                      <p className="mt-[4px] text-[14px] leading-[20px] font-[500] text-primary-main">
                        {item?.quantity}
                      </p>
                    </div>
                    <div className="flex items-center gap-[10px]">
                      <p className="mt-[4px] text-[14px] leading-[20px] font-[400] text-primary-lighter">
                        Unit:
                      </p>
                      <p className="mt-[4px] text-[14px] leading-[20px] font-[500] text-primary-main">
                        {item?.unit === '' || item?.unit === null
                          ? 'KG'
                          : item?.unit}
                      </p>
                    </div>
                    <div className="flex items-center gap-[10px]">
                      <p className="mt-[4px] text-[14px] leading-[20px] font-[400] text-primary-lighter">
                        State:
                      </p>
                      <p className="mt-[4px] text-[14px] leading-[20px] font-[500] text-primary-main">
                        {item?.farm_state}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : tableEmptyState}
      </div>
      {/* pagination */}
      {loading && showPagination
        ? null
        : dataBody?.length === 0
        ? null
        : showPagination &&
          dataLength > 0 && (
            <div
              className="flex items-center justify-center mt-5"
              id="tablePagination"
            >
              <CustomPagination
                currentPage={currentPage as number}
                onChangeOfPage={handlePageChange}
                lengthOfData={dataLength}
                startIndex={startIndex}
                endIndex={endIndex}
                onChangeofPageSize={handleSetLimit}
                limit={page_size as number}
              />
            </div>
          )}
    </>
  );
}

export default CustomHubTable;
