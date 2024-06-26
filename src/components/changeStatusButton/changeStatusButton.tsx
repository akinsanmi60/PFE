import CustomButton from '@shared/Button';
import { toastOptions } from '@shared/Toast/Toast';
import { capitalize } from '@utils/constants';
import { toast } from 'react-toastify';
import {
  useActivateAgency,
  useActivateAggregator,
  useActivateExporter,
  useActivateFarmer,
  useDeactivateAgency,
  useDeactivateAggregator,
  useDeactivateExporter,
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
    useActivateFarmer();
  const { mutate: deactivateFarmer, isLoading: isLoadingDeactivateFarmer } =
    useDeactivateFarmer();
  const { mutate: activateAggregator, isLoading: isLoadingActivateAggregator } =
    useActivateAggregator();
  const {
    mutate: deactivateAggregator,
    isLoading: isLoadingDeactivateAggregator,
  } = useDeactivateAggregator();
  const { mutate: activateAgency, isLoading: isLoadingActivateAgency } =
    useActivateAgency();
  const { mutate: deactivateAgency, isLoading: isLoadingDeactivateAgency } =
    useDeactivateAgency();
  const { mutate: activateExporter, isLoading: isLoadingActivateExporter } =
    useActivateExporter();
  const { mutate: deactivateExporter, isLoading: isLoadingDeactivateExporter } =
    useDeactivateExporter();

  const renderAggregatorStatusFunction = () => {
    switch (statusProp?.userType === 'aggregator') {
      case statusProp?.is_active === true:
        return deactivateAggregator({ id: statusProp?.id });
      case statusProp?.is_active === false:
        return activateAggregator({ id: statusProp?.id });
      default:
        break;
    }
  };

  const renderFarmerStatusFunction = () => {
    switch (statusProp?.userType === 'farmer') {
      case statusProp?.is_active === true:
        return deactivateFarmer({ id: statusProp?.id });
      case statusProp?.is_active === false:
        return activateFarmer({ id: statusProp?.id });
      default:
        break;
    }
  };

  const renderAgencyStatusFunction = () => {
    switch (statusProp?.userType === 'agency') {
      case statusProp?.is_active === true:
        return deactivateAgency({ id: statusProp?.id });
      case statusProp?.is_active === false:
        return activateAgency({ id: statusProp?.id });
      default:
        break;
    }
  };

  const renderExporterStatusFunction = () => {
    switch (statusProp?.userType === 'exporter') {
      case statusProp?.is_active === true:
        return deactivateExporter({ id: statusProp?.id });
      case statusProp?.is_active === false:
        return activateExporter({ id: statusProp?.id });
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
    } else if (statusProp?.userType === 'agency') {
      return renderAgencyStatusFunction();
    } else if (statusProp?.userType === 'exporter') {
      return renderExporterStatusFunction();
    }
  };

  const loading =
    isLoadingActivateFarmer ||
    isLoadingDeactivateFarmer ||
    isLoadingActivateAggregator ||
    isLoadingDeactivateAggregator ||
    isLoadingActivateAgency ||
    isLoadingDeactivateAgency ||
    isLoadingActivateExporter ||
    isLoadingDeactivateExporter;

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
