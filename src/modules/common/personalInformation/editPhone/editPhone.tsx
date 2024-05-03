import ModalBaseWrapper from '@shared/ModalBase';
import { useState } from 'react';
import StartPhoneVerification from './startPhoneVerification';
import CompletePhoneVerification from './completePhoneVerification';

function EditPhone({ phone }: { phone: string }) {
  const [viewComponent, setViewComponent] = useState(1);

  const renderComponent = () => {
    switch (viewComponent) {
      case 1:
        return (
          <StartPhoneVerification phone={phone} switchView={setViewComponent} />
        );
      case 2:
        return <CompletePhoneVerification />;
      default:
        return (
          <StartPhoneVerification phone={phone} switchView={setViewComponent} />
        );
    }
  };

  return (
    <ModalBaseWrapper
      modalBaseProp={{
        closingText: 'phone',
        formWidth: '490px',
        closeBtnwidth: '490px',
      }}
    >
      {renderComponent()}
    </ModalBaseWrapper>
  );
}

export default EditPhone;
