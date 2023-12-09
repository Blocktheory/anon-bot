"use client";

import { PrimaryBtn, SecondaryBtn } from "../shared";

import { FC } from "react";
import Image from "next/image";
import { icons } from "../../utils/images";

const VerifyIdentity: FC<any> = ({ handleUpdateStep, step }) => {
  const handleRedirect = () => {
    window.open("https://tathya.uidai.gov.in/login");
  };
  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold">Prove your Identity</h1>
      <Image src={icons.logo} alt="logo" className="w-[114px] mb-6 mx-auto" />

      <PrimaryBtn
        title={"I have Aadhar with me"}
        className="mb-3"
        onClick={() => handleUpdateStep(step + 1)}
      />
      <p className="mb-3 text-xs text-[#888888] relative separator">Or</p>
      <SecondaryBtn
        onClick={handleRedirect}
        title={"Wants to Download Aadhar"}
      />
    </div>
  );
};
export default VerifyIdentity;
