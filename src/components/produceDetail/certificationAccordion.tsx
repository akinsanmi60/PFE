import React, { useState } from 'react';
import { ICertification } from 'types/certification.type';
import { ReactComponent as ChevronUp } from '@assets/svg/chevronUp.svg';
import { ReactComponent as DoubleMark } from '@assets/svg/chevronDown.svg';
import DetailCard from './detailCard';
import DetailColumnHead from './detailColumnHead';
import StatusBadge, { IStatusType } from '@shared/StatusBadge';
import { capitalize } from '@utils/constants';
import { useAdminUpdateConsentMutation } from 'services/certification.service';
import CustomButton from '@shared/Button';
import { useAuthContext } from '@contexts/authContext';

interface AccordionProps {
  itemData: ICertification[];
  number?: number;
}

const adminUser = ['admin', 'subAdmin'];

const CertificationAccordionCard: React.FC<AccordionProps> = ({ itemData }) => {
  const { authUser } = useAuthContext();

  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setActiveIndex(prevIndex => (prevIndex === index ? null : index));
  };

  const { detailColumnsHeadTitleD } = DetailColumnHead();
  const consentUpdate = useAdminUpdateConsentMutation();

  return (
    <div className="flex flex-col gap-y-[10px] h-[250px] overflow-hidden overflow-y-auto">
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
            <div className="flex items-center w-full gap-x-[15px] xlsm:flex-col xlsm:justify-start xl:items-start xlsm:gap-y-[15px]">
              <StatusBadge status={item?.status as IStatusType} />
              <h3
                className={`text-[18px] xlsm:text-[15px] xlsm:leading-[21px] leading-[22px] text-primary-main ${
                  activeIndex === index ? 'font-[500]' : 'font-[400]'
                }`}
              >
                {capitalize(item?.agency?.agency_name as string) || 'Nil'}
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
              <DetailCard<ICertification>
                detailProps={{
                  detailKeys: detailColumnsHeadTitleD,
                  produceData: item,
                }}
              />
              {!item?.mail_received ? (
                item.status === 'certified' &&
                adminUser.includes(authUser?.role as string) ? (
                  <div className="flex justify-end mt-4 xlsm:justify-start xlsm:mt-5">
                    <CustomButton
                      onClick={() =>
                        consentUpdate.mutate({
                          idData: {
                            id: item?.id as string,
                            adminId: authUser?.id as string,
                          },
                        })
                      }
                      className="bg-transparent border-[1px] border-secondary-light-1 text-secondary-light-1"
                      loading={consentUpdate.isLoading}
                      loadingText="Loading..."
                    >
                      Confirm Certification
                    </CustomButton>
                  </div>
                ) : null
              ) : null}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CertificationAccordionCard;
