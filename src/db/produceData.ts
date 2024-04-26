export const detailKeyA = [
  'Product ID',
  'Quantity',
  'Unit',
  'Harvest Date',
  'Farm Location',
  'Status',
];

export const storageCapacity = [
  'Below 1 sqm',
  '1-2 sqm',
  '3-5 sqm',
  'Above 5 sqm',
];

export const produceStatuses = ['approved', 'not_approved'] as const;

export const produceStatusOptions: {
  label: string;
  value: string;
}[] = [
  {
    label: 'Approved',
    value: 'approved',
  },
  {
    label: 'Not Approved',
    value: 'not_approved',
  },
];

export const adminProduceStatusOptions: {
  label: string;
  value: string;
}[] = [
  {
    label: 'Approved',
    value: 'approved',
  },
  {
    label: 'Not Approved',
    value: 'not_approved',
  },
];

export const adminProduceHubOptions: {
  label: string;
  value: string;
}[] = [
  {
    label: 'On Pentrar Hub',
    value: 'on_hub',
  },
  {
    label: 'Not On Pentrar Hub',
    value: 'not_on_hub',
  },
];
export const adminProduceOwnershipOptions: {
  label: string;
  value: string;
}[] = [
  {
    label: 'Owned Produce',
    value: 'owned',
  },
  {
    label: 'Transferred Produce',
    value: 'transferred',
  },
];

export const adminIndividualOptions: {
  label: string;
  value: string;
}[] = [
  {
    label: 'Active',
    value: 'active',
  },
  {
    label: 'Inactive',
    value: 'inactive',
  },
];

export const teamAgentOptions: {
  label: string;
  value: string;
}[] = [
  {
    label: 'Lab Agent',
    value: 'labAgent',
  },
  {
    label: 'Field Agent',
    value: 'fieldAgent',
  },
];

export const teamRoleOptions: {
  label: string;
  value: string;
}[] = [
  {
    label: 'Agency Admin',
    value: 'agencyAdmin',
  },
  {
    label: 'Agency Sub Admin',
    value: 'agencySubAdmin',
  },
];

export const transferStatuses = [
  'transfer_done',
  'in_progress',
  'declined',
] as const;

export const transferStatusOptions: {
  label: string;
  value: string;
}[] = [
  {
    label: 'Accepted',
    value: 'transfer_done',
  },
  {
    label: 'In Progress',
    value: 'in_progress',
  },
  {
    label: 'Rejected',
    value: 'decline',
  },
];

export const produceClassification = [
  'Fruit',
  'Vegetable',
  'Root',
  'Leaf',
  'Fiber',
  'Other',
];

export const certificationStatuses = [
  'pending',
  'collected',
  'processing',
  'not_certified',
  'certified',
];

export const certificationtatusOptions: {
  label: string;
  value: string;
}[] = [
  {
    label: 'Pending',
    value: 'pending',
  },
  {
    label: 'Collected',
    value: 'collected',
  },
  {
    label: 'Processing',
    value: 'processing',
  },
  {
    label: 'Certified',
    value: 'certified',
  },
];
