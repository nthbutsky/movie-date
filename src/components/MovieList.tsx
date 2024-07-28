"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";

import { MovieCard } from "@/components/MovieCard";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import { Input } from "@/components/Input";
import { LoadingSpinner } from "@/components/LoadingSpinner";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { getMoviesDataBySearch } from "@/api/movies";

import { EResponse, TMovie } from "@/types/movies";

import { transformApiData } from "@/helpers/transformApiData";

import { useDebounce } from "@/utils/useDebounce";

export const MovieList = ({ onSearch }: { onSearch: () => void }) => {
  const [movieList, setMovieList] = useState<TMovie[] | []>([]);
  const [searchValue, setSearchValue] = useState("");
  const [message, setMessage] = useState("Start exploring!");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [scroll, setScroll] = useState(false);

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
        setMessage(`No results found for "${value}"`);
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
        setMessage("Please enter at least 2 characters");
      }
      if (value.length === 0) {
        setMovieList([]);
        setMessage("Start exploring!");
      }
    },
    [debounceSearch],
  );

  const handleOnClear = useCallback(() => {
    setSearchValue("");
    setMovieList([]);
    setMessage("Start exploring!");
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
        className="no-scrollbar relative flex h-[calc(100%-80px)] flex-wrap content-start justify-center gap-8 overflow-auto px-4 pb-32"
      >
        {movieList.map((movie) => (
          <MovieCard movie={movie} key={movie.imdbid} />
        ))}
        {scroll && (
          <>
            <ScrollIndicator className="fixed bottom-0 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2" />
            <div className="fixed bottom-0 left-0 z-0 h-32 w-full bg-gradient-to-t from-zinc-50"></div>
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
        <div className="bg-gradient-to-t from-zinc-950 via-violet-600 to-violet-600 bg-clip-text text-center text-2xl font-semibold text-transparent">
          {message}
        </div>
      )}
      {loading && <LoadingSpinner text="Loading..." />}
      {error && (
        <div className="bg-gradient-to-t from-zinc-950 via-red-600 to-red-600 bg-clip-text text-center text-2xl font-semibold text-transparent">
          An error occurred. Please try again.
        </div>
      )}
      {movieList.length > 0 && renderMovies}
    </>
  );
};
