import AppHeader from 'components/appHeader/appHeader';
import PageContainer from 'components/Layout/PageContainer';
import ImageUpdate from './components/imageUpdate';
import ExporterChangePassword from './components/changePassword';
import ExporterPersonalInfo from './components/exporterPersonalInfo';

function ExporterSettings() {
  return (
    <div>
      <AppHeader />
      <PageContainer className="pt-0 mt-6 ">
        <div className="bg-primary-white rounded-lg p-[24px] ">
          <ImageUpdate />
          <ExporterPersonalInfo />
          <ExporterChangePassword />{' '}
        </div>
      </PageContainer>
    </div>
  );
}

export default ExporterSettings;
