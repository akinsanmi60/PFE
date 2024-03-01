import ModalBaseWrapper from '@shared/ModalBase';
import { useState } from 'react';
import StartEmailVerification from './startEmailVerification';
import CompleteEmailVerification from './completeEmailVerification';

function EditEmail() {
  const [viewComponent, setViewComponent] = useState(1);

  const renderComponent = () => {
    switch (viewComponent) {
      case 1:
        return <StartEmailVerification switchView={setViewComponent} />;
      case 2:
        return <CompleteEmailVerification />;
      default:
        return <StartEmailVerification switchView={setViewComponent} />;
    }
  };

  return (
    <ModalBaseWrapper
      modalBaseProp={{
        closingText: 'email',
        formWidth: '490px',
        closeBtnwidth: '520px',
      }}
    >
      {renderComponent()}
    </ModalBaseWrapper>
  );
}

export default EditEmail;
