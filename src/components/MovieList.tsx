"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";

import { MovieCard } from "@/components/MovieCard";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import { Input } from "@/components/Input";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Modal } from "@/components/Modal";
import { MovieDetail } from "@/components/MovieDetail";
import { Informer } from "@/components/Informer";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { getMovieDataById, getMoviesDataBySearch } from "@/api/movies";

import { EResponse, TMovie, TMovieDetail } from "@/types/movies";
import { EMessage } from "@/types/messages";

import {
  transformMovieApiData,
  transformMovieDetailApiData,
} from "@/utils/transform-api-data";

import { useDebounce } from "@/hooks/useDebounce";

export const MovieList = () => {
  const [movieList, setMovieList] = useState<TMovie[] | []>([]);
  const [searchValue, setSearchValue] = useState("");
  const [message, setMessage] = useState<EMessage | string>(EMessage.START);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [scrollIndicator, setScrollIndicator] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<TMovieDetail | null>(null);
  const [movieDetailModalOpen, setMovieDetailModalOpen] = useState(false);

  const DEBOUNCE_DELAY = 1000;
  const MOVIE_LIST_OFFSET = 212;

  const movieListRef = useRef<HTMLDivElement>(null);

  const searchItem = useCallback(async (value: string) => {
    setMovieList([]);
    setError(false);
    setLoading(true);
    try {
      const response = await getMoviesDataBySearch(value);
      if (response.data.Response === EResponse.FALSE) {
        setError(true);
        setMessage(`${EMessage.NO_RESULT} ${value}`);
      } else {
        const data = transformMovieApiData(response.data);
        setMovieList(data.search);
      }
    } catch (error) {
      setError(true);
      setMessage(EMessage.ERROR);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const debounceSearch = useDebounce(searchItem, DEBOUNCE_DELAY);

  const handleSearchOnInput = useCallback(
    (value: string) => {
      setSearchValue(value);
      setMessage("");

      if (value.length > 0) {
        debounceSearch(value);
      }

      if (value.length === 0) {
        setMovieList([]);
        setMessage(EMessage.START);
      }
    },
    [debounceSearch],
  );

  const handleOnClear = useCallback(() => {
    setError(false);
    setSearchValue("");
    setMovieList([]);
    setMessage(EMessage.START);
  }, []);

  useEffect(() => {
    if (
      movieListRef.current?.scrollHeight &&
      movieListRef.current?.scrollHeight + MOVIE_LIST_OFFSET >
        document.body.clientHeight
    ) {
      setScrollIndicator(true);
    }
  }, [movieList]);

  const getMovieDetail = useCallback(async (id: string) => {
    setError(false);
    setLoading(true);
    try {
      const response = await getMovieDataById(id);
      if (response.data.Response === EResponse.FALSE) {
        setError(true);
        setMessage(EMessage.ERROR);
      } else {
        const data = transformMovieDetailApiData(response.data);
        setSelectedMovie(data);
        setMovieDetailModalOpen(true);
      }
    } catch (error) {
      setError(true);
      setMessage(EMessage.ERROR);
      console.error(error);
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
        {scrollIndicator && (
          <>
            {!movieDetailModalOpen && (
              <ScrollIndicator className="fixed bottom-0 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 sm:bottom-2" />
            )}
            <div className="fixed bottom-0 left-0 z-10 h-16 w-full bg-gradient-to-t from-zinc-50 dark:from-zinc-900 sm:h-32"></div>
          </>
        )}
      </div>
    ),
    [movieList, scrollIndicator, movieDetailModalOpen, handleOnMovieClick],
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
        {(error || message) && <Informer message={message} error={error} />}
      </div>

      {movieList.length > 0 && renderMovies}

      <Modal isOpen={movieDetailModalOpen} onClose={() => handleOnCloseModal()}>
        <MovieDetail movie={selectedMovie} />
      </Modal>

      {loading && <LoadingSpinner text="Loading..." />}
    </>
  );
};
