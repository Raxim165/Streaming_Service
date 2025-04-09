import { z } from "zod";
import axios from "axios";
import { useState, useEffect } from "react";

export function fetchAddMovieFavorites(id: string): Promise<void> {
  return axios.post('https://cinemaguide.skillbox.cc/favorites', { id }, { withCredentials: true });
}

const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  posterUrl: z.string().url(),
});

export const MoviesListSchema = z.array(MovieSchema);
export type Movies = z.infer<typeof MovieSchema>;

export async function fetchMoviesFavorites(): Promise<Movies[]> {
  try {
    const res = await axios.get('https://cinemaguide.skillbox.cc/favorites', { withCredentials: true });
    return MoviesListSchema.parse(res.data);
  } catch (error) {
    console.error('Ошибка при получении списка избранных фильмов:', error);
    throw error;
  }
}

type RequestState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: Movies[] }
  | { status: 'error'; error: unknown };

export function useMoviesFavorites() {
  const [stateFavorites, setStateFavorites] = useState<RequestState>({ status: 'idle' });

  const loadMovies = async () => {
    setStateFavorites({ status: 'loading' });
    fetchMoviesFavorites()
      .then(movies => setStateFavorites({ status: 'success', data: movies }))
      .catch(error => setStateFavorites({ status: 'error', error }));
  };

  useEffect(() => { if (stateFavorites.status === 'idle') loadMovies() }, []);
  return { stateFavorites, loadMovies };
}

export function fetchRemoveMovieFavorites(id: string): Promise<void> {
  return axios.delete(`https://cinemaguide.skillbox.cc/favorites/${id}`, { withCredentials: true });
}