import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { Header } from "./_components/header";

export const metadata: Metadata = {
  title: "ECommerce",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
      <Header />
      <div className="bg-white flex items-center justify-center"> 
      <div className="bg-white text-black w-96 h-96 mt-6 flex items-center justify-center  rounded border-2 border-black-500"> 
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </div>
      </div>
      </body>
    </html>
  );
}
