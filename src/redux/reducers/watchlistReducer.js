const initialState = {
  watchlist: []
};

const watchListReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_MOVIE_TO_WATCHLIST':
      return {
        ...state,
        watchlist: [...state.watchlist, action.payload]
      };
    case 'REMOVE_MOVIE_FROM_WATCHLIST':
      return {
        ...state,
        watchlist: state.watchlist.filter(movie => movie.imdbID !== action.payload)
      };
    case 'SET_WATCHLIST':
      return {
        ...state,
        watchlist: action.payload
      };
    default:
      return state;
  }
};

export default watchListReducer;
