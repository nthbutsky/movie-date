export type TMovieData = {
  Response: TResponse,
  Search: TMovie[],
  totalResults: string
}

type TResponse = 'True' | 'False'

export type TMovie = {
  Title: string
  Year: string
  imdbID: string
  Type: TMovieType
  Poster: string
}

type TMovieType = 'movie' | 'series' | 'episode'
