import Image from "next/image";

import { Righteous } from "next/font/google";

import clsx from "clsx";

import logo from "@/assets/images/logo.png";

const righteous = Righteous({ subsets: ["latin"], weight: "400" });

export const Header = () => {
  return (
    <header className="my-8 flex items-end justify-center gap-4">
      <Image
        src={logo}
        width={48}
        height={48}
        alt="Movie Date"
        loading="lazy"
      />
      <h1
        className={clsx(
          "font inline-block bg-gradient-to-t from-zinc-950 via-violet-600 to-violet-600 bg-clip-text text-5xl text-transparent",
          righteous.className,
        )}
      >
        Movie Date
      </h1>
    </header>
  );
};
