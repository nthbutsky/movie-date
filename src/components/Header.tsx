import Image from "next/image";

import { Righteous } from "next/font/google";

import clsx from "clsx";

import { ThemeToggler } from "@/components/ThemeToggler";

import logo from "@/assets/images/logo.png";

const righteous = Righteous({ subsets: ["latin"], weight: "400" });

export const Header = ({ title }: { title: string }) => {
  return (
    <header className="my-8 flex items-end justify-center gap-4">
      <Image src={logo} width={48} height={48} alt={title} loading="lazy" />
      <h1
        className={clsx(
          "font inline-block bg-gradient-to-t from-zinc-950 via-violet-600 to-violet-600 bg-clip-text text-5xl text-transparent dark:from-zinc-300 dark:via-violet-600 dark:to-violet-600",
          righteous.className,
        )}
      >
        {title}
      </h1>
      <ThemeToggler />
    </header>
  );
};
