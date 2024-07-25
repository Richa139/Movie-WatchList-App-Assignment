// src/pages/Watchlist.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeMovieFromWatchlist } from '../redux/actions/watchListActions';

const Watchlist = () => {
  const watchlist = useSelector((state) => state.watchlist.watchlist);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>My Watchlist</h2>
      <div>
        {watchlist.map((movie) => (
          <div key={movie.imdbID}>
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
            <button onClick={() => dispatch(removeMovieFromWatchlist(movie.imdbID))}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
