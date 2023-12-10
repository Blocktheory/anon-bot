"use client";

import { FC, useEffect, useState } from "react";
import { LogInWithAnonAadhaar, useAnonAadhaar } from "anon-aadhaar-react";
import { VerificationSuccess, Verifying } from ".";

import Image from "next/image";
import { exportCallDataGroth16FromPCD } from "anon-aadhaar-pcd";
import { icons } from "../../utils/images";
import { postProofData } from "../../utils";
import { createWalletClient, http, getContract } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseGoerli } from "viem/chains";
import { ABI } from "./abi";

const PRIVATE_KEY: any = process.env.NEXT_PUBLIC_PRIVATE_KEY;

const VerifyAadhaar: FC<any> = ({ handleUpdateStep, step, telegramId }) => {
    const [anonAadhaar, anonAadhaarAction] = useAnonAadhaar();

    useEffect(() => {}, []);

    const [loading, setLoading] = useState(false);
    const [verifyStatus, setVerifyStatus] = useState(false);
    const logout = () => {
        anonAadhaarAction({ type: "logout" });
    };

    useEffect(() => {
        // setTimeout(() => {
        registerSmartContract({ telegramId });
        // }, 6000);
    }, []);

    const registerSmartContract = async ({ telegramId }: any) => {
        console.log("THIS IS NEW, calling contract!", PRIVATE_KEY);
        const account = privateKeyToAccount(PRIVATE_KEY);
        const client = createWalletClient({
            account,
            chain: baseGoerli,
            transport: http(),
        });
        const contract = getContract({
            address: "0xf782D6F97f36D5ce311982841cFb3299C4bce98F", // 0x5Af520A9b24794fD9Dc1AB21BbdE58eC719CdA90
            abi: ABI,
            walletClient: client,
        });
        const result = await contract.write.register([1, "ThunderChandher"]);
        console.log(result);
    };

    const callSmartContract = async ({
        a,
        b,
        c,
        pubSignal,
        telegramId,
    }: any) => {
        console.log("123");
        const account = privateKeyToAccount(PRIVATE_KEY);
        const client = createWalletClient({
            account,
            chain: baseGoerli,
            transport: http(),
        });
        const contract = getContract({
            address: "0xf782D6F97f36D5ce311982841cFb3299C4bce98F", // 0x5Af520A9b24794fD9Dc1AB21BbdE58eC719CdA90
            abi: ABI,
            walletClient: client,
        });
        const result = await contract.write.verify([
            a,
            b,
            c,
            pubSignal,
            telegramId,
        ]);
        console.log(result);
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
            callSmartContract({
                a,
                b,
                c,
                pubSignal: Input,
                telegramId,
            });
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
                    <h2 className="mb-6 text-xl font-semibold">
                        Prove your Identity
                    </h2>
                    <p className="text-sm mb-6">
                        Anon Aadhaar securely verifies your document by
                        confirming its government signature. This process
                        happens entirely on your device for privacy. Please
                        note, slower internet speeds may affect verification
                        time.
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
