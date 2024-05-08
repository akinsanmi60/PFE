import StatusBadge, { IStatusType } from '@shared/StatusBadge';
import { capitalize, formatDate } from '@utils/constants';
import { IMyProduceData } from 'types/produce.type';

function DetailColumnHead() {
  const renderCertificationStatus = (certification: string) => {
    let status;
    switch (certification) {
      case 'pending':
        status = 'Pending';
        break;
      case 'not_certified':
        status = 'Not certified';
        break;
      case 'processing':
        status = 'Processing';
        break;
      case 'collected':
        status = 'Collected';
        break;
      default:
        status = 'Certified';
    }
    return <StatusBadge status={status as IStatusType} />;
  };

  const detailColumnsHeadTitleA: {
    label: string;
    accessor: keyof IMyProduceData | null;
    render?: (_object: IMyProduceData) => React.ReactNode;
  }[] = [
    { label: 'Product ID', accessor: 'pentrar_produce_id' },
    {
      label: 'Available Quantity',
      accessor: 'quantity',
      render: ({ quantity, unit }) =>
        `${quantity === null ? 0 : quantity} / ${
          unit === null || unit === '' ? 'KG' : unit
        }`,
    },

    {
      label: 'Harvest Date',
      accessor: 'harvest_date',
      render: ({ harvest_date }) => {
        return formatDate({ date: harvest_date });
      },
    },
    {
      label: 'Farm Address',
      accessor: 'farm_address',
      render: ({ farm_address }) => {
        return (
          <p className="text-ellipsis line-clamp-2" title={farm_address}>
            {farm_address}
          </p>
        );
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
    {
      label: 'Certification Agency',
      accessor: 'certification_request',
      render: ({ certification_request }) => {
        const name = certification_request[0]?.agency?.agency_name;
        return capitalize(name);
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
      label: 'Ownership Type',
      accessor: 'produce_ownership',
      render: ({ produce_ownership }) => {
        return capitalize(produce_ownership);
      },
    },
    {
      label: 'Available on Pentrar Hub',
      accessor: 'on_pentrar_hub',
      render: ({ on_pentrar_hub }) => (on_pentrar_hub ? 'Yes' : 'No'),
    },
    {
      label: 'Submitted Quantity',
      accessor: 'submitted_quantity',
      render: ({ submitted_quantity, submitted_unit }) =>
        `${submitted_quantity === null ? 0 : submitted_quantity} / ${
          submitted_unit === null || submitted_unit === ''
            ? 'KG'
            : submitted_unit
        }`,
    },
    {
      label: 'Transferred Quantity',
      accessor: 'quantity_transfered',
      render: ({ quantity_transfered, unit_transfered }) =>
        `${quantity_transfered === null ? 0 : quantity_transfered} / ${
          unit_transfered === null || unit_transfered === ''
            ? 'KG'
            : unit_transfered
        }`,
    },
    {
      label: 'Certification Status',
      accessor: 'certification',
      render: ({ certification }) => {
        return renderCertificationStatus(certification);
      },
    },
  ];

  const detailColumnsHeadTitleC: {
    label: string;
    accessor: keyof IMyProduceData | null;
    render?: (_object: IMyProduceData) => React.ReactNode;
  }[] = [
    { label: 'Classification', accessor: 'produce_classification' },

    {
      label: 'Certification Status',
      accessor: 'certification',
      render: ({ certification }) => {
        return renderCertificationStatus(certification);
      },
    },

    {
      label: 'Planting Date',
      accessor: 'planting_date',
      render: ({ planting_date }) => {
        return formatDate({ date: planting_date });
      },
    },
  ];

  return {
    detailColumnsHeadTitleA,
    detailColumnsHeadTitleB,
    detailColumnsHeadTitleC,
  };
}

export default DetailColumnHead;
