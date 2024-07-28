"use client";

import { useState, useEffect, useCallback, useMemo } from "react";

import { MovieCard } from "@/components/MovieCard";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import { Input } from "@/components/Input";
import { LoadingSpinner } from "@/components/LoadingSpinner";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { getMoviesDataBySearch } from "@/api/movies";

import { EResponse, TMovie } from "@/types/movies";

import { transformApiData } from "@/helpers/transformApiData";

import { useDebounce } from "@/utils/useDebounce";

export const MovieList = () => {
  const [movieList, setMovieList] = useState<TMovie[] | []>([]);
  const [searchValue, setSearchValue] = useState("");
  const [message, setMessage] = useState("Start exploring!");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const searchItem = async (value: string) => {
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
    }
  };

  const DEBOUNCE_DELAY = 1000;

  const debounceSearch = useDebounce(searchItem, DEBOUNCE_DELAY);

  const handleSearchOnInput = useCallback((value: string) => {
    setSearchValue(value);
    if (value.length >= 2) {
      debounceSearch(value);
    }
    if (searchValue === "") {
      setMovieList([]);
      setMessage("Start exploring!");
    }
  }, []);

  const handleOnClear = useCallback(() => {
    setSearchValue("");
    setMovieList([]);
    setMessage("Start exploring!");
  }, []);

  const renderMovies = useMemo(
    () => (
      <div className="no-scrollbar relative flex h-[calc(100%-80px)] flex-wrap content-start justify-center gap-8 overflow-auto px-4 pb-32">
        {movieList.map((movie) => (
          <MovieCard movie={movie} key={movie.imdbid} />
        ))}
        <ScrollIndicator className="fixed bottom-0 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2" />
        <div className="fixed bottom-0 left-0 z-0 h-32 w-full bg-gradient-to-t from-zinc-50"></div>
      </div>
    ),
    [movieList],
  );

  return (
    <>
      <div className="mb-8">
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
      {movieList.length > 0 && renderMovies}
    </>
  );
};
