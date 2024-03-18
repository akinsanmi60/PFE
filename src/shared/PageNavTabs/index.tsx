import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { IPageNavTab, IPageNavTabsProps } from './interface';
import { capitalize } from '@utils/constants';

const PageNavTabs = ({ tabs, currentHref }: IPageNavTabsProps) => {
  const navigate = useNavigate();

  const handleNavigating = useCallback(
    (item: IPageNavTab) => {
      navigate(item.href);
    },
    [navigate],
  );

  return (
    <div className="pt-4 pb-2" id="tabWithNavigation">
      <div className="flex items-center">
        {tabs?.map((item, i) => {
          return (
            <div
              key={i}
              className={
                capitalize(currentHref) === item.name
                  ? 'bg-secondary-light-1 text-primary-white text-[14px] font-[500] text-center  gap-2 items-center border-[#E2E8F0] px-[14px] py-[7px] cursor-pointer  rounded-[8px] border'
                  : ' text-[#475467] gap-2 items-center  font-[400] text-[14px]  px-[14px] py-[7px] cursor-pointer'
              }
              onClick={() => handleNavigating(item)}
            >
              {item.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PageNavTabs;
