import { TMovieData, TMovieDataOrigin, TMovieDetailOrigin, TMovieDetail } from "@/types/movies";

export const transformMovieApiData = (data: TMovieDataOrigin): TMovieData => {
  const transformedSearch = data.Search.map(item => {
    const transformedItem = {
      title: item.Title,
      year: item.Year,
      id: item.imdbID,
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

export const transformMovieDetailApiData = (data: TMovieDetailOrigin): TMovieDetail => {
  const transformedRating = data.Ratings.map(item => {
    const transformedItem = {
      source: item.Source,
      value: item.Value,
    };
    return transformedItem;
  })

  const transformedDetail = {
    title: data.Title,
    year: data.Year,
    rated: data.Rated,
    released: data.Released,
    runtime: data.Runtime,
    genre: data.Genre,
    director: data.Director,
    writer: data.Writer,
    actors: data.Actors,
    plot: data.Plot,
    language: data.Language,
    country: data.Country,
    awards: data.Awards,
    poster: data.Poster,
    ratings: transformedRating,
    metaScore: data.Metascore,
    imdbRating: data.imdbRating,
    imdbVotes: data.imdbVotes,
    id: data.imdbID,
    type: data.Type,
    dvd: data.DVD,
    boxOffice: data.BoxOffice,
    production: data.Production,
    website: data.Website,
    response: data.Response,
  }
  
  return transformedDetail;
}