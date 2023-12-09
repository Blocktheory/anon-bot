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

  const [telegramId, setTelegramId] = useState();

  const handleUpdateStep = (step: number) => {
    setStep(step);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.slice(1));
    const initDataRaw = params.get("tgWebAppData") as any;
    const initData = new URLSearchParams(initDataRaw) as any;
    const userData = JSON.parse(initData.get("user"));
    const telegramId = userData?.id;
    setTelegramId(telegramId);
  }, []);

  return (
    <div>
      {step === 1 ? (
        <VerifyIdentity handleUpdateStep={handleUpdateStep} step={step} />
      ) : step === 2 ? (
        <VerifyAadhaar
          handleUpdateStep={handleUpdateStep}
          step={step}
          telegramId={telegramId}
        />
      ) : null}
    </div>
  );
};
export default VerifyProof;
