"use client";

import "./globals.css";

import { AnonAadhaarProvider } from "anon-aadhaar-react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AnonAadhaarProvider _appId="1233434">
          <main className="mx-auto h-[100dvh] overflow-y-auto">{children}</main>
        </AnonAadhaarProvider>
      </body>
    </html>
  );
}
