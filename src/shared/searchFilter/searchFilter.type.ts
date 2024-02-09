export type IsearchFilterBox = {
  handleFilterOpen?: () => void;
  placeholder?: string;
  onChange?: () => void;
  onSetTermChange: React.Dispatch<React.SetStateAction<string>>;
  term?: string;
  btnTitle?: string;
  handleAction?: () => void;
  viewAddBtn?: boolean;
  svg?: React.ReactNode;
  useArrow?: boolean;
};
