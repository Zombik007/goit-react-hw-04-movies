import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Reviews.module.css';
import * as moviesApi from '../../services/movies-api';

export default function Reviews({ movieId }) {
  const [moviesReviews, setmoviesReviews] = useState([]);

  useEffect(() => {
    moviesApi
      .fetchMoviesReviews(movieId)
      .then(data => {
        return data.results;
      })
      .then(setmoviesReviews);
  }, [movieId]);

  // console.log('moviesReviews: ', moviesReviews);

  return (
    <>
      {moviesReviews.length !== 0 ? (
        <ul className={styles.ReviewsList}>
          {moviesReviews.map(movieReviews => (
            <li className={styles.ReviewsItem} key={movieReviews.id}>
              <h2 className={styles.ReviewsItem__title}>
                Author: {movieReviews.author}
              </h2>

              <p className={styles.ReviewsItem__text}>{movieReviews.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don't have any reviews for this movie</p>
      )}
    </>
  );
}

Reviews.propTypes = {
  movieId: PropTypes.string.isRequired,
};
