"use client";

import { FC, useEffect, useState } from "react";
import { LogInWithAnonAadhaar, useAnonAadhaar } from "anon-aadhaar-react";

import Image from "next/image";
import { exportCallDataGroth16FromPCD } from "anon-aadhaar-pcd";
import { icons } from "../../utils/images";

const VerifyAadhaar: FC<any> = ({ handleUpdateStep, step }) => {
  const [anonAadhaar] = useAnonAadhaar();
  const [aadharStatus, setAadharStatus] = useState("");

  console.log(aadharStatus, "aadharStatus");

  const handleGenProof = async (_pcd: any) => {
    const { a, b, c, Input } = await exportCallDataGroth16FromPCD(_pcd);
    console.log(a, "a");
    console.log(b, "b");
    console.log(c, "c");
    console.log(Input, "Input");
    const proof = {
      pubSignal: Input,
      pi_a: a,
      pi_b: b,
      pi_c: c,
    };
  };

  useEffect(() => {
    if (anonAadhaar.status === "logged-in") {
      handleGenProof(anonAadhaar.pcd);
    }
  }, [anonAadhaar]);

  useEffect(() => {
    setAadharStatus(anonAadhaar.status);
  }, [anonAadhaar]);

  return (
    <>
      <h2 className="mb-6 text-xl font-semibold">Prove your Identity</h2>
      <p className="text-sm mb-6">
        Anon Aadhaar securely verifies your document by confirming its
        government signature. This process happens entirely on your device for
        privacy. Please note, slower internet speeds may affect verification
        time.
      </p>
      <Image src={icons.logo} alt="logo" className="w-[114px] mb-6 mx-auto" />
      <div className="flex justify-center">
        <LogInWithAnonAadhaar />
      </div>
    </>
  );
};
export default VerifyAadhaar;
