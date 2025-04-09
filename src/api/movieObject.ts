import { z } from 'zod';
import axios from 'axios';
import { useState, useEffect } from 'react';

const MovieSchema = z.object({
  id: z.number(),
  plot: z.string(),
  title: z.string(),
  language: z.string(),
  runtime: z.number(),
  tmdbRating: z.number(),
  releaseYear: z.number(),
  genres: z.array(z.string()),
  budget: z.string().nullable(),
  revenue: z.string().nullable(),
  director: z.string().nullable(),
  production: z.string().nullable(),
  awardsSummary: z.string().nullable(),
  posterUrl: z.string().url(),
  trailerUrl: z.string().url(),
});

type Movie = z.infer<typeof MovieSchema>;

type RequestState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: Movie }
  | { status: 'error'; error: unknown };

async function fetchMovie(url: string): Promise<Movie> {
  try {
    const res = await axios.get(url);
    return MovieSchema.parse(res.data);
  } catch (error) {
    // console.error('Ошибка при получении фильма:', error);
    throw error;
  }
}

export function useMovie(url: string) {
  const [state, setState] = useState<RequestState>({ status: 'idle' });

  const loadMovie = async () => {
    setState({ status: 'loading' })
    fetchMovie(url)
      .then(movie => setState({ status: 'success', data: movie }))
      .catch(error => setState({ status: 'error', error }));
  }

  useEffect(() => { if (state.status === 'idle') loadMovie() }, [state.status]);

  return { state, loadMovie };
}