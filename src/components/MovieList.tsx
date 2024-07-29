"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";

import { MovieCard } from "@/components/MovieCard";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import { Input } from "@/components/Input";
import { LoadingSpinner } from "@/components/LoadingSpinner";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { getMoviesDataBySearch } from "@/api/movies";

import { EResponse, TMovie } from "@/types/movies";

import { transformApiData } from "@/utils/transformApiData";

import { useDebounce } from "@/hooks/useDebounce";

export const MovieList = ({ onSearch }: { onSearch: () => void }) => {
  const [movieList, setMovieList] = useState<TMovie[] | []>([]);
  const [searchValue, setSearchValue] = useState("");
  const [message, setMessage] = useState("Start exploring!");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [scroll, setScroll] = useState(false);

  const enum EMessage {
    START = "Start exploring!",
    NO_RESULT = "No results found for",
    ERROR = "An error occurred. Please try again.",
    MIN_CHAR = "Please enter at least 2 characters",
  }

  const DEBOUNCE_DELAY = 1000;

  const movieListRef = useRef<HTMLDivElement>(null);

  const searchItem = async (value: string) => {
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
        return;
      }
      const data = transformApiData(response.data);
      setMovieList(data.search);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
      console.log(movieList);
    }
  };

  const debounceSearch = useDebounce(searchItem, DEBOUNCE_DELAY);

  const handleSearchOnInput = useCallback(
    (value: string) => {
      setSearchValue(value);
      if (value.length >= 2) {
        debounceSearch(value);
        onSearch();
      }
      if (value.length < 2) {
        setMessage(EMessage.MIN_CHAR);
      }
      if (value.length === 0) {
        setMovieList([]);
        setMessage(EMessage.START);
      }
    },
    [debounceSearch],
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

  const renderMovies = useMemo(
    () => (
      <div
        ref={movieListRef}
        className="no-scrollbar relative flex flex-wrap content-start justify-center gap-8 overflow-auto p-4 pb-28"
      >
        {movieList.map((movie) => (
          <MovieCard movie={movie} key={movie.imdbid} />
        ))}
        {scroll && (
          <>
            <ScrollIndicator className="fixed bottom-2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2" />
            <div className="fixed bottom-0 left-0 z-10 h-32 w-full bg-gradient-to-t from-zinc-50 dark:from-zinc-950"></div>
          </>
        )}
      </div>
    ),
    [movieList, scroll],
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
      {!loading && !error && movieList.length === 0 && (
        <div className="bg-gradient-to-t from-zinc-950 via-violet-600 to-violet-600 bg-clip-text text-center text-3xl font-semibold text-transparent dark:from-zinc-300 dark:via-violet-600 dark:to-violet-600">
          {message}
        </div>
      )}
      {loading && <LoadingSpinner text="Loading..." />}
      {error && (
        <div className="bg-gradient-to-t from-zinc-950 via-red-600 to-red-600 bg-clip-text text-center text-3xl font-semibold text-transparent">
          {EMessage.ERROR}
        </div>
      )}
      {movieList.length > 0 && renderMovies}
    </>
  );
};
