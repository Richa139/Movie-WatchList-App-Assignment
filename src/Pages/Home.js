import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../redux/actions/movieActions';
import { addMovieToWatchlist, removeMovieFromWatchlist, setWatchlist } from '../redux/actions/watchListActions';
import MovieCard from './MovieCard';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const dispatch = useDispatch();
  const movies = useSelector(state => state.movies.movies);
  const loading = useSelector(state => state.movies.loading);
  const error = useSelector(state => state.movies.error);
  const watchlist = useSelector(state => state.watchlist.watchlist);
  const currentUser = localStorage.getItem('currentUser');

  useEffect(() => {
    dispatch(fetchMovies());

    if (currentUser) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(user => user.email === currentUser);
      if (user) {
        dispatch(setWatchlist(user.watchlist));
      }
    }
  }, [dispatch, currentUser]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    dispatch(fetchMovies(searchQuery));
  };

  const handleAddToWatchlist = (movie) => {
    if (!currentUser) {
      localStorage.setItem('redirectMovie', JSON.stringify(movie));
      navigate('/login');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(user => {
      if (user.email === currentUser) {
        user.watchlist.push(movie);
      }
      return user;
    });
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    dispatch(addMovieToWatchlist(movie));
  };

  const handleRemoveFromWatchlist = (imdbID) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(user => {
      if (user.email === currentUser) {
        user.watchlist = user.watchlist.filter(movie => movie.imdbID !== imdbID);
      }
      return user;
    });
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    dispatch(removeMovieFromWatchlist(imdbID));
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    dispatch(setWatchlist([]));
    navigate('/login');
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const closeDetails = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="home-container">
      <div className="sidebar">
        <h2>Watchlist</h2>
        <ul>
          {watchlist.map(movie => (
            <li key={movie.imdbID}>
              {movie.Title}
              <button onClick={() => handleRemoveFromWatchlist(movie.imdbID)}>Remove</button>
            </li>
          ))}
        </ul>
        <div className="register-login-container" style={{display:"flex" , flexDirection:"row" , justifyContent:"space-between"}}>
          {!currentUser ? (
            <>
              <button className="action-button" style={{ fontSize:"20px"}} onClick={() => window.location.href = '/register'}>
        Register!
      </button>
      <button className="action-button" style={{ fontSize:"20px"}} onClick={() => window.location.href = '/login'}>
        Login!
      </button>
            </>
          ) : (
            <div>
              <p>Logged in as: {currentUser}</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
      <div className="main-content">
        <div className="welcome-card">
          <h1>Welcome to the Movie Watchlist</h1>
          <p>Discover and keep track of your favorite movies. Click the + button on any movie to add it to your watchlist.</p>
        </div>
        <div className="search-bar-container">
          <div className="search-bar-wrapper">
            <input
              type="text"
              className="search-bar"
              placeholder="Search movies by title"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="search-button" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
        <div className="movies-container">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            movies && movies.length > 0 ? (
              movies.map(movie => (
                <MovieCard
                  key={movie.imdbID}
                  movie={movie}
                  onAddToWatchlist={handleAddToWatchlist}
                  onClick={handleMovieClick} // Pass the click handler
                />
              ))
            ) : (
              <p>No movies found</p>
            )
          )}
        </div>
      </div>

      {selectedMovie && (
        <div className="movie-details-overlay">
          <div className="movie-details">
            <button className="close-button" onClick={closeDetails}>Close</button>
            <h2>{selectedMovie.Title}</h2>
            <p><strong>Release Year:</strong> {selectedMovie.Year}</p>
            <img src={selectedMovie.Poster} alt={selectedMovie.Title} />
            <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
