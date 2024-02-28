import { ISettingProps } from './types.dto';
import { useState } from 'react';
import PersonalInformation from '@modules/common/personalInformation';
import BusinessInformation from '@modules/common/businessInformation';
import ChangePassword from '@modules/authentication/changePassword';

function SettingView({ settingProps }: ISettingProps) {
  const [active, setActive] = useState('Personal Information');
  return (
    <div className="flex gap-x-5">
      <div className="w-[30%] bg-primary-white rounded-[16px] h-[372px]  py-[30px]">
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
                    {active === sidenav.name ? sidenav.IconBlue : sidenav.Icon}
                  </span>

                  <span>{sidenav.name}</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-[70%] bg-primary-white rounded-[16px]">
        {(() => {
          switch (active) {
            case 'Personal Information':
              return <PersonalInformation />;
            case 'Business Information':
              return <BusinessInformation />;
            case 'Change Password':
              return <ChangePassword />;
          }
        })()}
      </div>
    </div>
  );
}

export default SettingView;
