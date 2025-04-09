import './topMovies.css'
import { useMoviesList } from "../../api/moviesArray"
import { useEffect } from "react"
import { Loader } from '../Loader/Loader'
import { Link } from "react-router-dom"

export const TopFilms = () => {
  const { state, loadTopMovies } = useMoviesList('https://cinemaguide.skillbox.cc/movie/top10');

  useEffect(() => {
    if (state.status === 'error') loadTopMovies();
  }, [state.status, loadTopMovies]);

  switch (state.status) {
    case 'loading': return <Loader />;
    case 'success':
      return (
        <div style={{paddingTop: '50px'}}>
          <h2 className="top-movies-title">Топ 10 фильмов</h2>
          <ul className="top-movies">
            {state.data.map(({ id, posterUrl, title }, index) => (
              <li className="top-movies-item" key={id}>
                <Link to={`/top-movies/${id}`}>
                  <img src={posterUrl} loading="lazy" alt={title} />
                  <span>{index + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );
    default:return null;
  }
}