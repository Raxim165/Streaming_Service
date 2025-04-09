import { z } from 'zod';
import axios from 'axios';
import { useState, useEffect } from 'react';

const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  posterUrl: z.string().url(),
  genres: z.array(z.string()),
  runtime: z.number(),
  tmdbRating: z.number(),
  releaseYear: z.number(),
});

const MoviesListSchema = z.array(MovieSchema);
export type Movies = z.infer<typeof MovieSchema>;

type RequestState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: Movies[] }
  | { status: 'error'; error: unknown };

async function fetchTopMovies(url: string): Promise<Movies[]> {
  try {
    const res = await axios.get(url);
    return MoviesListSchema.parse(res.data)
  } catch (error) {
    // console.error('Ошибка при получении списка фильмов:', error);
    throw error;
  }
}

export function useMoviesList(url: string) {
  const [state, setState] = useState<RequestState>({ status: 'idle' });

  const loadTopMovies = async () => {
    setState({ status: 'loading' });
    fetchTopMovies(url)
      .then(movies => setState({ status: 'success', data: movies }))
      .catch(error => setState({ status: 'error', error }));
  };

  useEffect(() => { if (state.status === 'idle') loadTopMovies() }, []);
  return { state, loadTopMovies };
}
