"use client";

import { use, useEffect, useState } from "react";

import clsx from "clsx";

import { Header } from "@/components/Header";
import { MovieList } from "@/components/MovieList";

export default function Home() {
  const [dataAvailable, setDataAvailable] = useState(false);

  const headerTitle = "Movie Date";

  return (
    <main
      className={clsx(
        "animate-fade-in flex h-screen flex-col items-center px-4",
        {
          "justify-center": !dataAvailable,
        },
      )}
    >
      <Header title={headerTitle} />
      <MovieList onSearch={() => setDataAvailable} />
    </main>
  );
}
