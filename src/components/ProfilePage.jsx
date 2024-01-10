import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import Sidebar from './Sidebar';
import '../css/ProfilePage.css';

const ProfilePage = () => {
  const { user } = useAuth();
  const [topGenres, setTopGenres] = useState([]);

  useEffect(() => {
    if (user) {
      fetchTopGenres(user.id);
    }
  }, [user]);

  const fetchTopGenres = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/rating/topGenresForUser?userId=${userId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch top genres. Status: ${response.status}`);
      }
      const data = await response.json();
      setTopGenres(data);
    } catch (error) {
      console.error('Error fetching top genres:', error.message);
    }
  };

  if (!user) {
    return <p>Nie jesteś zalogowany</p>;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <div className="col-md-10">
          <h2>Informacje o użytkowniku</h2>
          <p>Imię: {user.name}</p>
          <p>Nazwisko: {user.surname}</p>
          <p>Nazwa użytkownika: {user.username}</p>

          <h2>Top Genres:</h2>
          <ul>
            {topGenres.map((genre) => (
              <li key={genre[0]}>
                {genre[0]} - Average Rating: {genre[1]}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
