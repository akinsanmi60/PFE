import { useAuthContext } from '@contexts/authContext';
import CircularProgress from '@shared/CircularProgress';
import PageContainer from 'components/Layout/PageContainer';
import { useGetAdminDashboard } from 'services/admin.service';

function AdminDashboardCard() {
  const { authUser } = useAuthContext();
  const { data, isLoading } = useGetAdminDashboard(authUser?.id as string);

  const dashObj = [
    {
      name: 'Total Produces',
      count: data?.data?.total_produces,
    },
    {
      name: 'Total Farmers',
      count: data?.data?.total_farmers,
    },
    {
      name: 'Total Aggregators',
      count: data?.data?.total_aggregators,
    },
    {
      name: 'Total Exporters',
      count: data?.data?.total_exporters,
    },
    {
      name: 'Total Offtakers',
      count: 0,
    },
  ];

  return (
    <PageContainer>
      <div className="grid grid-cols-3 gap-4 sixm:grid-cols-1 font-primary mdxl:grid-cols-2">
        {dashObj.map(item => (
          <div
            className="bg-primary-white px-[24px] py-[15px] flex flex-col gap-y-[15px] rounded-lg h-[112px]"
            key={item.name}
          >
            <p className="text-tertiary-light-2 text-[14px] font-[500]">
              {item?.name}
            </p>
            <p className="text-primary-main text-[30px] font-[600] leading-[42px]">
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

export default AdminDashboardCard;
