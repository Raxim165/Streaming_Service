import './favoritesMovies.css';
import { useState } from 'react';
import { fetchRemoveMovieFavorites, useMoviesFavorites } from '../../api/favoritesMovies';
import { Link } from 'react-router-dom';
import { Loader } from '../Loader/Loader';

export const FavoritesMovies = () => {
  const { stateFavorites, loadMovies } = useMoviesFavorites();
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  
  switch (stateFavorites.status) {
    case 'loading': return <Loader />;
    case 'success':
      return (
        <ul className='favorites-movies'>
          {stateFavorites.data.map(({ id, posterUrl, title }) => (
            <li
              key={id}
              className='favorites-movies-item'
              onMouseEnter={() => setHoveredId(id)}
              onMouseLeave={() => setHoveredId(null)}
              >
              <Link to={`/movies/${id}`}>
                <img className='favorites-img' src={posterUrl} alt={title} />
              </Link>

              {hoveredId === id &&
              <button
                className='favorites-delete-movie'
                onClick={async () => {
                  await fetchRemoveMovieFavorites(String(id));
                  loadMovies();
                }}
                >
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" rx="20" fill="white"/>
                <path d="M19.9987 18.5865L24.9485 13.6367L26.3627 15.0509L21.4129 20.0007L26.3627 24.9504L24.9485 26.3646L19.9987 21.4149L15.049 26.3646L13.6348 24.9504L18.5845 20.0007L13.6348 15.0509L15.049 13.6367L19.9987 18.5865Z" fill="black"/>
                </svg>
              </button>}
            </li>
          ))}
        </ul>
      )
    default: return null;
  }
}