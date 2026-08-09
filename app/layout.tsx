import "./globals.css";
import { LayoutWrapper } from "@/components/layout-wrapper";
import { TanstackProvider } from "@/components/providers/tanstack-provider";
import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Starnest",
  description: "Starnest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap"
        />
      </head>
      <body className={`${inter.variable} ${dmSans.variable} antialiased bg-background`}>
        <NuqsAdapter>
          <TanstackProvider>
            <Toaster />
            <LayoutWrapper>{children}</LayoutWrapper>
          </TanstackProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
