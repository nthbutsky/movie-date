import type { Metadata } from "next";

import { Inter } from "next/font/google";
import "@/app/globals.css";

import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie Date",
  description: "Choose your next movie date",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          inter.className,
          "container mx-auto flex h-screen bg-zinc-50 dark:bg-zinc-950",
        )}
      >
        {children}
      </body>
    </html>
  );
}
