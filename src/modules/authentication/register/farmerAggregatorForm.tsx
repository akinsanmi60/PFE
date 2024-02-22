import pentrarLogo from '@assets/svg/LogoPentrar.svg';
import FormWithStepperWrapper from '@shared/FormWithStepper';
import { useState } from 'react';
import PersonalinfoForm from './components/personalinfoForm';
import GetVerifyCode from './components/verifyPhoneNumber';
import CreatePassword from './components/createPassword';
import { useNavigate } from 'react-router-dom';

function FarmerAggregatorRegister() {
  const steps = ['Personal Information', 'Verify Phone', 'Create Password'];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  const moveToNextForm = () => {
    currentStep === steps.length
      ? setComplete(true)
      : setCurrentStep(prev => prev + 1);
  };

  const moveToPrevForm = () => {
    setCurrentStep(prev => prev - 1);
  };

  const navigate = useNavigate();

  return (
    <div
      className={`flex flex-col items-center justify-between h-screen py-[10px]`}
    >
      <>
        <img
          src={pentrarLogo}
          alt="logo"
          onClick={() => navigate('/')}
          className="cursor-pointer"
        />
      </>

      <div className="mt-[60px]">
        <FormWithStepperWrapper
          complete={complete}
          steps={steps}
          currentStep={currentStep}
          setComplete={setComplete}
          setCurrentStep={setCurrentStep}
        >
          {currentStep >= 1 && (
            <PersonalinfoForm
              currentStep={currentStep}
              action={moveToNextForm}
            />
          )}

          {currentStep >= 2 && (
            <GetVerifyCode
              currentStep={currentStep}
              action={moveToNextForm}
              previous={moveToPrevForm}
            />
          )}

          {currentStep >= 3 && (
            <CreatePassword
              currentStep={currentStep}
              previous={moveToPrevForm}
            />
          )}
        </FormWithStepperWrapper>
      </div>
    </div>
  );
}

export default FarmerAggregatorRegister;
