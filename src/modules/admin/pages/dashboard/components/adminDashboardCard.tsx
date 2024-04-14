import { useAuthContext } from '@contexts/authContext';
import CircularProgress from '@shared/CircularProgress';
import { adminDashboardPaths } from '@utils/paths';
import PageContainer from 'components/Layout/PageContainer';
import { useNavigate } from 'react-router-dom';
import { useGetAdminDashboard } from 'services/admin.service';

function AdminDashboardCard() {
  const { authUser } = useAuthContext();
  const { data, isLoading } = useGetAdminDashboard(authUser?.id as string);
  const navigate = useNavigate();

  const dashObj = [
    {
      name: 'Total Produce',
      count: data?.data?.total_produces,
      action: `${adminDashboardPaths.produceRootPath()}`,
    },
    {
      name: 'Total Farmers',
      count: data?.data?.total_farmers,
      action: `${adminDashboardPaths.farmerRootPath()}`,
    },
    {
      name: 'Total Aggregators',
      count: data?.data?.total_aggregators,
      action: `${adminDashboardPaths.aggregatorRootPath()}`,
    },
    {
      name: 'Total Exporters',
      count: data?.data?.total_exporters,
      action: `${adminDashboardPaths.exporterRootPath()}`,
    },
    {
      name: 'Total Offtakers',
      count: 0,
      action: `${adminDashboardPaths.offtakerRootPath()}`,
    },
  ];

  return (
    <PageContainer>
      <div className="grid grid-cols-3 gap-4 sixm:grid-cols-1 font-primary mdxl:grid-cols-2">
        {dashObj.map(item => (
          <div
            className="bg-primary-white px-[24px] py-[15px] flex flex-col gap-y-[15px] rounded-lg h-[112px] cursor-pointer"
            key={item.name}
            onClick={() => navigate(`/${item.action}`)}
          >
            <p className="text-tertiary-light-2 text-[14px] font-[500]">
              {item?.name}
            </p>
            <div className="text-secondary-light-1 text-[30px] font-[600] leading-[42px]">
              {isLoading ? (
                <CircularProgress color="#072723" size={30} />
              ) : item?.count === undefined ? (
                0
              ) : (
                item?.count
              )}
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

export default AdminDashboardCard;
