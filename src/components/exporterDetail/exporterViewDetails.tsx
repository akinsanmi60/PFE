import { IExporterData } from 'types/exporter.type';
import ViewExporterDetailCard from './viewExporterDetailCard';
import { IExporterTab } from '@utils/paths';
import ShowExporterAnalysis from './showExporterAnalysis';

type IViewExporterDetails = {
  exportDetailProps: {
    userData: IExporterData;
    currentTab: string;
    id: string;
    tabsHref: Record<IExporterTab, string>;
  };
};
function ViewExporterDetails({ exportDetailProps }: IViewExporterDetails) {
  const { userData, currentTab, tabsHref } = exportDetailProps;
  return (
    <div className="grid grid-cols-[470px_1fr] gap-x-3 lg:grid lg:grid-cols-1 lg:gap-y-[40px]">
      <div className="bg-primary-white sticky top-0 z-10">
        <ViewExporterDetailCard userData={exportDetailProps.userData} />
      </div>
      <div className="bg-primary-white">
        <ShowExporterAnalysis
          showAnalysisProp={{
            role: userData?.user_type,
            id: userData?.id,
            currentTab: currentTab,
            tabsHref: tabsHref,
          }}
        />
      </div>
    </div>
  );
}

export default ViewExporterDetails;
