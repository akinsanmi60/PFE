export type ITabNames = {
  tabsHeadsNames: string[];
  currentTabFromProps?: string;
  setCurrentTabName: React.Dispatch<React.SetStateAction<string>>;
  type?: string;
  className?: string;
};

export type IPageNavTab = {
  name: string;
  href: string;
};
export type IPageNavTabsProps = {
  tabs: IPageNavTab[];
  currentHref: string;
};
