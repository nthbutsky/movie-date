"use client";

import { useState } from "react";

import clsx from "clsx";

import { Header } from "@/components/Header";
import { MovieList } from "@/components/MovieList";

export default function Home() {
  const [dataAvailable, setDataAvailable] = useState(false);

  return (
    <main
      className={clsx(
        "flex h-screen flex-col items-center px-4 transition-all ease-in-out",
        {
          "justify-center": !dataAvailable,
        },
      )}
    >
      <Header />
      <MovieList onSearch={() => setDataAvailable} />
    </main>
  );
}
