import ModalBaseWrapper from '@shared/ModalBase';
import { useState } from 'react';
import StartPhoneVerification from './startPhoneVerification';
import CompletePhoneVerification from './completePhoneVerification';

function EditPhone() {
  const [viewComponent, setViewComponent] = useState(1);

  const renderComponent = () => {
    switch (viewComponent) {
      case 1:
        return <StartPhoneVerification switchView={setViewComponent} />;
      case 2:
        return <CompletePhoneVerification />;
      default:
        return <StartPhoneVerification switchView={setViewComponent} />;
    }
  };

  return (
    <ModalBaseWrapper
      modalBaseProp={{
        closingText: 'phone',
        formWidth: '490px',
        closeBtnwidth: '520px',
      }}
    >
      {renderComponent()}
    </ModalBaseWrapper>
  );
}

export default EditPhone;
