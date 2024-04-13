import CircularProgress from '@shared/CircularProgress';

type IshowDashboard = {
  dashboardProp: {
    isLoading: boolean;
    data: any;
  };
};
function ShowExporterDashboard({ dashboardProp }: IshowDashboard) {
  const incomingData = [
    {
      title: 'Total Produce',
      count: dashboardProp?.data?.counted_produce || 0,
    },
    {
      title: 'Orders',
      count: dashboardProp?.data?.approved_produce || 0,
    },
    {
      title: 'Certificates',
      count: dashboardProp?.data?.counted_request || 0,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 sixm:grid-cols-1 font-primary">
      {incomingData.map(item => (
        <div
          className="bg-primary-white px-[24px] py-[15px] flex flex-col gap-y-[5px] rounded-[12px] h-[90px] border-[1px] border-secondary-light-3"
          key={item.title}
        >
          <p className="text-primary-lighter text-[12px] font-[500]">
            {item.title}
          </p>
          <div className="text-primary-main text-[20px] font-[600] leading-[42px]">
            {dashboardProp?.isLoading ? (
              <CircularProgress color="#2AA232" size={30} />
            ) : (
              item.count
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShowExporterDashboard;
