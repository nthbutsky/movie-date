"use client";

import { getMoviesDataBySearch } from "@/api/movies";
import { TMovie } from "@/types/api/movies";
import { useState, useEffect } from "react";

export const MovieList = () => {
  const [movieList, setMovieList] = useState<TMovie[] | []>([]);

  const getMovieList = async () => {
    // setLoading(true);
    try {
      const response = await getMoviesDataBySearch("superman");
      if ("errors" in response.data) {
        // setError(true);
        console.error(response.data.errors);
        return;
      }
      console.log(response.data);
      setMovieList(response.data.Search);
    } catch (error) {
      console.error(error);
      // setError(true);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <div>
      {movieList.map((movie) => (
        <div key={movie.imdbID}>
          <img src={movie.Poster} alt={movie.Title} />
          <h2>{movie.Title}</h2>
          <p>{movie.Year}</p>
          <p>{movie.Type}</p>
        </div>
      ))}
    </div>
  );
};
