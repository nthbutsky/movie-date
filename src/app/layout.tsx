import type { Metadata } from "next";
import Image from "next/image";

import { Inter } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "@/app/globals.css";

import { ThemeProvider } from "next-themes";

import clsx from "clsx";

import poster from "@/assets/images/poster.jpg";

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
          "container mx-auto bg-zinc-50 dark:bg-zinc-950",
        )}
      >
        <ThemeProvider attribute="class">
          <Image
            src={poster}
            alt=""
            fill
            loading="lazy"
            className="animate-fade-in absolute -z-50 object-cover"
          />
          <div className="animate-fade-in-delayed absolute left-1/2 top-1/2 -z-40 size-full -translate-x-1/2 -translate-y-1/2 bg-zinc-50 opacity-75 dark:bg-zinc-950"></div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
