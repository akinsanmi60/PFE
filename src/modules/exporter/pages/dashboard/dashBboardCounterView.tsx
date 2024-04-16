import { CircularProgress } from '@chakra-ui/react';
import { useAuthContext } from '@contexts/authContext';
import { ExporterPath } from '@utils/paths';
import TodoComponent from 'components/farmerAggregatorHeroCpomponent/component/todoComponent';
import PageContainer from 'components/Layout/PageContainer';
import { useNavigate } from 'react-router-dom';
import { useGetIndividualExporter } from 'services/exporter.service';
import { IExporterDashBoardCount } from 'types/farmerAggregatorDash.type';

function DashBboardCounterView({
  data,
  isLoading,
}: {
  data: IExporterDashBoardCount;
  isLoading: boolean;
}) {
  const { authUser } = useAuthContext();
  const navigate = useNavigate();

  const { data: exporterData } = useGetIndividualExporter(
    authUser?.id as string,
  );

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
          <div className="text-secondary-light-1 text-[30px] font-[600] leading-[42px]">
            {isLoading ? (
              <CircularProgress color="#072723" size={30} />
            ) : (
              data?.data?.counted_produce || 0
            )}
          </div>
        </div>
        <div
          className="bg-primary-white px-[24px] py-[15px] flex flex-col gap-y-[15px] rounded-lg h-[112px]"
          onClick={() => navigate(`/${ExporterPath.myOrder()}`)}
        >
          <p className="text-tertiary-light-2 text-[14px] font-[500]">
            My Orders
          </p>
          <div className="text-secondary-light-1 text-[30px] font-[600] leading-[42px]">
            {isLoading ? <CircularProgress color="#072723" size={30} /> : 0}
          </div>
        </div>
        <div className="bg-primary-white px-[24px] py-[15px] flex flex-col gap-y-[15px] rounded-lg h-[112px]">
          <p className="text-tertiary-light-2 text-[14px] font-[500]">
            Certifications
          </p>
          <div className="text-secondary-light-1 text-[30px] font-[600] leading-[42px]">
            {isLoading ? (
              <CircularProgress color="#072723" size={30} />
            ) : (
              data?.data?.counted_request || 0
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 sixm:grid-cols-1 font-primary mt-4">
        {exporterData?.data?.user_update_submited === false && (
          <div>
            <h3 className="text-primary-main mb-[4px] text-[14px] font-[600]">
              To Do{' '}
            </h3>
            <TodoComponent modalText="exporterProfile" />{' '}
          </div>
        )}
      </div>
    </PageContainer>
  );
}

export default DashBboardCounterView;
