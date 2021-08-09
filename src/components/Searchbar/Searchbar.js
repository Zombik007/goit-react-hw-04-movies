import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [moviesQuery, setMoviesQuery] = useState('');
  const [error, setError] = useState(null);

  const handleQueryChange = e => {
    setMoviesQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (moviesQuery.trim() === '') {
      setError('Try entering something into the search bar');
    }
    onSubmit(moviesQuery);
    setMoviesQuery('');
  };

  return (
    <>
      <div className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={styles.SearchForm__button}>
            <span className={styles.SearchForm__button_label}>Search</span>
          </button>

          <input
            className={styles.SearchForm__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder={`${error ? error : 'Search movies'}`}
            value={moviesQuery}
            onChange={handleQueryChange}
          />
        </form>
      </div>
    </>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
