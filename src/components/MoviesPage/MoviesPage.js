import { useState, useEffect } from 'react';
import * as moviesApi from '../../services/movies-api';
import { Link, useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import styles from './MoviesPage.module.css';
import Searchbar from '../Searchbar/Searchbar';
import Loader from '../Loader/Loader';
import image from '../../images/no-image-available.jpg';

export default function MoviesPage() {
  const { url } = useRouteMatch();
  const [moviesQuery, setMoviesQuery] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  const history = useHistory();
  const location = useLocation();
  const historyQuery = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (!searchQuery) {
      setSearchQuery(historyQuery);
      return;
    }

    setStatus('pending');

    moviesApi
      .fetchMoviesByQuery(searchQuery)
      .then(data => {
        return data.results;
      })
      .then(movies => {
        if (movies.length === 0) {
          setError(
            `Sorry for your request ${searchQuery}, no results were found.`,
          );
          setStatus('rejected');
          return;
        } else {
          setMoviesQuery(movies);
          setStatus('resolved');
        }
      })
      .catch(() => {
        setStatus('rejected');
      });
  }, [historyQuery, searchQuery]);

  const handleFormSubmit = movieQuery => {
    if (!movieQuery) {
      setStatus('rejected');
      setError(`Sorry, but you haven't entered anything into the search bar.`);
      return;
    }
    setSearchQuery(movieQuery);
    history.push({
      ...location,
      search: `query=${movieQuery}`,
    });
  };

  if (status === 'idle') {
    return (
      <>
        <Searchbar onSubmit={handleFormSubmit} />
        <h2
          style={{
            textAlign: 'center',
          }}
        >
          Enter what movies you want to search
        </h2>
      </>
    );
  }

  if (status === 'pending') {
    return (
      <>
        <Searchbar onSubmit={handleFormSubmit} />
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <Loader />
        </div>
      </>
    );
  }

  if (status === 'rejected') {
    return (
      <>
        <Searchbar onSubmit={handleFormSubmit} />
        <h2
          style={{
            textAlign: 'center',
          }}
        >
          {error}
        </h2>
      </>
    );
  }

  if (status === 'resolved') {
    return (
      <>
        <Searchbar onSubmit={handleFormSubmit} />
        {moviesQuery && (
          <ul className={styles.MoviePageList}>
            {moviesQuery.map(movieQuery => (
              <li className={styles.MoviePageItem} key={movieQuery.id}>
                <Link
                  to={{
                    pathname: `${url}/${movieQuery.id}`,
                    state: {
                      from: location,
                    },
                  }}
                >
                  <img
                    src={
                      movieQuery.poster_path === null
                        ? image
                        : `https://image.tmdb.org/t/p/w500${movieQuery.poster_path}`
                    }
                    alt={movieQuery.title}
                    className={styles.MoviePageItem__image}
                  />
                  <h2 className={styles.MoviePageItem__title}>
                    {movieQuery.title}
                  </h2>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}
