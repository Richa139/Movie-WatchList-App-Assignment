// src/pages/Search.js
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addMovieToWatchlist } from '../redux/actions/watchListActions';

const Search = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();

  const searchMovies = async () => {
    const response = await axios.get(`http://www.omdbapi.com/?s=${query}&apikey=YOUR_API_KEY`);
    setMovies(response.data.Search);
  };

  return (
    <div>
      <h2>Search Movies</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a movie"
      />
      <button onClick={searchMovies}>Search</button>
      <div>
        {movies.map((movie) => (
          <div key={movie.imdbID}>
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
            <button onClick={() => dispatch(addMovieToWatchlist(movie))}>Add to Watchlist</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
