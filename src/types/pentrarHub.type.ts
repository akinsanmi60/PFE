export type IPentrarHubDropdown = {
  popularArray?: string[];
  stateArray?: string[];
  setSortObject: React.Dispatch<
    React.SetStateAction<{
      popular: string;
      state: string;
    }>
  >;
};

export type IProduceItemList = {
  created_at: string;
  name: string;
  on_pentrar_hub: boolean;
  id: string;
  pentrar_produce_id: string;
  quantity: number;
  unit: string;
  state: string;
  updated_at: string;
  images: string[];
  description: string;
  harvest_date: string;
}[];
