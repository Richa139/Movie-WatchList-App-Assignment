import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // Use the same CSS file for consistent styling

function Register() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    if (email.trim()) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const userExists = users.some(user => user.email === email);

      if (!userExists) {
        const newUser = { email, watchlist: [] };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
      }

      localStorage.setItem('currentUser', email);

      const redirectMovie = JSON.parse(localStorage.getItem('redirectMovie'));
      if (redirectMovie) {
        const updatedUsers = users.map(user => {
          if (user.email === email) {
            user.watchlist.push(redirectMovie);
          }
          return user;
        });
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        localStorage.removeItem('redirectMovie'); // Clear the temporary movie
      }

      navigate('/login'); // Redirect to login page after registration
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Create an Account</h1>
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
}

export default Register;
