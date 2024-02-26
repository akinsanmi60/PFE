/* eslint-disable no-empty-pattern */

function PendingProduce({}: { produceValue?: any }) {
  return (
    <div className="bg-primary-white px-[24px] py-[10px] rounded-lg">
      <p className="text-[16px] font-[600] text-primary-main tracking-normal">
        Produce Name
      </p>
      <p className="text-[14px] font-[600] text-tertiary-light-3 my-2">
        {'nil'}
      </p>
      <div className="flex items-center justify-between gap-4">
        <div className="text-[14px] font-[600] text-tertiary-light-3">
          <p className="text-[14px] text-tertiary-light-3">
            Quantity:{' '}
            <span className="text-primary-main font-[600]">500000</span>
          </p>
        </div>
        <div className="text-[14px] font-[600] text-tertiary-light-3">
          <p className="text-[14px] text-tertiary-light-3">
            Unit: <span className="text-primary-main font-[600]">KG</span>
          </p>
        </div>
        <div className="flex justify-end">
          <div className="bg-[#FFE5E6] py-[5px] px-[12px] text-[10px] text-statusText-error font-[500] rounded-lg">
            <p>PENDING</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PendingProduce;
