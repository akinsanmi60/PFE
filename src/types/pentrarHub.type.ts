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
