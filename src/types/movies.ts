export enum EResponse {
  TRUE = 'True',
  FALSE = 'False'
}
type TMovieType = 'movie' | 'series' | 'episode'

// API original data
export type TMovieDataOrigin = {
  Response: EResponse,
  Search: TMovieOrigin[],
  totalResults: string
}
export type TMovieOrigin = {
  Title: string
  Year: string
  imdbID: string
  Type: TMovieType
  Poster: string
}
type TRatingOrigin = {
  Source: string
  Value: string
}
export type TMovieDetailOrigin = {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: TRatingOrigin[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: TMovieType
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: EResponse
}

// API transformed data
export type TMovieData = {
  response: EResponse,
  search: TMovie[],
  totalResults: string
}
export type TMovie = {
  title: string
  year: string
  id: string
  type: TMovieType
  poster: string
}
type TRating = {
  source: string
  value: string
}
export type TMovieDetail = {
  title: string
  year: string
  rated: string
  released: string
  runtime: string
  genre: string
  director: string
  writer: string
  actors: string
  plot: string
  language: string
  country: string
  awards: string
  poster: string
  ratings: TRating[]
  metaScore: string
  imdbRating: string
  imdbVotes: string
  id: string
  type: TMovieType
  dvd: string
  boxOffice: string
  production: string
  website: string
  response: EResponse
}