"use client";

import { useState, useEffect } from "react";

import { MovieCard } from "@/components/MovieCard";

import { getMoviesDataBySearch } from "@/api/movies";

import { TMovie } from "@/types/movies";

import { transformApiData } from "@/utils/transformApiData";
import { ScrollIndicator } from "./ScrollIndicator";

export const MovieList = () => {
  const [movieList, setMovieList] = useState<TMovie[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getMovieList = async () => {
    setLoading(true);
    try {
      const response = await getMoviesDataBySearch("superman");
      if ("errors" in response.data) {
        setError(true);
        console.error(response.data.errors);
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

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <div className="no-scrollbar relative flex h-[calc(100%-80px)] flex-wrap content-start justify-center gap-8 overflow-auto px-4 pb-32">
      {movieList.map((movie) => (
        <MovieCard movie={movie} key={movie.imdbid} />
      ))}
      <ScrollIndicator className="fixed bottom-0 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2" />
      <div className="fixed bottom-0 left-0 z-0 h-32 w-full bg-gradient-to-t from-zinc-50"></div>
    </div>
  );
};
