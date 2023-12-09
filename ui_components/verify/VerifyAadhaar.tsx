"use client";

import { FC, useEffect, useState } from "react";
import { LogInWithAnonAadhaar, useAnonAadhaar } from "anon-aadhaar-react";
import { VerificationSuccess, Verifying } from ".";

import Image from "next/image";
import { exportCallDataGroth16FromPCD } from "anon-aadhaar-pcd";
import { icons } from "../../utils/images";
import { postProofData } from "../../utils";

const VerifyAadhaar: FC<any> = ({ handleUpdateStep, step, telegramId }) => {
  const [anonAadhaar, anonAadhaarAction] = useAnonAadhaar();

  const [loading, setLoading] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState(false);
  const logout = () => {
    anonAadhaarAction({ type: "logout" });
  };
  const handleGenProof = async (_pcd: any) => {
    try {
      const { a, b, c, Input } = await exportCallDataGroth16FromPCD(_pcd);

      const proof = {
        telegram_id: telegramId,
        anon_data: {
          pubSignal: Input,
          pi_a: a,
          pi_b: b,
          pi_c: c,
        },
      };

      setLoading(true);
      const response = await postProofData(proof);
      console.log(response, "response");
      console.log("error" in response?.data, "error");
      if ("error" in response?.data) {
        anonAadhaar;
        setLoading(false);
        logout();
        localStorage.clear();
        handleUpdateStep(2);
      } else {
        setLoading(false);
        setVerifyStatus(true);
      }
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (anonAadhaar.status === "logged-in") {
      handleGenProof(anonAadhaar.pcd);
    }
  }, [anonAadhaar]);

  return (
    <>
      {loading ? (
        <Verifying />
      ) : verifyStatus ? (
        <VerificationSuccess />
      ) : (
        <>
          <h2 className="mb-6 text-xl font-semibold">Prove your Identity</h2>
          <p className="text-sm mb-6">
            Anon Aadhaar securely verifies your document by confirming its
            government signature. This process happens entirely on your device
            for privacy. Please note, slower internet speeds may affect
            verification time.
          </p>
          <Image
            src={icons.logo}
            alt="logo"
            className="w-[114px] mb-6 mx-auto"
          />
          <div className="flex justify-center">
            <LogInWithAnonAadhaar />
          </div>
        </>
      )}
    </>
  );
};
export default VerifyAadhaar;
