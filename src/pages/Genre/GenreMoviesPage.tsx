import './genreMoviesPage.css'
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useMoviesList, Movies } from "../../api/moviesArray";
import { useSearchParams } from 'react-router-dom';
import { MoviesSearch } from '../../ui/MoviesSearch/MoviesSearch';

type GenreParams = { genre: string };

const GenreMoviesPage = () => {
  const { state } = useMoviesList('https://cinemaguide.skillbox.cc/movie');
  const { genre } = useParams<GenreParams>();
  const [filteredMovies, setFilteredMovies] = useState<Movies[]>([]);

  const [searchParams] = useSearchParams();
  const searchMovie = searchParams.get("searchMovie") || "";
  const [displayedMoviesCount, setDisplayedMoviesCount] = useState(15);
  const handleShowMore = () => setDisplayedMoviesCount(displayedMoviesCount + 15);
  
  useEffect(() => {
    if (state.status === 'success' && genre) {
      setFilteredMovies(state.data.filter(movie => movie.genres.includes(genre)));
    }
  }, [state, genre]);

  return (
    <>
      {searchMovie && <MoviesSearch />}
      <Link to={`/genres`} className="genre-button-back">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.047 20.0012L26.2967 28.2507L23.9397 30.6077L13.333 20.0012L23.9397 9.39453L26.2967 11.7515L18.047 20.0012Z" />
        </svg>
        {genre && genre.charAt(0).toUpperCase() + genre.slice(1)}
      </Link>
      <ul className="genre-movies">
        {filteredMovies.slice(0, displayedMoviesCount).map(({ id, posterUrl, title}) => (
          <li className='genre-movies-item' key={id}>
            <Link to={`/genres/${genre}/${id}`}>
              <img src={posterUrl} alt={title} />
            </Link>
          </li>
        ))}
      </ul>
      <div className='button-wrapper'>
        {filteredMovies.length > displayedMoviesCount && (
          <button className="button-show-more" onClick={handleShowMore}>Показать еще</button>
        )}
      </div>
    </>
  );
};

export default GenreMoviesPage;
