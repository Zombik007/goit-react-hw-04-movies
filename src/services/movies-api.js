import axios from 'axios';
const API_KEY = '8e21a9da93e3e26e31007a5f0585823a';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const fetchWithError = async (url = '') => {
  try {
    const response = await axios.get(url, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export function fetchTrendingMovie() {
  return fetchWithError(`/trending/movie/day`);
}

export function fetchMoviesByQuery(query) {
  return fetchWithError(
    `/search/movie?language=en-US&page=1&include_adult=false&query=${query}`,
  );
}

export function fetchMoviesDetails(movieId) {
  return fetchWithError(`/movie/${movieId}?language=en-US`);
}

export function fetchMoviesCredits(movieId) {
  return fetchWithError(`/movie/${movieId}/credits?language=en-US`);
}

export function fetchMoviesReviews(movieId) {
  return fetchWithError(`/movie/${movieId}/reviews?language=en-US&page=1`);
}
