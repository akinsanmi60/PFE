import { CircularProgress } from '@chakra-ui/react';
import { useAuthContext } from '@contexts/authContext';
// import PendingProduce from 'components/farmerAggregatorHeroCpomponent/component/pendingProduce';
import PageContainer from 'components/Layout/PageContainer';
import { GetDasboardOfExporter } from 'services/exporter.service';

function DashBboardCounterView() {
  const { authUser } = useAuthContext();

  const { data, isLoading } = GetDasboardOfExporter({
    queryParamsId: authUser?.id as string,
  });

  return (
    <PageContainer>
      <div className="grid grid-cols-3 gap-4 sixm:grid-cols-1 font-primary">
        <div className="bg-primary-white px-[24px] py-[15px] flex flex-col gap-y-[15px] rounded-lg h-[112px]">
          <p className="text-tertiary-light-2 text-[14px] font-[500]">
            My Produce
          </p>
          <p className="text-secondary-light-1 text-[30px] font-[600] leading-[42px]">
            {isLoading ? (
              <CircularProgress color="#072723" size={30} />
            ) : (
              data?.data?.counted_produce || 0
            )}
          </p>
        </div>
        <div className="bg-primary-white px-[24px] py-[15px] flex flex-col gap-y-[15px] rounded-lg h-[112px]">
          <p className="text-tertiary-light-2 text-[14px] font-[500]">
            My Orders
          </p>
          <p className="text-secondary-light-1 text-[30px] font-[600] leading-[42px]">
            {isLoading ? (
              <CircularProgress color="#072723" size={30} />
            ) : (
              data?.data?.counted_request || 0
            )}
          </p>
        </div>
        <div className="bg-primary-white px-[24px] py-[15px] flex flex-col gap-y-[15px] rounded-lg h-[112px]">
          <p className="text-tertiary-light-2 text-[14px] font-[500]">
            Cert. Requests
          </p>
          <p className="text-secondary-light-1 text-[30px] font-[600] leading-[42px]">
            {isLoading ? (
              <CircularProgress color="#072723" size={30} />
            ) : (
              data?.data?.recent_request || 0
            )}
          </p>
        </div>
        {/* <div>
          <h3 className="text-primary-main mb-[4px] text-[14px] font-[600]">
            Pending Cert. Request
          </h3>
          <PendingProduce
            produceValue={{
              produceDetail: {},
              loading: isLoading,
            }}
          />{' '}
        </div> */}
      </div>
    </PageContainer>
  );
}

export default DashBboardCounterView;
