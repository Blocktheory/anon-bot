"use client";

import "./globals.css";

import { AnonAadhaarProvider } from "anon-aadhaar-react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AnonAadhaarProvider _appId="anon-id">
          <main className="mx-auto h-[100dvh] overflow-y-auto">{children}</main>
        </AnonAadhaarProvider>
      </body>
    </html>
  );
}
