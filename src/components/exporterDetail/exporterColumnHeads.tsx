import { formatDate, capitalize } from '@utils/constants';
import React from 'react';
import { IExporterData } from 'types/exporter.type';

function ExporterColumnHeads() {
  const detailAColumnsTitleA: {
    label: string;
    accessor: keyof IExporterData | null;
    render?: (_object: IExporterData) => React.ReactNode;
  }[] = [
    {
      label: 'Comany Name',
      accessor: 'coy_name',
      render: ({ coy_name }) => {
        return capitalize(coy_name);
      },
    },

    {
      label: 'Email',
      accessor: 'email',
    },
    {
      label: 'Phone',
      accessor: 'phone_number',
    },
    {
      label: 'Date Joined',
      accessor: 'created_at',
      render: ({ created_at }) => {
        return formatDate({ date: created_at, time: true });
      },
    },
    {
      label: 'Pentrar ID',
      accessor: 'pentrar_id',
    },
  ];
  const detailAColumnsTitleB: {
    label: string;
    accessor: keyof IExporterData | null;
    render?: (_object: IExporterData) => React.ReactNode;
  }[] = [
    {
      label: 'Company Scale',
      accessor: 'coy_scale',
      render: ({ coy_scale }) => {
        return capitalize(coy_scale);
      },
    },
    {
      label: 'Tax ID',
      accessor: null,
      render: ({ tin_id }) => {
        return tin_id.toLocaleUpperCase();
      },
    },
    {
      label: 'Year Registered',
      accessor: 'coy_establishment',
      render: ({ coy_establishment }) => {
        return capitalize(coy_establishment);
      },
    },
    {
      label: 'Address',
      accessor: 'coy_address',
      render: ({ coy_address }) => {
        return capitalize(coy_address);
      },
    },
    {
      label: 'State',
      accessor: 'coy_state',
      render: ({ coy_state }) => {
        return capitalize(coy_state);
      },
    },

    {
      label: 'Last Login',
      accessor: null,
      render: ({ last_active }) => {
        return formatDate({ date: last_active, time: true });
      },
    },
    {
      label: 'Reg. Number',
      accessor: null,
      render: ({ reg_number }) => {
        return reg_number.toLocaleUpperCase();
      },
    },
    {
      label: 'Active Status',
      accessor: 'is_active',
      render: ({ is_active }) => {
        const activeStatus = is_active ? 'Active' : 'Inactive';
        return (
          <span
            className={
              is_active ? 'text-statusText-success' : 'text-statusText-error'
            }
          >
            {activeStatus}
          </span>
        );
      },
    },
  ];
  return { detailAColumnsTitleA, detailAColumnsTitleB };
}

export default ExporterColumnHeads;
