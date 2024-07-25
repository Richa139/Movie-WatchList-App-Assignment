export const addMovieToWatchlist = (movie) => {
  return {
    type: 'ADD_MOVIE_TO_WATCHLIST',
    payload: movie
  };
};

export const removeMovieFromWatchlist = (imdbID) => {
  return {
    type: 'REMOVE_MOVIE_FROM_WATCHLIST',
    payload: imdbID
  };
};

export const setWatchlist = (watchlist) => {
  return {
    type: 'SET_WATCHLIST',
    payload: watchlist
  };
};
