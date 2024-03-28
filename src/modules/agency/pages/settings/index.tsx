import AppHeader from 'components/appHeader/appHeader';
import PageContainer from 'components/Layout/PageContainer';

function Settings() {
  return (
    <div>
      <AppHeader>
        <p className="text-primary-main leading-6 font-[500] text-[18px] mt-[24px] px-[24px] pb-[14px]">
          Settings
        </p>
      </AppHeader>
      <PageContainer className="pt-0"></PageContainer>
    </div>
  );
}

export default Settings;
