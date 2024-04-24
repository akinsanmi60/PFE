import { useAuthContext } from '@contexts/authContext';
import CircularProgress from '@shared/CircularProgress';
import { AgencyUserPath } from '@utils/paths';
import PageContainer from 'components/Layout/PageContainer';
import { useNavigate } from 'react-router-dom';
import { useGetAgencyDashboard } from 'services/agency.service';

function AgencyDashboardHero() {
  const { authUser } = useAuthContext();
  const idFOrFetch =
    authUser?.agency_attached_to !== null
      ? authUser?.agency_attached_to
      : authUser?.id;
  const { data, isLoading } = useGetAgencyDashboard(idFOrFetch as string);
  const navigate = useNavigate();

  const dashObj = [
    {
      name: 'Total Certifications',
      count: data?.data?.total_certification,
      href: `/${AgencyUserPath.certifications()}`,
    },
    {
      name: 'Pending Certifications',
      count: data?.data?.total_pending,
      href: `/${AgencyUserPath.certifications()}`,
    },
    {
      name: 'Recieved Certifications',
      count: data?.data?.total_collected,
      href: `/${AgencyUserPath.certificationsTab('collected')}`,
    },
    {
      name: 'Processing Certifications',
      count: data?.data?.total_processing,
      href: `/${AgencyUserPath.certificationsTab('processing')}`,
    },
    {
      name: 'Processed Certifications',
      count: data?.data?.total_certified,
      href: `/${AgencyUserPath.certificationsTab('certified')}`,
    },
  ];

  return (
    <PageContainer>
      <div className="grid grid-cols-3 gap-4 sixm:grid-cols-1 font-primary mdxl:grid-cols-2">
        {dashObj.map(item => (
          <div
            className="bg-primary-white px-[24px] py-[15px] flex flex-col gap-y-[15px] rounded-lg h-[112px]"
            key={item.name}
            onClick={() => navigate(item.href)}
          >
            <p className="text-tertiary-light-2 text-[14px] font-[500]">
              {item?.name}
            </p>
            <p className="text-secondary-light-1 text-[30px] font-[600] leading-[42px]">
              {isLoading ? (
                <CircularProgress color="#072723" size={30} />
              ) : item?.count === undefined ? (
                0
              ) : (
                item?.count
              )}
            </p>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

export default AgencyDashboardHero;
