import AgencySettingsLayout from './layout';
import ChangePassword from '@modules/authentication/changePassword';

function AgencyChangePassword() {
  const renderTitle = () => {
    return (
      <div>
        <h1 className="text-[20px] font-[600] leading-[28px] mb-[8px]">
          Password{' '}
        </h1>
        <p className="text-[14px] font-[400] leading-[20px] text-secondary-light-2">
          Change your password{' '}
        </p>
      </div>
    );
  };

  return (
    <div className="pb-[34px] pt-[24px]">
      <AgencySettingsLayout
        children={<ChangePassword useTitle={false} />}
        titleChildren={renderTitle()}
      />
    </div>
  );
}

export default AgencyChangePassword;
