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

// API transformed data
export type TMovieData = {
  response: EResponse,
  search: TMovie[],
  totalResults: string
}
export type TMovie = {
  title: string
  year: string
  imdbid: string
  type: TMovieType
  poster: string
}
