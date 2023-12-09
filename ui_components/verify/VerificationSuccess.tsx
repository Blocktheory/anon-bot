"use client";

import { FC } from "react";
import Image from "next/image";
import { icons } from "../../utils/images";

const VerificationSuccess: FC<any> = ({ handleUpdateStep, step }) => {
  return (
    <div>
      <h4 className="mb-6 text-xl font-semibold">Verification Successful</h4>
      <Image
        src={icons.successIcon}
        alt="success"
        className="w-[112px] mb-6 mx-auto"
      />
      <p className="text-sm font-semibold">Thank you for choosing Anon BOT!</p>
    </div>
  );
};
export default VerificationSuccess;
