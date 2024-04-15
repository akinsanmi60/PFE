import React, { useState } from 'react';
import { ISubmitCertificationAccordion } from 'types/produce.type';
import { ReactComponent as ChevronUp } from '@assets/svg/chevronUp.svg';
import { ReactComponent as DoubleMark } from '@assets/svg/chevronDown.svg';
import { capitalize } from '@utils/constants';
import ControlledCheckbox from '@shared/Checkbox';
import { IIndividualAgencyData } from 'types/agency.type';
import UserCard from 'components/userCard';

const AgencySearchAccordionCard: React.FC<ISubmitCertificationAccordion> = ({
  certSubmitForm,
  itemData,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const {
    control,
    watch,
    formState: { errors },
  } = certSubmitForm;
  const formValue = watch('agencyID');

  const toggleAccordion = (index: number) => {
    setActiveIndex(prevIndex => (prevIndex === index ? null : index));
  };

  const detailAColumnsTitleA: {
    label: string;
    accessor: keyof IIndividualAgencyData | null;
    render?: (_object: IIndividualAgencyData) => React.ReactNode;
  }[] = [
    {
      label: 'Address',
      accessor: 'agency_address',
    },
    {
      label: 'State',
      accessor: 'agency_state',
    },
    {
      label: 'Email',
      accessor: 'email',
    },
    {
      label: 'Phone',
      accessor: 'phone_number',
    },
  ];

  return (
    <div className="flex flex-col gap-y-[8px] h-full overflow-hidden overflow-y-auto">
      {itemData?.map((item, index) => (
        <div key={`${item?.agency_name}-${index}`}>
          <div
            className={` p-[14px] cursor-pointer ${
              activeIndex === index
                ? 'border-[1px] border-[#E6E6E6] rounded-2xl p-[10px]'
                : 'border-[1px] border-[#E6E6E6] p-[10px]'
            }`}
          >
            <div
              className={`flex items-center justify-between cursor-pointer ${
                activeIndex === index && 'border-b-[1px] border-[#E6E6E6]'
              }`}
              onClick={() => toggleAccordion(index)}
            >
              <div className="flex items-center w-full gap-x-[15px]">
                <div onClick={e => e.stopPropagation()}>
                  <ControlledCheckbox
                    control={control}
                    name="agencyID"
                    checkboxValue={item.id}
                    id={item.id}
                    checked={item?.id === formValue}
                    className=" accent-secondary-light-1"
                    showError={false}
                  />
                </div>

                <div>
                  <h3
                    className={`text-[13px] xlsm:text-[15px] xlsm:leading-[21px] leading-[18px] text-primary-main ${
                      activeIndex === index ? 'font-[500]' : 'font-[400]'
                    }`}
                  >
                    {capitalize(item?.agency_name)}
                  </h3>
                </div>
              </div>
              <div className="flex items-end justify-end">
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
              <div className="mt-[10px] ">
                <UserCard
                  detailProps={{
                    detailKeys: detailAColumnsTitleA,
                    incomingData: item,
                  }}
                />
              </div>
            )}
          </div>
          {errors.agencyID && (
            <p className="text-[10px] text-[#E03137] font-[400] mt-0 mb-3">
              {errors.agencyID.message}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default AgencySearchAccordionCard;
