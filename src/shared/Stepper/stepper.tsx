import React from 'react';
import './stepper.css';
import { TiTick } from 'react-icons/ti';
const CustomStepper = ({
  steps,
  currentStep,
  complete,
}: {
  steps: string[];
  currentStep: number;
  complete: boolean;
  setCurrentStep?: React.Dispatch<React.SetStateAction<number>>;
  setComplete?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <div className="flex">
        {steps?.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && 'active'} ${
              (i + 1 < currentStep || complete) && 'complete'
            } `}
          >
            <div className="step">
              {i + 1 < currentStep || complete ? (
                <TiTick size={19} />
              ) : (
                <div className="w-3 h-3 bg-primary-main rounded-[50%]"></div>
              )}
            </div>
            <p className="text-primary-main text-[14px] font-semibold">
              {step}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default CustomStepper;
