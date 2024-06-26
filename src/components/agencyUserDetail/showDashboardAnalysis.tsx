import ShowDashboardOfAgency from './ShowDashboardOfAgency';
import PageNavTabs from '@shared/PageNavTabs';
import { IShowAgencyAnalysis } from 'types/agency.type';
import AgencyTeamTableSummary from './agencyTeamTableSummary';
import AgencyCertificationSummary from './agencyCertificationSummary';

function ShowDashboardAnalysis({
  showAgencyAnalysisProp,
}: IShowAgencyAnalysis) {
  const tabs = [
    {
      href: showAgencyAnalysisProp.tabsHref.members,
      name: 'Members',
    },
    {
      href: showAgencyAnalysisProp.tabsHref.certification,
      name: 'Certification',
    },
  ];
  return (
    <div className="p-[20px]">
      <div className="mb-4">
        <ShowDashboardOfAgency
          analysisProp={{
            id: showAgencyAnalysisProp.id,
          }}
        />
      </div>

      <PageNavTabs
        currentHref={showAgencyAnalysisProp.currentTab}
        tabs={tabs}
      />
      <div className="w-full bg-[#E2E8F0] border[1px] h-[1px]" />

      {showAgencyAnalysisProp.currentTab === 'members' && (
        <AgencyTeamTableSummary
          analysisProp={{
            id: showAgencyAnalysisProp.id,
          }}
        />
      )}

      {showAgencyAnalysisProp.currentTab === 'certification' && (
        <AgencyCertificationSummary
          analysisProp={{
            id: showAgencyAnalysisProp.id,
          }}
        />
      )}
    </div>
  );
}

export default ShowDashboardAnalysis;
