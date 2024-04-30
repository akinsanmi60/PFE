import {
  useGetAgencyTeamTaskCount,
  useGetIndividualTeamMember,
} from 'services/agency.service';
import CircularProgress from '@shared/CircularProgress';
import AgentViewCard from './viewCard';
import EmptyBar from '@shared/Table/tableEmpty';
import { useGetIdForFetch } from 'services/auth.service';
import { useEffect } from 'react';

function TeamMemberDetailView({
  id,
  handleSetType,
}: {
  id: string;
  handleSetType: (_type: string) => void;
}) {
  const { idFOrFetch } = useGetIdForFetch();

  const {
    data: taskData,
    isLoading: taskIsLoading,
    isRefetching: taskIsRefetching,
  } = useGetAgencyTeamTaskCount(id as string, idFOrFetch as string);

  const { data, isLoading, isRefetching } = useGetIndividualTeamMember(
    id as string,
    idFOrFetch as string,
  );

  useEffect(() => {
    if (data?.agency_type) {
      handleSetType(data?.agency_type);
    }
  }, [data?.agency_type, handleSetType]);

  return (
    <div className="">
      <div
        className={`flex gap-3 mdxl:flex-col  ${
          isLoading || isRefetching || !data ? 'h-[200px]' : ''
        }`}
      >
        <div className="w-[75%] bg-primary-white rounded-lg px-[12px] py-[16px] mdxl:w-full">
          {isLoading || isRefetching ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col gap-3 items-center text-center">
                <CircularProgress color="#2AA232" size={30} />
                <p>Loading team member detail...</p>
              </div>
            </div>
          ) : data ? (
            <AgentViewCard userData={data} />
          ) : (
            <EmptyBar />
          )}
        </div>
        <div className="w-[25%] bg-primary-white rounded-lg px-[12px] py-[16px] mdxl:w-full">
          <p className="text-tertiary-light-2 text-[25px] text-center font-[500]">
            Task Count
          </p>
          <div className="flex flex-col gap-3 items-center text-center mt-[24px] font-[500] text-[45px]">
            {taskIsLoading || taskIsRefetching ? (
              <CircularProgress color="#2AA232" size={30} />
            ) : (
              taskData?.total_task || 0
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamMemberDetailView;
