import { SETTINGS_PAGE_NAVLIST } from '@utils/sideNaDetailsv';
import PageContainer from 'components/Layout/PageContainer';
import SettingView from 'components/settings';

function UserSettings() {
  return (
    <PageContainer>
      <h3 className="text-[18px] leading-[33px] font-[500] tracking-normal">
        Settings
      </h3>
      <SettingView
        settingProps={{
          navList: SETTINGS_PAGE_NAVLIST,
        }}
      />
    </PageContainer>
  );
}

export default UserSettings;
