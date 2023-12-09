import { Metadata } from "next";
import { VerifyProof } from "../../../ui_components/verify";

export const metadata: Metadata = {
  title: "Anon bot - Verify",
  description: "Anon bot",
};

export default function Verify() {
  return (
    <div className="h-full pt-10 px-6 loginBtn text-center">
      <VerifyProof />
    </div>
  );
}
