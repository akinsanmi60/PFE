import { IProduceItemList } from 'types/pentrarHub.type';

function ProduceList({
  produceListData,
}: {
  produceListData: IProduceItemList;
}) {
  return (
    <div className="bg-primary-white">
      {produceListData?.map((item: any, i: any) => (
        <div
          key={i}
          className="py-[12px]  border-b-[1px] border-background-borderlight flex items-center gap-[24px] font-primary"
        >
          <div className="min-w-[240px]">
            <img
              src={item?.images[0]}
              alt="produce"
              className="w-[240px] h-[160px] rounded-[4px]"
            />
          </div>
          <div className="w-full">
            <p className="text-[12px] leading-[16px] font-[400] text-tertiary-light-3">
              {item?.created_at}
            </p>
            <div className="mt-[12px]">
              <p className="text-[24px] leading-[33px] font-[500] text-primary-main">
                {item?.name}
              </p>
              <p className="mt-[4px] text-[14px] leading-[20px] font-[400] text-primary-lighter">
                {item?.description}
              </p>
            </div>
            <div className="mt-[12px] flex items-center gap-[48px]">
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
                  {item?.unit}
                </p>
              </div>
              <div className="flex items-center gap-[10px]">
                <p className="mt-[4px] text-[14px] leading-[20px] font-[400] text-primary-lighter">
                  State:
                </p>
                <p className="mt-[4px] text-[14px] leading-[20px] font-[500] text-primary-main">
                  {item?.state}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProduceList;
