import './moviesSearch.css'
import { useMoviesList } from "../../api/moviesArray"
import { useSearchParams, Link } from "react-router-dom"
import { convertTime } from "../../utils/convertTime"
import { getBackgroundStyle } from "../../utils/styleRaiting"
import { useEffect, useState } from 'react'

export const MoviesSearch = () => {
  const [searchParams] = useSearchParams('');
  const searchMovie = searchParams.get("searchMovie") || "";
  const { state } = useMoviesList('https://cinemaguide.skillbox.cc/movie');
  const [fullHeight, setFullHeight] = useState(document.documentElement.scrollHeight);

  useEffect(() => {
    const handleResize = () => setFullHeight(document.documentElement.scrollHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  if (state.status === 'success') {
    const filteredMovies = state.data.filter(({ title }) => title.toLowerCase().includes(searchMovie.toLowerCase()));

    return (
      <div className='search-modal' style={{
        height: `${window.matchMedia("(max-width: 660px)").matches ? fullHeight : ''}px`
        }} >
        <ul className='search-movies'>
          {filteredMovies.slice(0, 5).map(({ id, posterUrl, title, tmdbRating, releaseYear, genres, runtime }) => (
            
            <li key={id}>
              <Link className='search-movie' to={`/movies/${id}`}>
                <img className='search-movie-img' src={posterUrl} width="224px" height="336px" loading="lazy" alt={title} />
                <div>
                  <div className='search-movie-info'>
                    <span
                      className='search-movie-raiting'
                      style={{backgroundColor: `${getBackgroundStyle(tmdbRating)}`}}
                    >
                      {tmdbRating.toFixed(1).replace('.', ',')}
                    </span>
                    <span style={{color: '#999'}}>{releaseYear}</span>
                
                    <ul className='search-movie-genres'>
                      {genres.map((genre, index) => (
                        <li style={{color: '#999'}} key={index}>{genre}{index !== genres.length - 1 && ','}</li>
                      ))}
                    </ul>
                    
                    <span style={{color: '#999'}}>{convertTime(runtime)}</span>
                  </div>
                  <p className='search-movie-title'>{title}</p>
                </div>
              </Link>
            </li>
          ))}
        
          {filteredMovies.length === 0 && <p style={{marginLeft: '25px'}}>Ничего не найдено</p>}
        </ul>
      </div>
    )
  }
}
