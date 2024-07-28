import {
  TMovieDataOrigin,
} from '@/types/movies';
import {
  apiHttpClient,
} from '@/api/api-http-client';
import {
  IApiResponse,
} from '@/types/api/api-response';

export const getMoviesDataBySearch = (payload: string): IApiResponse<TMovieDataOrigin> => {
  return apiHttpClient.get(`/?apikey=${process.env.NEXT_PUBLIC__OMDB_API}&s=${payload}`);
};
