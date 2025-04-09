import { TopFilms } from "../../ui/TopMovies/TopMovies"
import MoviePage from "../Movie/MoviePage";

const MainPage = () => {

  return (
    <div
      style={{
        paddingTop: '32px',
        paddingBottom: '120px',
      }}
      >
      <MoviePage />
      {location.pathname === '/' && <TopFilms />}
    </div>
  )
}

export default MainPage