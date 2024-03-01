import { SETTINGS_PAGE_NAVLIST } from '@utils/sideNaDetailsv';
import PageContainer from 'components/Layout/PageContainer';
import AppHeader from 'components/appHeader/appHeader';
import SettingView from 'components/settings';

function UserSettings() {
  return (
    <>
      <AppHeader>
        <h3 className="text-[18px] leading-[33px] font-[500] tracking-normal mt-[24px] px-[24px] pb-[14px]">
          Settings
        </h3>
      </AppHeader>
      <PageContainer className="pt-0">
        <SettingView
          settingProps={{
            navList: SETTINGS_PAGE_NAVLIST,
          }}
        />
      </PageContainer>
    </>
  );
}

export default UserSettings;
