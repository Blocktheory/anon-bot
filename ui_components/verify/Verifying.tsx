"use client";

import { FC } from "react";

const Verifying: FC<any> = () => {
  return (
    <div>
      <h3 className="mb-6 text-xl font-semibold">Verifying ID</h3>
      <p className="text-sm mb-6">
        Once your ID is verified, you'll be able to access all the features and
        benefits of our services.
      </p>
      <div className="loader"></div>
    </div>
  );
};
export default Verifying;
