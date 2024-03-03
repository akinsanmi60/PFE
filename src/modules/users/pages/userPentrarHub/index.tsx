import AppHeader from 'components/appHeader/appHeader';
import HubAnimation from './hubAnimation';
import HubProduce from './hubProduce';
import PageContainer from 'components/Layout/PageContainer';

function UserPentrarHub() {
  return (
    <div>
      <AppHeader>
        <p className="text-primary-main leading-6 font-[500] text-[18px] mt-[24px] px-[24px] pb-[14px]">
          Pentrar Hub
        </p>
      </AppHeader>
      <PageContainer className="pt-0">
        <HubAnimation />
        <HubProduce />
      </PageContainer>
    </div>
  );
}

export default UserPentrarHub;
