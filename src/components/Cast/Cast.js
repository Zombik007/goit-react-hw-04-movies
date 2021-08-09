import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as moviesApi from '../services/movies-api';
import image from '../../images/no-avatar-available.png';
import styles from './Cast.module.css';

export default function Cast({ movieId }) {
  const [moviesCast, setMoviesCast] = useState(null);

  useEffect(() => {
    moviesApi
      .fetchMoviesCredits(movieId)
      .then(data => {
        return data.cast;
      })
      .then(setMoviesCast);
  }, [movieId]);

  console.log('moviesCast: ', moviesCast);

  return (
    <>
      {moviesCast && (
        <ul className={styles.CastList}>
          {moviesCast.map(movieCast => (
            <li className={styles.CastItem} key={movieCast.cast_id}>
              <img
                src={
                  movieCast.profile_path === null
                    ? image
                    : `https://image.tmdb.org/t/p/w500${movieCast.profile_path}`
                }
                alt={movieCast.name}
                className={styles.CastItem__image}
              />
              <h2 className={styles.CastItem__title}>{movieCast.name}</h2>
              <p className={styles.CastItem__text}>{movieCast.character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

Cast.propTypes = {
  movieId: PropTypes.string.isRequired,
};
