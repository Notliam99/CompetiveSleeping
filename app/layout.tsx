import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { PrivyProviders } from "./components/privyproviders";
import AppShell from "./components/AppShell";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Sleep App",
    description: "Competitive sleeping - make money while you sleep!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="m-0 flex h-full flex-col bg-white dark:bg-zinc-950">
        <div className="flex flex-1 flex-col overflow-hidden">
          <PrivyProviders><AppShell>{children}</AppShell></PrivyProviders>
        </div>
        <Navbar />
      </body>
    </html>
  );
}
