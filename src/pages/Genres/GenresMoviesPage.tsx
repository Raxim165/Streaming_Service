import "./genresMoviesPage.css";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { MoviesSearch } from "../../ui/MoviesSearch/MoviesSearch";
import { useGenresMovie } from "../../api/moviesGenres";
import { Loader } from "../../ui/Loader/Loader";

const GenresMoviesPage = () => {
    const [searchParams] = useSearchParams();
    const searchMovie = searchParams.get("searchMovie") || "";

    const state = useGenresMovie()

    switch (state.status) {
      case "loading": return <Loader />;
      case "error": return <div>Произошла ошибка: {String(state.error as unknown)}</div>;
      case "success":
        return (
          <div className="genres-movies">
            {searchMovie && <MoviesSearch />}
            <h2 className="genres-title">Жанры фильмов</h2>
            <ul className="genres">
              {state.data.filter(genre => genre !== 'stand-up' && genre !== 'tv-movie')
              .map(genre => (
                <li className="genre" key={genre}>
                  <Link to={`/genres/${genre}`}>
                    <img src={`src/assets/img/${genre}.webp`} loading="lazy" alt={genre} />
                    <p>{genre}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )
    }
};

export default GenresMoviesPage;