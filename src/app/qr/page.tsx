"use client";

import { Metadata } from "next";
import QRCodeReact from "qrcode.react";
import { useEffect, useState } from "react";

export default function QR() {
    const [telegramId, setTelegramId] = useState<string>("");

    useEffect(() => {
        const params = new URLSearchParams(window.location.hash.slice(1));
        const initDataRaw = params.get("tgWebAppData") as any;
        const initData = new URLSearchParams(initDataRaw) as any;
        const userData = JSON.parse(initData.get("user"));
        const telegramId = userData?.id;
        setTelegramId(telegramId);
    }, []);
    return (
        <div className=" ">
            <div className="flex flex-col items-center justify-center h-screen  ">
                <div className="text-large text-2xl py-4 ">
                    Check In - QR Code
                </div>
                <div className="text-base py-4 ">{telegramId}</div>
                <div className="h-48 w-48  bg-[#FFF3DA] text-center  ">
                    <QRCodeComponent value={telegramId}></QRCodeComponent>
                </div>
            </div>
        </div>
    );
}

const QRCodeComponent = ({ value }: { value: string }) => {
    return (
        <div className="flex items-center justify-center h-full">
            <QRCodeReact value={value} />
        </div>
    );
};
