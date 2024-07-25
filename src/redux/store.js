// src/redux/store.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';  // Correct import for thunk
import movieReducer from './reducers/movieReducer';  // Correct import for your reducer
import watchlistReducer from './reducers/watchlistReducer';
const rootReducer = combineReducers({
  movies: movieReducer,
  watchlist: watchlistReducer, // Add watchlistReducer

  // add other reducers here if needed
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;  // Export as default
