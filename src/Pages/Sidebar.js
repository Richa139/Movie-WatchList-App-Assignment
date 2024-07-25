// src/components/Sidebar.js
import React, { useState, useEffect } from 'react';
import './Home.css';

const Sidebar = () => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState('');
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const storedPlaylists = JSON.parse(localStorage.getItem('playlists')) || [];
    setPlaylists(storedPlaylists);

    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setIsLoggedIn(true);
      setUserEmail(currentUser);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const addPlaylist = () => {
    if (!isLoggedIn) {
      alert('Please log in to add a playlist.');
      return;
    }

    if (newPlaylistName.trim() === '') return;

    const updatedPlaylists = [...playlists, newPlaylistName.trim()];
    setPlaylists(updatedPlaylists);
    localStorage.setItem('playlists', JSON.stringify(updatedPlaylists));
    setNewPlaylistName('');
  };

  const handlePlaylistChange = (e) => {
    setSelectedPlaylist(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
    setUserEmail('');
  };

  return (
    <div className="sidebar">
      <h1>Watchlist</h1>
      <div className="search-bar-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search watchlist..."
        />
        <button className="search-button">Search</button>
      </div>
      <div className="my-list">
        <h3>My Lists</h3>
        <select
          className="playlist-selector"
          value={selectedPlaylist}
          onChange={handlePlaylistChange}
        >
          <option value="">Select a playlist</option>
          {playlists.map((playlist, index) => (
            <option key={index} value={playlist}>{playlist}</option>
          ))}
        </select>
        {isLoggedIn && (
          <>
            <input
              type="text"
              className="playlist-name"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              placeholder="New playlist name"
            />
            <button className="add-playlist-button" onClick={addPlaylist}>
              Add Playlist
            </button>
          </>
        )}
      </div>
      <div className="register-login-container">
        {!isLoggedIn ? (
          <>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </>
        ) : (
          <>
            <p>{userEmail}</p>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
