"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";

import clsx from "clsx";

import { MovieCard } from "@/components/MovieCard";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import { Input } from "@/components/Input";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Modal } from "@/components/Modal";
import { MovieDetail } from "@/components/MovieDetail";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { getMovieDataById, getMoviesDataBySearch } from "@/api/movies";

import { EResponse, TMovie, TMovieDetail } from "@/types/movies";
import { EMessage } from "@/types/messages";

import {
  transformMovieApiData,
  transformMovieDetailApiData,
} from "@/utils/transform-api-data";

import { useDebounce } from "@/hooks/useDebounce";

export const MovieList = ({ onSearch }: { onSearch: () => void }) => {
  const [movieList, setMovieList] = useState<TMovie[] | []>([]);
  const [searchValue, setSearchValue] = useState("");
  const [message, setMessage] = useState<EMessage | string>(EMessage.START);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<TMovieDetail | null>(null);
  const [movieDetailModalOpen, setMovieDetailModalOpen] = useState(false);

  const DEBOUNCE_DELAY = 1000;

  const movieListRef = useRef<HTMLDivElement>(null);

  const searchItem = useCallback(async (value: string) => {
    setError(false);
    setLoading(true);
    try {
      const response = await getMoviesDataBySearch(value);
      if ("errors" in response.data) {
        setError(true);
        console.error(response.data.errors);
        return;
      }
      if (response.data.Response === EResponse.FALSE) {
        setMessage(`${EMessage.NO_RESULT} "${value}"`);
      } else {
        const data = transformMovieApiData(response.data);
        setMovieList(data.search);
      }
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const debounceSearch = useDebounce(searchItem, DEBOUNCE_DELAY);

  const handleSearchOnInput = useCallback(
    (value: string) => {
      setSearchValue(value);

      if (value.length > 0) {
        debounceSearch(value);
        onSearch();
      }

      if (value.length === 0) {
        setMovieList([]);
        setMessage(EMessage.START);
      }
    },
    [debounceSearch, onSearch],
  );

  const handleOnClear = useCallback(() => {
    setSearchValue("");
    setMovieList([]);
    setMessage(EMessage.START);
  }, []);

  useEffect(() => {
    if (
      movieListRef.current?.scrollHeight &&
      movieListRef.current?.scrollHeight > document.body.clientHeight
    ) {
      setScroll(true);
    }
  }, [movieList]);

  const getMovieDetail = useCallback(async (id: string) => {
    setError(false);
    setLoading(true);
    try {
      const response = await getMovieDataById(id);
      if ("errors" in response.data) {
        setError(true);
        console.error(response.data.errors);
        return;
      }
      const data = transformMovieDetailApiData(response.data);
      setSelectedMovie(data);
      setMovieDetailModalOpen(true);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleOnMovieClick = useCallback(
    (id: string) => {
      getMovieDetail(id);
    },
    [getMovieDetail],
  );

  const handleOnCloseModal = useCallback(() => {
    setMovieDetailModalOpen(false);
    setSelectedMovie(null);
  }, []);

  const renderMovies = useMemo(
    () => (
      <div
        ref={movieListRef}
        className="no-scrollbar relative flex flex-wrap content-start justify-center gap-8 overflow-auto p-4 pb-28"
      >
        {movieList.map((movie) => (
          <MovieCard
            movie={movie}
            key={movie.id}
            onClick={(id) => handleOnMovieClick(id)}
          />
        ))}
        {scroll && (
          <>
            {!movieDetailModalOpen && (
              <ScrollIndicator className="fixed bottom-2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2" />
            )}
            <div className="fixed bottom-0 left-0 z-10 h-32 w-full bg-gradient-to-t from-zinc-50 dark:from-zinc-900"></div>
          </>
        )}
      </div>
    ),
    [movieList, scroll, movieDetailModalOpen, handleOnMovieClick],
  );

  return (
    <>
      <div className="mb-8 min-w-[300px]">
        <Input
          icon={faMagnifyingGlass}
          type="search"
          placeholder="Search your next movie"
          value={searchValue}
          onChange={(event) => handleSearchOnInput(event.target.value)}
          onClear={() => handleOnClear()}
        />
      </div>

      <div className="relative w-full">
        {!loading && (
          <div
            className={clsx(
              "absolute -top-2 -z-10 w-full animate-slide-out bg-gradient-to-t bg-clip-text text-center text-2xl font-semibold text-transparent",
              {
                "from-zinc-900 via-red-600 to-red-600 dark:from-zinc-300 dark:via-red-600 dark:to-red-600":
                  error,
                "from-zinc-900 via-violet-600 to-violet-600 dark:from-zinc-300 dark:via-violet-600 dark:to-violet-600":
                  !error,
              },
            )}
          >
            {error ? EMessage.ERROR : movieList.length === 0 ? message : ""}
          </div>
        )}
      </div>

      {movieList.length > 0 && renderMovies}

      <Modal isOpen={movieDetailModalOpen} onClose={() => handleOnCloseModal()}>
        <MovieDetail movie={selectedMovie} />
      </Modal>

      {loading && <LoadingSpinner text="Loading..." />}
    </>
  );
};
