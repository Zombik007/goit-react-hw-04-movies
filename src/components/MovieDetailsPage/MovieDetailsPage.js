import { useState, useEffect, lazy, Suspense } from 'react';
import {
  NavLink,
  Route,
  useHistory,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import image from '../../images/no-image-available.jpg';
import * as moviesApi from '../services/movies-api';
import styles from './MovieDetailsPage.module.css';

const Cast = lazy(() =>
  import('../Cast/Cast.js' /*webpackChunkName: "cast" */),
);
const Reviews = lazy(() =>
  import('../Reviews/Reviews.js' /*webpackChunkName: "reviews" */),
);

export default function MovieDetailsPage() {
  const history = useHistory();
  const location = useLocation();
  const { url, path } = useRouteMatch();
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    moviesApi.fetchMoviesDetails(movieId).then(setMovieDetails);
  }, [movieId]);

  const onGoBack = () => {
    history.push(location?.state?.from ?? '/movies');
  };

  console.log('movieDetails: ', movieDetails);
  console.log(location);

  return (
    <>
      <button
        type="button"
        className={styles.MovieDetails__button}
        onClick={onGoBack}
      >
        Go back
      </button>

      {movieDetails && (
        <div className={styles.MovieDetails__card}>
          <img
            src={
              movieDetails.poster_path === null
                ? image
                : `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
            }
            alt={movieDetails.title}
            className={styles.MovieDetails__image}
          />
          <div>
            <h2>{movieDetails.title}</h2>
            <h3>Overview</h3>
            <p>{movieDetails.overview}</p>
            <h3>Genres</h3>
            {movieDetails.genres.length !== 0 ? (
              <ul>
                {movieDetails.genres.map(genre => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            ) : (
              <p>This film has no genres</p>
            )}
          </div>
        </div>
      )}

      <ul>
        <li>
          <NavLink to={`${url}/cast`}>Cast</NavLink>
        </li>
        <li>
          <NavLink to={`${url}/reviews`}>Reviews</NavLink>
        </li>
      </ul>

      <Suspense fallback={<Loader />}>
        <Route path={`${path}/cast`}>
          {movieDetails && <Cast movieId={movieId} />}
        </Route>

        <Route path={`${path}/reviews`}>
          {movieDetails && <Reviews movieId={movieId} />}
        </Route>
      </Suspense>
    </>
  );
}
