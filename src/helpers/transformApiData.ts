import { TMovieData, TMovieDataOrigin } from "@/types/movies";

export const transformApiData = (data: TMovieDataOrigin): TMovieData => {
  const transformedSearch = data.Search.map(item => {
    const transformedItem = {
      title: item.Title,
      year: item.Year,
      imdbid: item.imdbID,
      type: item.Type,
      poster: item.Poster,
    };
    return transformedItem;
  });

  return {
    response: data.Response,
    search: transformedSearch,
    totalResults: data.totalResults,
  };
};