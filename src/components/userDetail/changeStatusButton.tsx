import CustomButton from '@shared/Button';
import { toastOptions } from '@shared/Toast/Toast';
import { capitalize } from '@utils/constants';
import { toast } from 'react-toastify';
import {
  useActivateAggregator,
  useActivateFarmer,
  useDeactivateAggregator,
  useDeactivateFarmer,
} from 'services/admin.service';

function ChangeStatusButton({
  statusProp,
}: {
  statusProp: {
    id: string;
    status: string;
    userType: string;
    is_active: boolean;
  };
}) {
  const { mutate: activateFarmer, isLoading: isLoadingActivateFarmer } =
    useActivateFarmer(statusProp?.id as string);
  const { mutate: deactivateFarmer, isLoading: isLoadingDeactivateFarmer } =
    useDeactivateFarmer(statusProp?.id as string);
  const { mutate: activateAggregator, isLoading: isLoadingActivateAggregator } =
    useActivateAggregator(statusProp?.id as string);
  const {
    mutate: deactivateAggregator,
    isLoading: isLoadingDeactivateAggregator,
  } = useDeactivateAggregator(statusProp?.id as string);

  const renderAggregatorStatusFunction = () => {
    switch (statusProp?.userType === 'aggregator') {
      case statusProp?.is_active === true:
        return deactivateAggregator();
      case statusProp?.is_active === false:
        return activateAggregator();
      default:
        break;
    }
  };

  const renderFarmerStatusFunction = () => {
    switch (statusProp?.userType === 'farmer') {
      case statusProp?.is_active === true:
        return deactivateFarmer();
      case statusProp?.is_active === false:
        return activateFarmer();
      default:
        break;
    }
  };
  const toggleActiveStatus = () => {
    if (statusProp?.status !== 'active') {
      return toast.error(
        `Please approve ${capitalize(statusProp?.userType as string)} first`,
        toastOptions,
      );
    } else if (statusProp?.userType === 'farmer') {
      return renderFarmerStatusFunction();
    } else if (statusProp?.userType === 'aggregator') {
      return renderAggregatorStatusFunction();
    }
  };

  const loading =
    isLoadingActivateFarmer ||
    isLoadingDeactivateFarmer ||
    isLoadingActivateAggregator ||
    isLoadingDeactivateAggregator;

  return (
    <div>
      <CustomButton
        className={`${
          statusProp?.is_active === false
            ? 'bg-secondary-light-1'
            : 'bg-statusText-error'
        } text-primary-white text-[8px] font-[600]`}
        sx={{ borderRadius: '8px', px: 4, py: 0 }}
        onClick={toggleActiveStatus}
        loading={loading}
        loadingText="Loading..."
        disabled={loading}
        variant={loading ? 'solid' : ''}
      >
        {statusProp.is_active === false ? 'Activate' : 'Deactivate'}{' '}
        {capitalize(statusProp?.userType)}
      </CustomButton>
    </div>
  );
}

export default ChangeStatusButton;
