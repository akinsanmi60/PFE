import AppHeader from 'components/appHeader/appHeader';
import HubAnimation from 'components/hub/hubAnimation';
import HubProduce from 'components/hub/hubProduce';
import PageContainer from 'components/Layout/PageContainer';

function ExporterPentrarHub() {
  return (
    <>
      <AppHeader>
        <p className="text-primary-main leading-6 font-[500] text-[18px] mt-[24px] px-[24px] pb-[14px]">
          Pentrar Hub
        </p>
      </AppHeader>
      <PageContainer className="pt-0">
        <HubAnimation />
        <HubProduce />
      </PageContainer>
    </>
  );
}

export default ExporterPentrarHub;
