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

export const produceClassification = [
  'Fruit',
  'Vegetable',
  'Root',
  'Leaf',
  'Fiber',
  'Other',
];
