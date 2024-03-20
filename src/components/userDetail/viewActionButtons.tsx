import BreadCrumbs, { IBreadCrumbItem } from '@shared/BreadCrumbs';
import CustomButton from '@shared/Button';
import { capitalize } from '@utils/constants';
import { useApproveAggregator, useApproveFarmer } from 'services/admin.service';

function ViewActionButtons({
  id,
  userType,
  status,
  items,
}: {
  id: string;
  userType: string;
  status: string;
  items: IBreadCrumbItem[];
}) {
  const { mutate: farmerApproveMutate, isLoading: isLoadingApprove } =
    useApproveFarmer(id as string);

  const {
    mutate: aggregatorApproveMutate,
    isLoading: isLoadingApproveAggregator,
  } = useApproveAggregator(id as string);

  const handleApprove = () => {
    if (userType === 'farmer') {
      farmerApproveMutate();
    } else if (userType === 'aggregator') {
      aggregatorApproveMutate();
    }
  };

  return (
    <div className="flex justify-between items-center">
      <BreadCrumbs items={items} />
      {status === 'pending' && (
        <CustomButton
          className={`bg-secondary-light-1 text-primary-white text-[8px] font-[600]`}
          sx={{ borderRadius: '8px', px: 4, py: 0 }}
          onClick={handleApprove}
          loading={isLoadingApprove || isLoadingApproveAggregator}
          loadingText="Approving..."
        >
          Approve {capitalize(userType)}
        </CustomButton>
      )}
    </div>
  );
}

export default ViewActionButtons;
