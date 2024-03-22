import { IRowBody } from '@shared/HubTable/type';
import ViewAgencyDetail from 'components/agencyUserDetail/agencyViewDetail';
import ShowDashboardAnalysis from 'components/agencyUserDetail/showDashboardAnalysis';
import { IAgencyViewDetailPage } from 'types/agency.type';

function AgencyViewDetail<TData extends IRowBody>({
  agencyDetailProps,
}: IAgencyViewDetailPage<TData>) {
  const { userData } = agencyDetailProps;

  return (
    <div className="grid grid-cols-[470px_1fr] gap-x-3 lg:grid lg:grid-cols-1 lg:gap-y-[20px]">
      <div className="bg-primary-white sticky top-0">
        <ViewAgencyDetail userData={userData} />
      </div>
      <div className="bg-primary-white">
        <ShowDashboardAnalysis
          showAgencyAnalysisProp={{
            id: userData?.id,
            pentrar_id: userData?.pentrar_id,
            currentTab: agencyDetailProps?.currentTab,
            tabsHref: agencyDetailProps?.tabsHref,
          }}
        />
      </div>
    </div>
  );
}

export default AgencyViewDetail;
