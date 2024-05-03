import ImageUpload from '@shared/upload/ImageUpload';
import AgencySettingsLayout from './layout';

function ImageUpdate() {
  const renderTitle = () => {
    return (
      <div>
        <h1 className="text-[20px] font-[600] leading-[28px] mb-[8px]">
          Profile photo
        </h1>
        <p className="text-[14px] font-[400] leading-[20px] text-secondary-light-2">
          Update your profile photo{' '}
        </p>
      </div>
    );
  };

  const renderUpload = () => {
    return <ImageUpload successWatcher={false} acceptType="image/*" />;
  };

  return (
    <div className="pb-[34px] border-b border-[#E2E8F0]">
      <AgencySettingsLayout
        children={renderUpload()}
        titleChildren={renderTitle()}
      />
    </div>
  );
}

export default ImageUpdate;
