import AppHeader from 'components/appHeader/appHeader';
import PageContainer from 'components/Layout/PageContainer';

function AdminSettingsPage() {
  return (
    <div>
      <AppHeader>
        <PageContainer>
          <h2 className="text-primary-main leading-6 font-[500] text-[18px]">
            Settings
          </h2>
        </PageContainer>
      </AppHeader>

      <PageContainer>AdminSettingsPage</PageContainer>
    </div>
  );
}

export default AdminSettingsPage;
