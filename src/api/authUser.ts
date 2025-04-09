import { z } from 'zod';
import axios from 'axios';
import { useEffect, useState } from 'react';

export function fetchRegisterUser(email: string, name: string, surname: string, password: string): Promise<void> {
  return axios.post('https://cinemaguide.skillbox.cc/user', {
    email, name, surname, password,
  })
}

export async function fetchLoginUser(email: string, password: string): Promise<void> {
  return axios.post('https://cinemaguide.skillbox.cc/auth/login', {
    email, password,
  }, { withCredentials: true })
}

export async function fetchLogoutUser(): Promise<void> {
  return axios.get('https://cinemaguide.skillbox.cc/auth/logout', { withCredentials: true })
}

const ProfileSchema = z.object({
  favorites: z.array(z.string()),
  surname: z.string(),
  name: z.string(),
  email: z.string(),
});

type Profile = z.infer<typeof ProfileSchema>;

export const fetchProfile = async (): Promise<Profile> => {
  try {
    const res = await axios.get("https://cinemaguide.skillbox.cc/profile", {
      withCredentials: true
    });
    return ProfileSchema.parse(res.data);
  } catch (error) {
    console.error("Ошибка при получении профиля пользователя:", error);
    throw error;
  }
}

type RequestState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: Profile }
  | { status: 'error'; error: unknown };

export const useProfile = () => {
  const [state, setState] = useState<RequestState>({ status: "idle" });
  
  async function getProfile() {
    setState({ status: "loading" });
    fetchProfile()
      .then(profile => setState({ status: "success", data: profile }))
      .catch(error => setState({ status: "error", error }));
  }

  useEffect(() => {
    if (state.status === 'idle') getProfile();
  }, [state.status]);

  return { state, getProfile };
}