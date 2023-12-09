"use client";

import { FC, useEffect, useState } from "react";
import {
  VerificationSuccess,
  VerifyAadhaar,
  VerifyIdentity,
  Verifying,
} from ".";

const VerifyProof: FC<any> = () => {
  const [step, setStep] = useState(1);

  const [tgUsername, setTgUserName] = useState();

  const handleUpdateStep = (step: number) => {
    setStep(step);
  };
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.slice(1));

    const initDataRaw = params.get("tgWebAppData") as any;
    const initData = new URLSearchParams(initDataRaw) as any;
    const userData = JSON.parse(initData.get("user"));
    const tgUsername = userData?.username;
    setTgUserName(tgUsername);
    console.log(tgUsername, "tgUsername");
  }, []);

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
