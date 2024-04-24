import AppHeader from 'components/appHeader/appHeader';
import PageContainer from 'components/Layout/PageContainer';
import { useParams, useNavigate } from 'react-router-dom';
import { ReactComponent as LeftChevron } from '@assets/svg/leftChevron.svg';
import { useAuthContext } from '@contexts/authContext';
import { useGetCertificationById } from 'services/certification.service';
import TableLoading from '@shared/Table/tableLoading';
import EmptyBar from '@shared/Table/tableEmpty';
import CertifcationDetail from 'components/certifcationDetail';

function CertificationDetailView() {
  const { id } = useParams();
  const { authUser } = useAuthContext();
  const userId =
    authUser?.role === 'agency' || authUser?.role === 'exporter'
      ? authUser?.id
      : authUser?.agency_attached_to;
  const navigate = useNavigate();
  const { data, isLoading, isRefetching } = useGetCertificationById(
    id as string,
    userId as string,
    authUser?.role as string,
  );
  return (
    <div>
      <AppHeader />
      <PageContainer className="xlsm:px-3">
        <div className="p-[20px] bg-primary-white">
          <div className="flex items-center gap-x-1 mb-[14px] justify-between">
            <div className="flex items-center gap-x-1">
              <LeftChevron
                className="inline-block mr-2 cursor-pointer"
                onClick={() => navigate(-1)}
              />
              <h2>Certification Detail</h2>
            </div>
          </div>
          {isLoading || isRefetching ? (
            <TableLoading
              title="Certification Detail"
              className="xlsm:h-screen"
            />
          ) : data ? (
            <CertifcationDetail certDetail={{ certData: data }} />
          ) : (
            <EmptyBar
              emptyStateSize="lg"
              componentType="Certification Detail not found"
            />
          )}
        </div>
      </PageContainer>
    </div>
  );
}

export default CertificationDetailView;
