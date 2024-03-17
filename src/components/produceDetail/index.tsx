import { ReactComponent as LeftChevron } from '@assets/svg/leftChevron.svg';
import CustomButton from '@shared/Button';
import StatusBadge, { IStatusType } from '@shared/StatusBadge';
import { formatDate } from '@utils/constants';
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

const userArray = ['farmer', 'exporter', 'aggregator'];
function ProduceCard({
  produceData,
  loading,
}: {
  produceData: IMyProduceData;
  loading?: boolean;
}) {
  const navigate = useNavigate();
  const { modalState, handleModalOpen } = useModalContext();
  const { authUser } = useAuthContext();

  const detailColumnsHeadTitleA: {
    label: string;
    accessor: keyof IMyProduceData | null;
    render?: (_object: IMyProduceData) => React.ReactNode;
  }[] = [
    { label: 'Product ID', accessor: 'pentrar_produce_id' },
    {
      label: 'Quantity',
      accessor: 'quantity',
      render: ({ quantity, unit }) =>
        `${quantity} / ${unit === null || unit === '' ? 'KG' : unit}`,
    },
    {
      label: 'Harvest Date',
      accessor: 'harvest_date',
      render: ({ harvest_date }) => {
        return formatDate({ date: harvest_date });
      },
    },
    { label: 'Farm Location', accessor: 'farm_state' },
    {
      label: 'Status',
      accessor: 'status',
      render: ({ status }) => {
        return <StatusBadge status={status as IStatusType} />;
      },
    },
  ];

  const detailColumnsHeadTitleB: {
    label: string;
    accessor: keyof IMyProduceData | null;
    render?: (_object: IMyProduceData) => React.ReactNode;
  }[] = [
    { label: 'Classification', accessor: 'produce_classification' },

    {
      label: 'Planting Date',
      accessor: 'planting_date',
      render: ({ planting_date }) => {
        return formatDate({ date: planting_date });
      },
    },
    {
      label: 'Avail. on Pentrar Hub',
      accessor: 'on_pentrar_hub',
      render: ({ on_pentrar_hub }) => (on_pentrar_hub ? 'Yes' : 'No'),
    },
  ];

  const renderActionBtn = () => {
    if (userArray.includes(authUser?.role as string)) {
      return (
        <CustomButton
          className='"w-full text-primary-white py-[2px]'
          onClick={() => {
            if (produceData?.can_transfer === false) {
              return toast.error(
                'Produce needs approval by admin',
                toastOptions,
              );
            }
            handleModalOpen('MoveTo');
          }}
        >
          Transfer Produce
        </CustomButton>
      );
    } else {
      return (
        <CustomButton
          className='"w-full text-primary-white py-[2px]'
          onClick={() => {
            if (produceData?.status === 'approved') {
              return toast.error('Produce already approved', toastOptions);
            }
            handleModalOpen('ApproveProduce');
          }}
        >
          Approve Produce
        </CustomButton>
      );
    }
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
      {loading ? (
        <TableLoading title="Loading Produce Detail" />
      ) : produceData && Object.keys(produceData).length > 0 ? (
        <div className="border-[1px] border-primary-light-1 rounded-[16px] p-[24px] xlsm:p-0">
          <h1 className="text-primary-main pb-[13px] text-[20px] font-[600] tracking-normal  ">
            {produceData?.name}
          </h1>
          <div
            className="grid grid-cols-2 sixm:grid-cols-1
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
                  detailKeys: detailColumnsHeadTitleB,
                  produceData: produceData,
                }}
              />
            </div>
          </div>
          <div className="border-y-[1px] border-primary-light-1 py-[15px]">
            <h1 className="text-primary-main mb-[10px] text-[20px] font-[600] tracking-normal">
              Ownership History
            </h1>
            <ContributorsAccordionCard
              itemData={produceData?.transfer_handler}
            />
          </div>
        </div>
      ) : (
        <EmptyBar
          emptyStateSize="lg"
          componentType="Produce Detail not found"
        />
      )}
      {modalState?.modalType === 'MoveTo' && (
        <MoveProduceTo produceId={produceData?.id} />
      )}
      {modalState?.modalType === 'ApproveProduce' && (
        <ApproveProduceByAdmin produceData={produceData} />
      )}
    </div>
  );
}

export default ProduceCard;
