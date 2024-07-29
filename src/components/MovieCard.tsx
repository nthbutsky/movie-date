import Image from "next/image";

import { Righteous } from "next/font/google";

import clsx from "clsx";

import { TMovie } from "@/types/movies";
import { EMessage } from "@/types/messages";

import noImage from "@/assets/images/no-image.jpg";

import { checkPosterUrl } from "@/utils/check-poster-url";

const righteous = Righteous({ subsets: ["latin"], weight: "400" });

interface IProps {
  movie: TMovie;
  onClick: (id: string) => void;
}

export const MovieCard = ({ movie, onClick }: IProps) => {
  return (
    <button
      type="button"
      onClick={() => onClick(movie.id)}
      className={clsx(
        "group relative inline-flex h-96 w-64 overflow-hidden rounded-md shadow-glow shadow-violet-600",
        { "bg-white dark:bg-black": !checkPosterUrl(movie.poster) },
      )}
    >
      {checkPosterUrl(movie.poster) ? (
        <Image
          src={movie.poster}
          alt={movie.title}
          fill
          sizes="100vw, 50vw, 33vw"
          loading="lazy"
          className="absolute left-0 top-0 z-0 size-full animate-fade-in object-cover object-top"
        />
      ) : (
        <>
          <Image
            src={noImage}
            alt="No image available"
            fill
            loading="lazy"
            sizes="100vw, 50vw, 33vw"
            className="absolute left-0 top-0 z-0 size-full animate-fade-in object-contain object-top dark:invert"
          />
          <div
            className={clsx(
              "absolute left-1/2 top-[80%] z-0 w-full -translate-x-1/2 -translate-y-1/2 text-center text-2xl font-semibold uppercase text-violet-600",
              righteous.className,
            )}
          >
            {EMessage.NO_POSTER}
          </div>
        </>
      )}
      <div className="absolute bottom-0 left-0 z-0 h-64 w-full bg-gradient-to-t from-zinc-950 transition-[bottom] duration-300 ease-in-out group-hover:-bottom-64"></div>
      <div
        className={clsx(
          "ease-on-out absolute z-10 grid size-full grid-cols-2 grid-rows-[90%_1fr] place-items-end justify-items-start p-4 text-start text-zinc-50 transition-[opacity] duration-300 group-hover:opacity-0 dark:text-zinc-200",
          righteous.className,
        )}
      >
        <h2 className="col-span-2 text-2xl font-semibold">{movie.title}</h2>
        <p className="text-sm text-zinc-400">{movie.year}</p>
        <p className="justify-self-end text-sm uppercase text-zinc-400">
          {movie.type}
        </p>
      </div>
    </button>
  );
};
