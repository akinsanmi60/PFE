import { CircularProgress } from '@chakra-ui/react';
import { useAuthContext } from '@contexts/authContext';
import { ExporterPath } from '@utils/paths';
import PageContainer from 'components/Layout/PageContainer';
import { useNavigate } from 'react-router-dom';
import { GetDasboardOfExporter } from 'services/exporter.service';

function DashBboardCounterView() {
  const { authUser } = useAuthContext();

  const { data, isLoading } = GetDasboardOfExporter({
    queryParamsId: authUser?.id as string,
  });
  const navigate = useNavigate();

  return (
    <PageContainer>
      <div className="grid grid-cols-3 gap-4 sixm:grid-cols-1 font-primary">
        <div
          className="bg-primary-white px-[24px] py-[15px] flex flex-col gap-y-[15px] rounded-lg h-[112px]"
          onClick={() => navigate(`/${ExporterPath.myProduce()}`)}
        >
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
        <div
          className="bg-primary-white px-[24px] py-[15px] flex flex-col gap-y-[15px] rounded-lg h-[112px]"
          onClick={() => navigate(`/${ExporterPath.myOrder()}`)}
        >
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
      </div>
    </PageContainer>
  );
}

export default DashBboardCounterView;
