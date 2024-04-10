import { useAuthContext } from '@contexts/authContext';
import { Account, getClass } from '@utils/constants';
import {
  useGetIndividualAggregatorDependent,
  useGetIndividualFarmerDependent,
} from 'services/individualFarmerAggregator.service';

function ShowStatus() {
  const { authUser } = useAuthContext();
  const { data: individualAggregator } = useGetIndividualAggregatorDependent();
  const { data: individualFarmer } = useGetIndividualFarmerDependent();

  const currentUserStatus = () => {
    switch (authUser?.role) {
      case 'farmer':
        return individualFarmer?.is_active;
      case 'aggregator':
        return individualAggregator?.is_active;
    }
  };

  return (
    <div>
      {authUser?.role === Account.Admin ? null : (
        <div
          className={`border-[1px] px-[16px] py-[5px] font-[600] rounded-tr-[16px] rounded-br-[16px] rounded-tl-[16px] rounded-bl-[16px] ${getClass(
            currentUserStatus() === false ? 'pending' : 'active',
          )}`}
        >
          <p>
            {currentUserStatus() === false
              ? 'Pending Verification'
              : currentUserStatus()
              ? 'Active Account'
              : 'No Status'}
          </p>
        </div>
      )}
    </div>
  );
}

export default ShowStatus;
