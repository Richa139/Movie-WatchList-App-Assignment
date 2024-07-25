import axios from 'axios';

const API_KEY = '34f064bf';
const predefinedMovies = [
  'tt0111161', 'tt0068646', 'tt0071562', 'tt0468569', 'tt0050083',
  'tt0108052', 'tt0137523', 'tt0167260', 'tt0372784', 'tt0133093',
];

export const setMovies = (movies) => ({
  type: 'SET_MOVIES',
  payload: movies,
});

export const addToWatchlist = (movie) => ({
  type: 'ADD_TO_WATCHLIST',
  payload: movie,
});

const fetchMoviesRequest = () => ({
  type: 'FETCH_MOVIES_REQUEST',
});

const fetchMoviesFailure = () => ({
  type: 'FETCH_MOVIES_FAILURE',
});

export const fetchMovies = (query = '') => {
  return async (dispatch) => {
    dispatch(fetchMoviesRequest());
    try {
      if (query) {
        // Search movies by query
        const response = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
        if (response.data.Response === 'True') {
          dispatch(setMovies(response.data.Search));
        } else {
          dispatch(fetchMoviesFailure());
        }
      } else {
        // Fetch predefined movies individually
        const moviePromises = predefinedMovies.map(id =>
          axios.get(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`)
        );
        const movieResponses = await Promise.all(moviePromises);
        const movieData = movieResponses.map(response => response.data);
        dispatch(setMovies(movieData));
      }
    } catch (error) {
      dispatch(fetchMoviesFailure());
      console.error('Failed to fetch movies', error);
    }
  };
};

const searchMoviesRequest = () => ({
  type: 'SEARCH_MOVIES_REQUEST',
});

const searchMoviesFailure = () => ({
  type: 'SEARCH_MOVIES_FAILURE',
});

export const searchMovies = (query) => {
  return async (dispatch) => {
    dispatch(searchMoviesRequest());
    try {
      const response = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
      if (response.data.Response === 'True') {
        dispatch(setMovies(response.data.Search));
      } else {
        dispatch(searchMoviesFailure());
      }
    } catch (error) {
      dispatch(searchMoviesFailure());
      console.error('Failed to search movies', error);
    }
  };
};
