import CircularProgress from '@shared/CircularProgress';
import { useGetAgencyDashboard } from 'services/agency.service';
import { IAgencyShowTableSummary } from 'types/agency.type';

function ShowDashboardOfAgency({ analysisProp }: IAgencyShowTableSummary) {
  const { data, isLoading } = useGetAgencyDashboard(analysisProp?.id as string);

  const incomingData = [
    {
      title: 'Total Certs',
      count: data?.data?.total_certification,
    },
    {
      title: 'Approved Certs',
      count: data?.data?.total_certified,
    },
    {
      title: 'Pending Certs',
      count: data?.data?.total_pending,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 sixm:grid-cols-1 font-primary">
      {incomingData.map(item => (
        <div
          className="bg-primary-white px-[24px] py-[15px] flex flex-col gap-y-[5px] rounded-[12px] h-[90px] border-[1px] border-secondary-light-3"
          key={item.title}
        >
          <p className="text-primary-lighter text-[14px] font-[500]">
            {item.title}
          </p>
          <p className="text-primary-main text-[20px] font-[600] leading-[42px]">
            {isLoading ? (
              <CircularProgress color="#2AA232" size={30} />
            ) : item?.count === undefined ? (
              0
            ) : (
              item?.count
            )}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ShowDashboardOfAgency;
