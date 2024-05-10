import StatusBadge, { IStatusType } from '@shared/StatusBadge';
import { capitalize, formatDate } from '@utils/constants';
import { ICertification } from 'types/certification.type';
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
      case 'inspected':
        status = 'Inspected';
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
    {
      label: 'Farm Location',
      accessor: 'farm_state',
      render: ({ farm_state }) => {
        return capitalize(farm_state);
      },
    },
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
    {
      label: 'Classification',
      accessor: 'produce_classification',
      render: ({ produce_classification }) => {
        return capitalize(produce_classification);
      },
    },

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

  const detailColumnsHeadTitleD: {
    label: string;
    accessor: keyof ICertification | null;
    render?: (_object: ICertification) => React.ReactNode;
  }[] = [
    {
      label: 'Product ID',
      accessor: null,
      render: ({ produce: { pentrar_produce_id } }) => pentrar_produce_id,
    },
    {
      label: 'Harvest Date',
      accessor: null,
      render: ({ produce: { harvest_date } }) => {
        return formatDate({ date: harvest_date as string });
      },
    },
    {
      label: 'Submit Date',
      accessor: null,
      render: ({ send_date }) => {
        return formatDate({ date: send_date as string });
      },
    },
    {
      label: 'Collected By',
      accessor: null,
      render: ({ collecting_agent }) => {
        return collecting_agent === null
          ? '--'
          : capitalize(collecting_agent?.full_name as string);
      },
    },
    {
      label: 'Processed By',
      accessor: null,
      render: ({ testing_agent }) => {
        return testing_agent === null
          ? '--'
          : capitalize(testing_agent?.full_name as string);
      },
    },
    {
      label: 'Certified By',
      accessor: null,
      render: ({ certifying_agent }) => {
        return certifying_agent === null
          ? '--'
          : capitalize(certifying_agent?.full_name as string);
      },
    },
    {
      label: 'Certification Date',
      accessor: null,
      render: ({ updated_at, status }) => {
        return status === 'certified'
          ? formatDate({ date: updated_at as string })
          : '--';
      },
    },
    {
      label: 'Pentrar Confirmation',
      accessor: null,
      render: ({ mail_received }) => {
        return mail_received === null
          ? '--'
          : mail_received === false
          ? 'No'
          : 'Yes';
      },
    },
    {
      label: 'Is Produce Treated',
      accessor: null,
      render: ({ is_treated }) => {
        return is_treated === null ? '--' : is_treated === false ? 'No' : 'Yes';
      },
    },
    {
      label: 'Treatment Name',
      accessor: null,
      render: ({ treatment_name }) => {
        return treatment_name === null
          ? '--'
          : capitalize(treatment_name as string);
      },
    },
    {
      label: 'Treatment Duration',
      accessor: null,
      render: ({ treatment_duration }) => {
        return treatment_duration === null
          ? '--'
          : capitalize(treatment_duration as string);
      },
    },
  ];

  return {
    detailColumnsHeadTitleA,
    detailColumnsHeadTitleB,
    detailColumnsHeadTitleC,
    detailColumnsHeadTitleD,
  };
}

export default DetailColumnHead;
