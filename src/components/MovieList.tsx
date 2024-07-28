"use client";

import { getMoviesDataBySearch } from "@/api/movies";
import { TMovie } from "@/types/movies";
import { transformApiData } from "@/utils/transformApiData";
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
      const data = transformApiData(response.data);
      setMovieList(data.search);
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
        <div key={movie.imdbid}>
          <img src={movie.poster} alt={movie.title} />
          <h2>{movie.title}</h2>
          <p>{movie.year}</p>
          <p>{movie.type}</p>
        </div>
      ))}
    </div>
  );
};
