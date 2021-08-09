import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './HomePage.module.css';
import * as moviesApi from '../services/movies-api';
import image from '../../images/no-image-available.jpg';

export default function HomePage() {
  const location = useLocation();
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    moviesApi
      .fetchTrendingMovie()
      .then(data => {
        return data.results;
      })
      .then(setMovies);
  }, []);

  console.log('movies: ', movies);

  return (
    <>
      {movies && (
        <ul className={styles.HomePageList}>
          {movies.map(movie => (
            <li className={styles.HomePageItem} key={movie.id}>
              <Link
                to={{
                  pathname: `/movies/${movie.id}`,
                  state: {
                    from: location,
                  },
                }}
              >
                <img
                  src={
                    movie.poster_path === null
                      ? image
                      : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  }
                  alt={movie.title}
                  className={styles.HomePageItem__image}
                />
                <h2 className={styles.HomePageItem__title}>{movie.title}</h2>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
