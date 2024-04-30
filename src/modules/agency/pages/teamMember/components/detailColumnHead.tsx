import React from 'react';
import {
  capitalize,
  formatDate,
  getFirstSwordBeforeSpace,
} from '@utils/constants';
import { IAgencyTeamData } from 'types/agency.type';
import { getUserRoleLabel } from '@utils/dataTransform';

function AgentColumnHeads() {
  const detailAColumnsTitleA: {
    label: string;
    accessor: keyof IAgencyTeamData | null;
    render?: (_object: IAgencyTeamData) => React.ReactNode;
  }[] = [
    {
      label: 'First Name',
      accessor: 'full_name',
      render: ({ full_name }) => {
        return capitalize(getFirstSwordBeforeSpace(full_name));
      },
    },
    {
      label: 'Last Name',
      accessor: 'full_name',
      render: ({ full_name }) => {
        return capitalize(getFirstSwordBeforeSpace(full_name, 'lastName'));
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
  ];
  const detailAColumnsTitleB: {
    label: string;
    accessor: keyof IAgencyTeamData | null;
    render?: (_object: IAgencyTeamData) => React.ReactNode;
  }[] = [
    {
      label: 'Agent ID',
      accessor: 'agency_team_id',
    },
    {
      label: 'Agent Type',
      accessor: 'agency_type',
      render: ({ agency_type }) => {
        return agency_type === null
          ? '--'
          : agency_type === 'labAgent'
          ? 'Lab Team Member'
          : 'Field Team Member';
      },
    },
    {
      label: 'Agent Role',
      accessor: null,
      render: ({ role }) => {
        return capitalize(getUserRoleLabel(role as string));
      },
    },
    {
      label: 'Last Updated',
      accessor: 'updated_at',
      render: ({ updated_at }) => {
        return formatDate({ date: updated_at, time: true });
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

export default AgentColumnHeads;
