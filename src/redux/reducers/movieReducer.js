const initialState = {
  movies: [],
  loading: false,
  error: null,
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_MOVIES_REQUEST':
    case 'SEARCH_MOVIES_REQUEST':
      return { ...state, loading: true };
    case 'SET_MOVIES':
      return { ...state, loading: false, movies: action.payload };
    case 'FETCH_MOVIES_FAILURE':
    case 'SEARCH_MOVIES_FAILURE':
      return { ...state, loading: false, error: 'Failed to fetch movies' };
    default:
      return state;
  }
};

export default movieReducer;
