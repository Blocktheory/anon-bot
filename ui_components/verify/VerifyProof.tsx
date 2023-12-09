"use client";

import { FC, useState } from "react";
import {
  VerificationSuccess,
  VerifyAadhaar,
  VerifyIdentity,
  Verifying,
} from ".";

const VerifyProof: FC<any> = () => {
  const [step, setStep] = useState(4);

  const handleUpdateStep = (step: number) => {
    setStep(step);
  };
  return (
    <div>
      {step === 1 ? (
        <VerifyIdentity handleUpdateStep={handleUpdateStep} step={step} />
      ) : step === 2 ? (
        <VerifyAadhaar handleUpdateStep={handleUpdateStep} step={step} />
      ) : step === 3 ? (
        <Verifying handleUpdateStep={handleUpdateStep} step={step} />
      ) : (
        <VerificationSuccess handleUpdateStep={handleUpdateStep} step={step} />
      )}
    </div>
  );
};
export default VerifyProof;
