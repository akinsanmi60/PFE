import pentrarLogo from '@assets/svg/LogoPentrar.svg';
import FormWithStepperWrapper from '@shared/FormWithStepper';
import { useState } from 'react';
import PersonalinfoForm from './components/personalinfoForm';
import GetVerifyCode from './components/verifyPhoneNumber';
import CreatePassword from './components/createPassword';
import { useNavigate, useParams } from 'react-router-dom';
import { webPaths } from '@utils/paths';
import ExporterInfoForm from './components/exporterPersonalForm';

function Register() {
  const { type } = useParams();

  const infoWord =
    type === 'farmer' || type === 'aggregator'
      ? 'Personal Information'
      : 'Company Information';

  const steps = [infoWord, 'Verify Phone', 'Create Password'];
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

  const infoForm = () => {
    switch (type) {
      case 'farmer':
      case 'aggregator':
        return (
          <PersonalinfoForm currentStep={currentStep} action={moveToNextForm} />
        );
      case 'exporter':
        return (
          <ExporterInfoForm currentStep={currentStep} action={moveToNextForm} />
        );
      default:
        return <PersonalinfoForm />;
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-between gap-y-[60px] h-screen py-[10px]`}
    >
      <div>
        <img
          src={pentrarLogo}
          alt="logo"
          onClick={() => navigate(`${webPaths.home()}`)}
          className="cursor-pointer"
        />
      </div>

      <div className="">
        <FormWithStepperWrapper
          complete={complete}
          steps={steps}
          currentStep={currentStep}
          setComplete={setComplete}
          setCurrentStep={setCurrentStep}
        >
          {currentStep >= 1 &&
            // <PersonalinfoForm
            //   currentStep={currentStep}
            //   action={moveToNextForm}
            // />
            infoForm()}

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

export default Register;
