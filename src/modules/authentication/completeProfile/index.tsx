import ModalBaseWrapper from '@shared/ModalBase';
import { useState } from 'react';
import SelectProfileType from './selectUserType';
import IndividualFormProfile from './individualForm';
import CorporateFormProfile from './corporate';
import { ReactComponent as LeftChevron } from '@assets/svg/leftChevron.svg';
import { useModalContext } from '@contexts/modalContext';
import ExporterFormProfile from './exporterForm';

function CompleteProfile() {
  const [revealForm, setRevealForm] = useState({
    formType: '',
    showForm: false,
  });
  const { modalState, handleModalClose } = useModalContext();

  return (
    <ModalBaseWrapper
      modalBaseProp={{
        formWidth: '',
        className: 'w-[500px] h-[580px] xlsm:w-[400px] xlsm:h-[400px]',
        showCloseBtn: false,
      }}
    >
      <div className="flex items-center gap-x-1 mb-[14px]">
        <LeftChevron
          className="inline-block mr-2 cursor-pointer"
          onClick={() => {
            if (modalState?.modalType === 'exporterProfile') {
              handleModalClose(modalState?.modalType);
            } else {
              setRevealForm({ formType: '', showForm: false });
            }
          }}
        />
        <h2>{'Complete Profile'}</h2>
      </div>

      <>
        {!revealForm.showForm &&
          modalState?.modalType !== 'exporterProfile' && (
            <SelectProfileType setRevealForm={setRevealForm} />
          )}

        {revealForm.showForm && revealForm.formType === 'individual' && (
          <IndividualFormProfile setRevealForm={setRevealForm} />
        )}

        {revealForm.showForm && revealForm.formType === 'corporate' && (
          <CorporateFormProfile setRevealForm={setRevealForm} />
        )}
        {modalState?.modalType === 'exporterProfile' && (
          <ExporterFormProfile setRevealForm={setRevealForm} />
        )}
      </>
    </ModalBaseWrapper>
  );
}

export default CompleteProfile;
