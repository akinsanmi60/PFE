import { useAuthContext } from '@contexts/authContext';
import CustomButton from '@shared/Button';
import CircularProgress from '@shared/CircularProgress';
import PageContainer from 'components/Layout/PageContainer';
import { ReactComponent as PlusSVG } from '@assets/svg/plusSvg.svg';
import { useGetAgencyTeamCount } from 'services/agency.service';

function TeamMemberDashboard({ onClick }: { onClick?: () => void }) {
  const { authUser } = useAuthContext();
  const idFOrFetch =
    authUser?.agency_attached_to !== null
      ? authUser?.agency_attached_to
      : authUser?.id;

  const { data, isLoading, isRefetching } = useGetAgencyTeamCount(
    idFOrFetch as string,
  );

  const dashObj = [
    {
      name: 'Total Team Members',
      count: data?.total_team_member,
    },
    {
      name: 'Field Team Members',
      count: data?.total_field_agent,
    },
    {
      name: 'Lab Team Members',
      count: data?.total_lab_agent,
    },
  ];

  return (
    <PageContainer>
      <div className="flex items-end gap-x-4 mdxl:items-start mdxl:gap-y-4 mdxl:flex-col-reverse">
        <div className="grid grid-cols-3 gap-x-4 sixm:grid-cols-1 font-primary mdxl:grid-cols-2 mdxl:w-full mdxl:gap-y-4 w-[70%]">
          {dashObj.map(item => (
            <div
              className="bg-primary-white px-[24px] py-[15px] flex flex-col gap-y-[15px] rounded-lg h-[112px]"
              key={item.name}
            >
              <p className="text-tertiary-light-2 text-[14px] font-[500]">
                {item?.name}
              </p>
              <p className="text-secondary-light-1 text-[30px] font-[600] leading-[42px]">
                {isLoading || isRefetching ? (
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
        <div className="w-[30%]">
          <CustomButton
            className="w-full text-primary-white xlsm:w-[150px]"
            onClick={onClick}
          >
            <span className="mr-2">Add Team</span>
            <span>
              <PlusSVG />
            </span>
          </CustomButton>
        </div>
      </div>
    </PageContainer>
  );
}

export default TeamMemberDashboard;
