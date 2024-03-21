import { ISettingProps } from './types.dto';
import { useState } from 'react';
import PersonalInformation from '@modules/common/personalInformation';
import BusinessInformation from '@modules/common/businessInformation';
import ChangePassword from '@modules/authentication/changePassword';
import { useAuthContext } from '@contexts/authContext';
import { useGetIndividualFarmer } from 'services/individualFarmerAggregator.service';
import {
  GET_INDIVIDUAL_AGGREGATOR_URL,
  GET_INDIVIDUAL_FARMER_URL,
} from '@utils/apiUrl';

function SettingView({ settingProps }: ISettingProps) {
  const [active, setActive] = useState('Personal Information');
  const { authUser } = useAuthContext();

  const individualUserUrlLink = () => {
    switch (authUser?.role) {
      case 'farmer':
        return GET_INDIVIDUAL_FARMER_URL;

      case 'aggregator':
        return GET_INDIVIDUAL_AGGREGATOR_URL;

      default:
        return GET_INDIVIDUAL_FARMER_URL;
    }
  };

  const { data } = useGetIndividualFarmer({
    queryParamsId: authUser?.id as string,
    url: individualUserUrlLink(),
  });

  return (
    <>
      <div className="w-full bg-primary-white rounded-[16px] mb-[30px] py-[30px] px-[15px] lg:block hidden">
        <div className="grid grid-cols-4 gap-x-[15px] sixm:grid-cols-2 sixm:gap-y-5">
          {settingProps.navList?.map(sidenav => {
            return (
              <div
                className={
                  active === sidenav.name
                    ? 'text-primary-main  text-[14px] cursor-pointer'
                    : 'text-primary-light text-[14px] cursor-pointer'
                }
                key={sidenav.name}
                onClick={() => setActive(sidenav.name)}
              >
                <p className="text-[18px] flex-col text-center font-[400] active:font-[400]  flex items-center gap-y-3">
                  <span className="">
                    {active === sidenav.name ? sidenav.IconBlue : sidenav.Icon}
                  </span>

                  <span>{sidenav.name}</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex gap-x-5">
        <div className="w-[30%] bg-primary-white rounded-[16px] h-[372px]  py-[30px] lg:hidden">
          <div className="flex flex-col gap-y-[15px]">
            {settingProps.navList?.map(sidenav => {
              return (
                <div
                  className={
                    active === sidenav.name
                      ? 'text-primary-main px-4 mr-1 text-[14px] cursor-pointer'
                      : 'text-primary-light px-4 text-[14px] cursor-pointer'
                  }
                  key={sidenav.name}
                  onClick={() => setActive(sidenav.name)}
                >
                  <p className="text-[18px] pl-3 font-[400] h-[40px] active:font-[400]  flex items-center gap-3">
                    <span className="">
                      {active === sidenav.name
                        ? sidenav.IconBlue
                        : sidenav.Icon}
                    </span>

                    <span>{sidenav.name}</span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-[70%] bg-primary-white rounded-[16px] lg:w-full">
          {(() => {
            switch (active) {
              case 'Personal Information':
                return <PersonalInformation data={data} />;
              case 'Business Information':
                return <BusinessInformation />;
              case 'Change Password':
                return <ChangePassword />;
            }
          })()}
        </div>
      </div>
    </>
  );
}

export default SettingView;
