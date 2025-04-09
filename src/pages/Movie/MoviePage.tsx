import "./moviePage.css"
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { toggleShowTrailer } from "./trailerMovieSlice";
import { convertLanguage } from "../../utils/convertLanguage";
import { convertTime } from "../../utils/convertTime";
import { convertPrice } from "../../utils/convertPrice";
import { getBackgroundStyle } from "../../utils/styleRaiting";
import { useMovie } from "../../api/movieObject";
import { useParams, useLocation, useSearchParams, Link } from "react-router-dom";
import { Loader } from "../../ui/Loader/Loader";
import { MoviesSearch } from "../../ui/MoviesSearch/MoviesSearch";
import { TrailerPlayer } from "../../ui/TrailerPlayer/TrailerPlayer";
import { fetchAddMovieFavorites, fetchRemoveMovieFavorites, useMoviesFavorites } from "../../api/favoritesMovies";

const MoviePage = () => {
  const dispatch = useAppDispatch();
  const showTrailer = useAppSelector(state => state.trailer.show);
  const [isFavorite, setIsFavorite] = useState(false);
  const surname = localStorage.getItem('surname');
  
  const { movieId } = useParams<{ movieId: string }>();
  const [searchParams] = useSearchParams();
  const searchMovie = searchParams.get("searchMovie") || "";
  const location = useLocation();
  const isMain = location.pathname === '/'

  const { state, loadMovie } = isMain
    ? useMovie('https://cinemaguide.skillbox.cc/movie/random')
    : useMovie(`https://cinemaguide.skillbox.cc/movie/${movieId}` || "");

  const getYouTubeVideoId = (url: string): string | null => {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.searchParams.get("v") || null;
    } catch { return null }
  };

  useEffect(() => { if (state.status === 'error') loadMovie() }, [state.status]);

  if (surname) {
    const { stateFavorites } = useMoviesFavorites();
    useEffect(() => {
      if (stateFavorites.status === 'success') {
        const favoriteMovie = stateFavorites.data.some(movie => movie.id === Number(movieId));
        setIsFavorite(favoriteMovie);
      }
    }, [stateFavorites.status]);
  }

  switch (state.status) {
    case 'idle': return null;
    case 'loading': return <Loader />;
    case 'success': {
      const { id, title, plot, releaseYear, posterUrl, tmdbRating, runtime, genres,
        language, budget, revenue, director, production, awardsSummary, trailerUrl } = state.data;

      const trailerId = getYouTubeVideoId(trailerUrl);
      if (!trailerId) return null;

      const handleAddFavorites = async () => {
        if (!surname) alert('для добавления в избранное необходима авторизация');
        else {
          if (isFavorite) {
            await fetchRemoveMovieFavorites(String(id))
            setIsFavorite(false);
          }
          else {
            await fetchAddMovieFavorites(String(id))
            setIsFavorite(true);
          };
        };
      }

      return (
        <>
        {showTrailer && <TrailerPlayer trailerId={trailerId} />}
        {searchMovie && <MoviesSearch />}

        <div className="movie-page">
          <div className="movie-left">
            <div className="movie-info">
              <span
                className="movie-raiting"
                style={{backgroundColor: `${getBackgroundStyle(tmdbRating)}`, fontSize: '16px'}}
                >
                {tmdbRating.toFixed(1).replace('.', ',')}
              </span>

              <span style={{color: '#999'}}>{releaseYear}</span>
              <ul className="movie-genres">
                {genres.map((genre, index) => {
                  return (
                    <li style={{color: '#999'}} key={genre}>{genre}{index !== genres.length - 1 && ','}</li>
                  )
                })}
              </ul>
              <span style={{color: '#999'}}>{convertTime(runtime)}</span>
            </div>

            <h2 className="movie-title">{title}</h2>
            <p className="movie-plot">{plot}</p>
            <div className="movie-buttons">
              <button
                style={{width: `${!isMain ? '60%' : ''}`}}
                className="button-trailer"
                onClick={() => dispatch(toggleShowTrailer(true))}
                >
                  Трейлер
              </button>
              {isMain && ( <Link to={`/movies/${id}`} className="button-about-movie">О&nbsp;фильме</Link> )}

              <button onClick={handleAddFavorites} className="button-icon button-icon-favorite" aria-label='кнопка добавления фильма в избранное'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {isFavorite && <path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3Z" fill="#B4A9FF"/>}
                  {!isFavorite && <path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3ZM12.9339 18.6038C13.8155 18.0485 14.61 17.4955 15.3549 16.9029C18.3337 14.533 20 11.9435 20 9C20 6.64076 18.463 5 16.5 5C15.4241 5 14.2593 5.56911 13.4142 6.41421L12 7.82843L10.5858 6.41421C9.74068 5.56911 8.5759 5 7.5 5C5.55906 5 4 6.6565 4 9C4 11.9435 5.66627 14.533 8.64514 16.9029C9.39 17.4955 10.1845 18.0485 11.0661 18.6038C11.3646 18.7919 11.6611 18.9729 12 19.1752C12.3389 18.9729 12.6354 18.7919 12.9339 18.6038Z" fill="white"/>}
                </svg>
              </button>

              {isMain && (
                <button className="button-icon button-icon-reboot" onClick={loadMovie} aria-label="кнопка перезагрузки">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 2C12.7486 2 15.1749 3.38626 16.6156 5.5H14V7.5H20V1.5H18V3.99936C16.1762 1.57166 13.2724 0 10 0C4.47715 0 0 4.47715 0 10H2C2 5.58172 5.58172 2 10 2ZM18 10C18 14.4183 14.4183 18 10 18C7.25144 18 4.82508 16.6137 3.38443 14.5H6V12.5H0V18.5H2V16.0006C3.82381 18.4283 6.72764 20 10 20C15.5228 20 20 15.5228 20 10H18Z" fill="white"/>
                  </svg>
                </button>
                )}
            </div>
          </div>

          <div className="movie-right">
            <img className="movie-poster" loading="lazy" src={posterUrl} alt={title} />
          </div>
          {!isMain && (
            <div className="details">
              <h3 className="movie-title-about">О фильме</h3>
              {language &&
              <div className="about-movie-details">
                <span>Язык оригинала</span><span>......................</span>
                <span>{convertLanguage(language)}</span>
              </div>}

              {budget &&
              <div className="about-movie-details">
                <span>Бюджет</span><span>.....................................</span>
                <span>{convertPrice(budget)}</span>
              </div>}

              {revenue &&
              <div className="about-movie-details" >
                <span>Выручка</span><span>....................................</span>
                <span>{convertPrice(revenue)}</span>
              </div>}

              {director &&
              <div className="about-movie-details" >
                <span>Режиссёр</span><span>..................................</span>
                <span>{director}</span>
              </div>}

              {production &&
              <div className="about-movie-details" >
                <span>Продакшен</span><span>...............................</span>
                <span>{production}</span>
              </div>}

              {awardsSummary &&
              <div className="about-movie-details" >
                <span>Награды</span><span>....................................</span>
                <span>{awardsSummary}</span>
              </div>}
            </div>
          )}
        </div>
        </>);
    }
    default: return null;
  }
}

export default MoviePage