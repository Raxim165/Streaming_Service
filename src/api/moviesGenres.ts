import { string, z } from 'zod';
import axios from 'axios';
import { useState, useEffect } from 'react';

const GenresSchema = z.array(string())

type Genres = z.infer<typeof GenresSchema>

type RequestState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: Genres }
  | { status: 'error'; error: unknown };

async function fetchGenres(): Promise<Genres> {
  try {
    const res = await axios.get('https://cinemaguide.skillbox.cc/movie/genres');
    return GenresSchema.parse(res.data)
  } catch (error) {
    // console.error('Ошибка при получении списка жанров:', error);
    throw error;
  }
}

export function useGenresMovie() {
  const [state, setState] = useState<RequestState>({ status: 'idle' });

  useEffect(() => {
    async function getData() {
      try {
        setState({ status: 'loading' });
        const genres = await fetchGenres();
        setState({ status: 'success', data: genres });
      } catch (error) {
        setState({ status: 'error', error });
        throw error;
      }
    }

    if (state.status === 'idle') getData()
  }, [state.status]);
  return state
}