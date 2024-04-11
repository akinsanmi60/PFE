export const detailKeyA = [
  'Product ID',
  'Quantity',
  'Unit',
  'Harvest Date',
  'Farm Location',
  'Status',
];

export const storageCapacity = [
  'Below 1 Hectare',
  '1 - 5 Hectares',
  '5 - 10 Hectares',
  '10 - 20 Hectares',
  'Above 20 Hectares',
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
