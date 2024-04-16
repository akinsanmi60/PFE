import { ReactComponent as LeftChevron } from '@assets/svg/leftChevron.svg';
import CustomButton from '@shared/Button';
import { capitalize } from '@utils/constants';
import DetailCard from 'components/produceDetail/detailCard';
import { useNavigate } from 'react-router-dom';
import { IMyProduceData } from 'types/produce.type';
import ContributorsAccordionCard from './accordionCard';
import { useModalContext } from '@contexts/modalContext';
import MoveProduceTo from './moveProduce';
import TableLoading from '@shared/Table/tableLoading';
import EmptyBar from '@shared/Table/tableEmpty';
import { useAuthContext } from '@contexts/authContext';
import ApproveProduceByAdmin from './approveProduce';
import { toastOptions } from '@shared/Toast/Toast';
import { toast } from 'react-toastify';
import AddProduceComponent from 'components/addProduce';
import DeleteProduce from './deleteProduce';
import {
  useGetIndividualAggregatorDependent,
  useGetIndividualFarmerDependent,
} from 'services/individualFarmerAggregator.service';
import { useGetIndividualExporterDependent } from 'services/exporter.service';
import DetailColumnHead from './detailColumnHead';
import { useGetProduceHandlers } from 'services/produce.service';
import SubmitCertification from './submitCertification';

const userArray = ['farmer', 'aggregator'];
const adminUser = ['admin', 'subAdmin'];
function ProduceCard({
  produceData,
  loading,
  refetching,
}: {
  produceData: IMyProduceData;
  loading?: boolean;
  refetching?: boolean;
}) {
  const navigate = useNavigate();
  const { modalState, handleModalOpen } = useModalContext();
  const { authUser } = useAuthContext();
  const { data: individualAggregator } = useGetIndividualAggregatorDependent();
  const { data: individualFarmer } = useGetIndividualFarmerDependent();
  const { data: individualExporter } = useGetIndividualExporterDependent();
  const {
    data: handlerData,
    isLoading,
    isRefetching,
  } = useGetProduceHandlers({
    produceID: produceData?.produce_origin as string,
  });

  const currentUserStatus = () => {
    switch (authUser?.role) {
      case 'farmer':
        return individualFarmer?.is_active;
      case 'aggregator':
        return individualAggregator?.is_active;
      case 'exporter':
        return individualExporter?.is_active;
    }
  };

  const {
    detailColumnsHeadTitleA,
    detailColumnsHeadTitleB,
    detailColumnsHeadTitleC,
  } = DetailColumnHead();

  const checkCertStatus = () => {
    if (
      produceData?.certification === 'collected' ||
      produceData?.certification === 'pending' ||
      produceData?.certification === 'processing' ||
      produceData?.certification === 'certified'
    ) {
      return true;
    } else {
      return false;
    }
  };

  const renderActionBtn = () => {
    if (userArray.includes(authUser?.role as string)) {
      return (
        <CustomButton
          sx={{ borderRadius: '8px', px: 4, py: 0 }}
          className='"w-full text-primary-white py-[2px] bg-secondary-light-1'
          onClick={() => {
            if (produceData?.can_transfer === false) {
              return toast.error(
                'Produce needs approval by admin',
                toastOptions,
              );
            }
            if (currentUserStatus() === false) {
              return toast.error(
                'Account need to be activated, please contact admin',
                toastOptions,
              );
            }
            handleModalOpen('MoveTo');
          }}
        >
          Transfer Produce
        </CustomButton>
      );
    } else if (adminUser.includes(authUser?.role as string)) {
      return (
        <CustomButton
          sx={{ borderRadius: '8px', px: 4, py: 0 }}
          className='"w-full text-primary-white py-[2px] bg-secondary-light-1'
          onClick={() => {
            if (produceData?.status === 'approved') {
              return toast.error('Produce already approved', toastOptions);
            }
            handleModalOpen('ApproveProduce');
          }}
        >
          {loading
            ? 'Loading...'
            : produceData?.status === 'approved'
            ? 'Approved'
            : 'Approve Produce'}
        </CustomButton>
      );
    } else if (authUser?.role === 'exporter') {
      return (
        <CustomButton
          className='"w-full text-primary-white py-[2px] bg-secondary-light-1'
          onClick={() => {
            if (checkCertStatus()) {
              return;
            }
            if (currentUserStatus() === false) {
              return toast.error(
                'Account need to be activated, please contact admin',
                toastOptions,
              );
            }
            handleModalOpen('submitCertification');
          }}
        >
          {checkCertStatus() ? 'Produce Submitted' : 'Submit Certification'}
        </CustomButton>
      );
    }
  };

  const handleEditProduce = () => {
    handleModalOpen('editProduce');
  };

  const handleDeleteProduce = () => {
    handleModalOpen('deleteProduce');
  };

  return (
    <div className="p-[20px] bg-primary-white">
      <div className="flex items-center gap-x-1 mb-[14px] justify-between">
        <div className="flex items-center gap-x-1">
          <LeftChevron
            className="inline-block mr-2 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h2>Detail</h2>
        </div>
        <div>{renderActionBtn()}</div>
      </div>
      {loading || refetching ? (
        <TableLoading
          title="Loading Produce Detail"
          className="xlsm:h-screen"
        />
      ) : produceData && Object.keys(produceData).length > 0 ? (
        <div className="border-[1px] border-primary-light-1 rounded-[16px] p-[24px] xlsm:p-0">
          <div className="flex justify-between items-center">
            <h1 className="text-primary-main pb-[13px] text-[20px] font-[600] tracking-normal  ">
              {capitalize(produceData?.name)}
            </h1>
            {authUser?.role === 'admin' || authUser?.role === 'subadmin'
              ? null
              : produceData?.status === 'not_approved' && (
                  <div className="flex gap-[20px]">
                    <p onClick={handleEditProduce} className="cursor-pointer">
                      Edit
                    </p>
                    <p onClick={handleDeleteProduce} className="cursor-pointer">
                      Delete
                    </p>
                  </div>
                )}
          </div>
          <div
            className="grid grid-cols-2 gap-x-[15px] sixm:grid-cols-1
         border-y-[1px] border-primary-light-1 py-[15px] "
          >
            <div>
              <DetailCard<IMyProduceData>
                detailProps={{
                  detailKeys: detailColumnsHeadTitleA,
                  produceData: produceData,
                }}
              />
            </div>
            <div className="sixm:mt-[10px]">
              <DetailCard<IMyProduceData>
                detailProps={{
                  detailKeys:
                    authUser?.role === 'exporter'
                      ? detailColumnsHeadTitleC
                      : detailColumnsHeadTitleB,
                  produceData: produceData,
                }}
              />
            </div>
          </div>
          <div className="border-y-[1px] border-primary-light-1 py-[15px]">
            <h1 className="text-primary-main mb-[10px] text-[20px] font-[600] tracking-normal">
              Ownership History
            </h1>
            {isLoading || isRefetching ? (
              <TableLoading title="Loading Ownership History" />
            ) : handlerData?.length > 0 ? (
              <ContributorsAccordionCard itemData={handlerData} />
            ) : (
              <EmptyBar emptyStateSize="sm" componentType="Ownership History" />
            )}
          </div>
        </div>
      ) : (
        <EmptyBar
          emptyStateSize="lg"
          componentType="Produce Detail not found"
        />
      )}
      {modalState?.modalType === 'MoveTo' && (
        <MoveProduceTo produce={produceData} />
      )}
      {modalState?.modalType === 'ApproveProduce' && (
        <ApproveProduceByAdmin produceData={produceData} />
      )}

      {modalState?.modalType === 'editProduce' && (
        <AddProduceComponent
          produceAddProps={{
            formTitle: 'Edit Produce',
            actionText: 'editProduce',
          }}
          produceData={produceData}
        />
      )}
      {modalState?.modalType === 'deleteProduce' && (
        <DeleteProduce id={produceData?.id as string} />
      )}
      {modalState?.modalType === 'submitCertification' && (
        <SubmitCertification id={produceData?.id as string} />
      )}
    </div>
  );
}

export default ProduceCard;
