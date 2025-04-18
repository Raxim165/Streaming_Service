import "./trailerPlayler.css"
import { toggleShowTrailer } from "../../pages/Movie/trailerMovieSlice"
import { useAppDispatch } from "../../store/hooks"
import { FC, useEffect, useState } from "react"
import YouTube from "react-youtube"

interface TrailerProps {
  trailerId: string;
}

export const TrailerPlayer: FC<TrailerProps> = ({ trailerId }) => {

  const dispatch = useAppDispatch()
  const [fullHeight, setFullHeight] = useState(document.documentElement.scrollHeight);

  useEffect(() => {
    const handleResize = () => setFullHeight(document.documentElement.scrollHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="trailer-modal" style={{ height: `${fullHeight}px` }}>
      <div className="trailer-wrapper">
        <button
          className="trailer-close"
          onClick={() => dispatch(toggleShowTrailer(false))}
          aria-label="закрыть окно трейлера"
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="24" fill="white"/>
          <path d="M22.5859 24L14.793 16.2071L16.2072 14.7928L24.0001 22.5857L31.793 14.7928L33.2072 16.2071L25.4143 24L33.2072 31.7928L31.793 33.2071L24.0001 25.4142L16.2072 33.2071L14.793 31.7928L22.5859 24Z" fill="black"/>
          </svg>
        </button>
        <YouTube
          className="trailer-video"
          videoId={trailerId}
          opts={{
            width: "100%",
            height: "100%",
            playerVars: {
              autoplay: 1,
            },
          }}
        />
      </div>
    </div>
  )
}