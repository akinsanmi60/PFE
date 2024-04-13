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
