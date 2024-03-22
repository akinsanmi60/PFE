import { IRowBody } from '@shared/HubTable/type';
import ViewDetail from './viewDetail';
import ShowAnalysis from './showAnalysis';
import { IFarmersAggregatorTab } from '@utils/paths';

type IUserDetailPage<TData> = {
  userDetailProps: {
    id: string;
    currentTab: string;
    userData: TData;
    userType: string;
    tabsHref: Record<IFarmersAggregatorTab, string>;
  };
};

function FarmerAggregatorUserDetailPpage<TData extends IRowBody>({
  userDetailProps,
}: IUserDetailPage<TData>) {
  return (
    <div className="grid grid-cols-[470px_1fr] gap-x-3 lg:grid lg:grid-cols-1 lg:gap-y-[20px]">
      <div className="bg-primary-white sticky top-0">
        <ViewDetail userData={userDetailProps.userData} />
      </div>
      <div className="bg-primary-white">
        <ShowAnalysis
          showAnalysisProp={{
            role: userDetailProps?.userType,
            id: userDetailProps?.userData?.id,
            currentTab: userDetailProps?.currentTab,
            tabsHref: userDetailProps?.tabsHref,
          }}
        />
      </div>
    </div>
  );
}

export default FarmerAggregatorUserDetailPpage;
