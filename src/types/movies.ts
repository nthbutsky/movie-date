type TResponse = 'True' | 'False'
type TMovieType = 'movie' | 'series' | 'episode'

// API original data
export type TMovieDataOrigin = {
  Response: TResponse,
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
  response: TResponse,
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
