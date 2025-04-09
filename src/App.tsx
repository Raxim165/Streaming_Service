import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './ui/Header/Header'
import { Footer } from './ui/Footer/Footer'

const LazyMain = lazy(() => import('./pages/Main/MainPage'));
const LazyGenresMovies = lazy(() => import('./pages/Genres/GenresMoviesPage'));
const LazyGenreMovies = lazy(() => import('./pages/Genre/GenreMoviesPage'));
const LazyMovie = lazy(() => import('./pages/Movie/MoviePage'));
const LazyProfile = lazy(() => import('./pages/Profile/ProfilePage'));

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Header />
        <main style={{minHeight: 'calc(100vh - 206px)'}}>
          <Routes>
            <Route path="/" element={<LazyMain />} />
            <Route path="/genres" element={<LazyGenresMovies />} />
            <Route path="/genres/:genre" element={<LazyGenreMovies />} />
            <Route path="/genres/:genre/:movieId" element={<LazyMovie />} />
            <Route path="/top-movies/:movieId" element={<LazyMovie />} />
            <Route path="/movies/:movieId" element={<LazyMovie />} />
            <Route path='/profile' element={<LazyProfile />}/>
          </Routes>
        </main>
        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
