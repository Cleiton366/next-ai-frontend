import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "@/contexts/user-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next AI",
  description: "Your everyday Open Source Web-UI for LLMs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./logo.svg" />
      </head>
      <body className={inter.className}>
        <main>
          <UserProvider>{children}</UserProvider>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
