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

export const produceStatuses = ['approved', 'pending'] as const;

export const produceStatusOptions: {
  label: string;
  value: typeof produceStatuses[number];
}[] = [
  {
    label: 'Approved',
    value: 'approved',
  },
  {
    label: 'Pending',
    value: 'pending',
  },
];
