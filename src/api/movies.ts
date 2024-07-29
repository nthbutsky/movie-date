import {
  TMovieDataOrigin, TMovieDetailOrigin
} from '@/types/movies';
import {
  apiHttpClient,
} from '@/api/api-http-client';
import {
  IApiResponse,
} from '@/types/api/api-response';

const apiKey = `/?apikey=${process.env.NEXT_PUBLIC__OMDB_API}`;

export const getMoviesDataBySearch = (payload: string): IApiResponse<TMovieDataOrigin> => {
  return apiHttpClient.get(`${apiKey}&s=${payload}`);
};

export const getMovieDataById = (payload: string): IApiResponse<TMovieDetailOrigin> => {
  return apiHttpClient.get(`${apiKey}&i=${payload}`);
}