import React from 'react';
import './Home.css';

function MovieCard({ movie, onAddToWatchlist, onClick }) {
  return (
    <div className="movie-card" onClick={() => onClick(movie)}>
      <div className="movie-image-container">
        <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
        <button
          className="add-to-watchlist"
          onClick={(e) => {
            e.stopPropagation(); // Prevent click from propagating to the card
            onAddToWatchlist(movie);
          }}
        >
          +
        </button>
      </div>
      <div className="movie-details">
        <div className="movie-rating">
          <span>{movie.imdbRating}</span>
          <span>{getEmojiForRating(parseFloat(movie.imdbRating))}</span>
        </div>
        <h3 className="movie-title">{movie.Title}</h3>
        <p>{movie.Year}</p>
        <p className="movie-genre">{movie.Genre}</p>
      </div>
    </div>
  );
}

const getEmojiForRating = (rating) => {
  if (rating >= 8.5) return '😍';
  if (rating >= 7.0) return '🙂';
  if (rating >= 5.5) return '😐';
  return '😞';
};

export default MovieCard;
