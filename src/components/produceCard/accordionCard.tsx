import React, { useState } from 'react';
import { IProduceHandlerType } from 'types/produce.type';
import { ReactComponent as ChevronUp } from '@assets/svg/chevronUp.svg';
import { ReactComponent as DoubleMark } from '@assets/svg/chevronDown.svg';
import { formatDate } from '@utils/constants';
import DetailCard from './detailCard';

interface AccordionProps {
  itemData: IProduceHandlerType[];
  number?: number;
}

const ContributorsAccordionCard: React.FC<AccordionProps> = ({ itemData }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(prevIndex => (prevIndex === index ? null : index));
  };

  const detailColumnsHeadTitleA: {
    label: string;
    accessor: keyof IProduceHandlerType | null;
    render?: (_object: IProduceHandlerType) => React.ReactNode;
  }[] = [
    { label: 'Product ID', accessor: 'produce_id' },
    {
      label: 'Quantity',
      accessor: 'quantity',
      render: ({ quantity, unit }) =>
        `${quantity} / ${unit === null || unit === '' ? 'KG' : unit}`,
    },
    {
      label: 'Transer Date',
      accessor: 'created_at',
      render: ({ created_at }) => {
        return formatDate({ date: created_at, time: true });
      },
    },
    { label: 'Farm Location', accessor: 'produce_location' },
  ];

  return (
    <div className="w-full">
      {itemData?.map((item, index) => (
        <div
          key={index}
          className={` p-[24px] cursor-pointer ${
            activeIndex === index
              ? 'border-[1px] border-primary-light-1 rounded-2xl p-[20px]'
              : 'border-[1px] border-primary-light-1 p-[20px]'
          }`}
        >
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleAccordion(index)}
          >
            <div className="flex items-center w-full gap-x-[15px]">
              <p className="bg-[#DAFBEC] py-[2px] px-[12px] text-statusText-success font-[500] text-center rounded-lg">
                {item?.handler_user_type || 'Nil'}
              </p>
              <h3
                className={` text-[18px] xlsm:text-[15px] xlsm:leading-[21px] leading-[22px] text-primary-main ${
                  activeIndex === index ? 'font-[500]' : 'font-[400]'
                }`}
              >
                {item?.handler_name}
              </h3>
            </div>
            <div className="w-full flex items-end justify-end">
              {activeIndex === index ? (
                <div className="w-[32px] h-[32px] ease-out  duration-300 flex justify-center items-center">
                  <DoubleMark />
                </div>
              ) : (
                <div className="w-[32px] h-[32px] ease-out duration-300 flex justify-center items-center">
                  <ChevronUp />
                </div>
              )}
            </div>
          </div>
          {activeIndex === index && (
            <div className=" mt-[20px] ">
              <DetailCard<IProduceHandlerType>
                detailProps={{
                  detailKeys: detailColumnsHeadTitleA,
                  produceData: item,
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ContributorsAccordionCard;
