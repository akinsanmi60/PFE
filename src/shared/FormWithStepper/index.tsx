import CustomStepper from '@shared/Stepper/stepper';
import React from 'react';

function FormWithStepperWrapper({
  steps,
  currentStep,
  complete,
  children,
}: {
  steps: string[];
  currentStep: number;
  complete: boolean;
  setCurrentStep?: React.Dispatch<React.SetStateAction<number>>;
  setComplete?: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="">
        <CustomStepper
          complete={complete}
          steps={steps}
          currentStep={currentStep}
        />
      </div>

      <div className="w-[715px] bg-gray-100 rounded-[16px] p-[24px] mt-[40px]">
        <div className="bg-primary-white rounded-[16px] p-[15px] ">
          {children}
        </div>
      </div>
    </div>
  );
}

export default FormWithStepperWrapper;
