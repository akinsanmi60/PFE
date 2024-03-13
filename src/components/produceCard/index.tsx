import { ReactComponent as LeftChevron } from '@assets/svg/leftChevron.svg';
import CustomButton from '@shared/Button';
// import { detailKeyA } from '@db/produceData';
import StatusBadge, { IStatusType } from '@shared/StatusBadge';
import { formatDate } from '@utils/constants';
import DetailCard from 'components/produceCard/detailCard';
import { useNavigate } from 'react-router-dom';
import { IMyProduceData } from 'types/produce.type';
import ContributorsAccordionCard from './accordionCard';
import { useModalContext } from '@contexts/modalContext';
import MoveProduceTo from './moveProduce';

function ProduceCard({ produceData }: { produceData: IMyProduceData }) {
  const navigate = useNavigate();
  const { modalState, handleModalOpen } = useModalContext();

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
        return formatDate({ date: harvest_date, time: true });
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
        return formatDate({ date: planting_date, time: true });
      },
    },
    {
      label: 'Avail. on Pentrar Hub',
      accessor: 'on_pentrar_hub',
      render: ({ on_pentrar_hub }) => (on_pentrar_hub ? 'Yes' : 'No'),
    },
  ];

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
        <div>
          <CustomButton
            className='"w-fullS text-primary-white'
            onClick={() => handleModalOpen('MoveTo')}
          >
            Move To
          </CustomButton>
        </div>
      </div>
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
          <ContributorsAccordionCard itemData={produceData?.transfer_handler} />
        </div>
      </div>
      {modalState?.modalType === 'MoveTo' && <MoveProduceTo />}
    </div>
  );
}

export default ProduceCard;
