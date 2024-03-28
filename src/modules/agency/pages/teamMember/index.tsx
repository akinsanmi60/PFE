import AppHeader from 'components/appHeader/appHeader';
import PageContainer from 'components/Layout/PageContainer';

function TeamMember() {
  return (
    <div>
      <AppHeader>
        <p className="text-primary-main leading-6 font-[500] text-[18px] mt-[24px] px-[24px] pb-[14px]">
          Team Member
        </p>
      </AppHeader>
      <PageContainer className="pt-0"></PageContainer>
    </div>
  );
}

export default TeamMember;
