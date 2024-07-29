import Image from "next/image";

import { Righteous } from "next/font/google";

import clsx from "clsx";

import { TMovieDetail } from "@/types/movies";
import { EMessage } from "@/types/messages";

import noImage from "@/assets/images/no-image.jpg";

import { checkPosterUrl } from "@/utils/check-poster-url";

const righteous = Righteous({ subsets: ["latin"], weight: "400" });

export const MovieDetail = ({ movie }: { movie: TMovieDetail | null }) => {
  return (
    <>
      {movie ? (
        <div className="grid grid-cols-1 sm:min-h-[384px] sm:grid-cols-[60%_auto]">
          <div className="text-md relative z-10 bg-zinc-50 p-4 text-zinc-500 opacity-90 dark:bg-zinc-950 dark:text-zinc-50 sm:static sm:opacity-100">
            <h1
              className={clsx(
                "mb-2 w-[calc(100%-48px)] text-3xl text-violet-600 sm:w-full",
                righteous.className,
              )}
            >
              {movie.title}
            </h1>

            <p
              className={clsx(
                "mb-2 uppercase dark:text-zinc-400",
                righteous.className,
              )}
            >
              {movie.genre}
            </p>

            <p className="mb-2">{movie.plot}</p>

            <div
              className={clsx(
                "mb-2 flex flex-wrap gap-x-4 uppercase dark:text-zinc-400",
                righteous.className,
              )}
            >
              <p>IMDB: {movie.imdbRating}</p>
              <p>{movie.year}</p>
              <p>{movie.rated}</p>
              <p>{movie.runtime}</p>
              <p>{movie.type}</p>
            </div>

            <div className="flex flex-col gap-2 text-sm dark:text-zinc-400">
              <div>
                <p className="font-semibold">Languages</p>
                <p>{movie.language}</p>
              </div>

              <div>
                <p className="font-semibold">Countries</p>
                <p>{movie.country}</p>
              </div>

              <div>
                <p className="font-semibold">Directors</p>
                <p>{movie.director}</p>
              </div>

              <div>
                <p className="font-semibold">Starring</p>
                <p>{movie.actors}</p>
              </div>
            </div>
          </div>

          <div className="static bg-white dark:bg-black sm:relative">
            {checkPosterUrl(movie.poster) ? (
              <Image
                src={movie.poster}
                alt={movie.title}
                loading="lazy"
                fill
                className="animate-fade-in object-cover"
              />
            ) : (
              <>
                <Image
                  src={noImage}
                  alt="No image available"
                  loading="lazy"
                  fill
                  className="animate-fade-in object-contain object-top dark:invert"
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
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-t from-zinc-950 via-red-600 to-red-600 bg-clip-text text-center text-3xl font-semibold text-transparent">
          {EMessage.ERROR}
        </div>
      )}
    </>
  );
};
