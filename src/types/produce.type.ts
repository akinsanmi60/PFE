export type IAddProducePayload = {
  name: string;
  quantity: number;
  unit: string;
  description: string;
  farm_address: string;
  harvest_date: string;
  farm_state: string;
  planting_date: string;
  storage: string;
  season: string;
  weather: string;
  images: FormData;
};
