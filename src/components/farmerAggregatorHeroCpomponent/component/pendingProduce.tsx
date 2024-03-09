import CircularProgress from '@shared/CircularProgress';
import { capitalize } from '@utils/constants';
import { IPendingProducePprop } from 'types/farmerAggregatorDash.type';

function PendingProduce({ produceValue }: IPendingProducePprop) {
  const { loading, produceDetail } = produceValue;
  return (
    <div className="bg-primary-white px-[24px] py-[10px] rounded-lg h-[112px]">
      <p className="text-[16px] font-[600] text-primary-main tracking-normal">
        Produce Name
      </p>
      {loading ? (
        <CircularProgress color="#072723" size={30} />
      ) : (
        <>
          <p className="text-[14px] font-[600] text-tertiary-light-3 my-2">
            {produceDetail?.name || '----'}
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-[14px] font-[600] text-tertiary-light-3">
              <p className="text-[14px] text-tertiary-light-3">
                Quantity:{' '}
                <span className="text-primary-main font-[600]">
                  {produceDetail?.quantity || '0'}
                </span>
              </p>
            </div>
            <div className="text-[14px] font-[600] text-tertiary-light-3">
              <p className="text-[14px] text-tertiary-light-3">
                Unit:{' '}
                <span className="text-primary-main font-[600]">
                  {capitalize(produceDetail?.unit) || 'KG'}
                </span>
              </p>
            </div>
            {produceDetail?.certification && (
              <div className="flex justify-end">
                <div className="bg-[#FFE5E6] py-[5px] px-[12px] text-[10px] text-statusText-error font-[500] rounded-lg">
                  <p>{produceDetail?.certification.toLocaleUpperCase()}</p>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default PendingProduce;
