import { useAuthContext } from '@contexts/authContext';
import CustomButton from '@shared/Button';
import CircularProgress from '@shared/CircularProgress';
import PageContainer from 'components/Layout/PageContainer';
import { ReactComponent as PlusSVG } from '@assets/svg/plusSvg.svg';

function TeamMemberDashboard() {
  const { authUser } = useAuthContext();
  const idFOrFetch =
    authUser?.agency_attached_to !== null
      ? authUser?.agency_attached_to
      : authUser?.id;
  console.log(idFOrFetch);

  const dashObj = [
    {
      name: 'Total Agents',
      count: 0,
    },
    {
      name: 'Field Agents',
      count: 0,
    },
    {
      name: 'Lab Agents',
      count: 0,
    },
  ];

  const isLoading = false;

  return (
    <PageContainer>
      <div className="flex items-end gap-x-4">
        <div className="grid grid-cols-3 gap-x-4 sixm:grid-cols-1 font-primary mdxl:grid-cols-2 w-[70%]">
          {dashObj.map(item => (
            <div
              className="bg-primary-white px-[24px] py-[15px] flex flex-col gap-y-[15px] rounded-lg h-[112px]"
              key={item.name}
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
        <div className="w-[30%]">
          <CustomButton className="w-full text-primary-white">
            <span className="mr-2">Add Agent</span>
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
