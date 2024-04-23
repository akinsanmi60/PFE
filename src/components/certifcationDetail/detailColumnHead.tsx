import { capitalize, formatDate } from '@utils/constants';
import { ICertification } from 'types/certification.type';

function CertificatioDetailColumnHead() {
  const detailColumnsHeadTitleA: {
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
      label: 'Available Quantity',
      accessor: null,
      render: ({ produce: { quantity, unit } }) =>
        `${quantity === null ? 0 : quantity} / ${
          unit === null || unit === '' ? 'KG' : unit
        }`,
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
      label: 'Certified By',
      accessor: null,
      render: ({ testing_agent }) => {
        return testing_agent === null
          ? '--'
          : capitalize(testing_agent?.full_name as string);
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
    },
  ];

  return {
    detailColumnsHeadTitleA,
  };
}

export default CertificatioDetailColumnHead;
