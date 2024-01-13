import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import Sidebar from './Sidebar';
import '../css/ProfilePage.css';

const ProfilePage = () => {
  const { user } = useAuth();
  const [topGenres, setTopGenres] = useState([]);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    id: user.id,
    name: user.name,
    surname: user.surname,
    username: user.username,
    password: '',
  });

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

  const handleEditButtonClick = () => {
    setIsEditFormOpen(!isEditFormOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/editProfile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error(`Failed to update profile. Status: ${response.status}`);
      }
      setIsEditFormOpen(false);
    } catch (error) {
      console.error('Error updating profile:', error.message);
    }
  };

  if (!user) {
    return <p>Nie jesteś zalogowany</p>;
  }

  return (
    <div className="container-fluid">
      <Sidebar />
      <div className="col-md-10">
        <h2>Informacje o użytkowniku</h2>
        <span>Imię: {user.name}</span>
        <span>Nazwisko: {user.surname}</span>
        <span>Nazwa użytkownika: {user.username}</span>
        <button onClick={handleEditButtonClick}>Edytuj dane</button>
      </div>
      <div className="col-md-10 top-genres">
        <h2>Ulubione gatunki</h2>
        <ul>
          {topGenres.map((genre) => (
            <li key={genre[0]}>
              {genre[0]} - Średnia ocena: {genre[1]}
            </li>
          ))}
        </ul>
      </div>

      {isEditFormOpen && (
        <div className="edit-form">
          <h2>Edytuj profil</h2>
          <form onSubmit={handleEditFormSubmit}>
            <label>
              Imię:
              <input type="text" name="name" value={updatedUser.name} onChange={handleInputChange} />
            </label>
            <label>
              Nazwisko:
              <input type="text" name="surname" value={updatedUser.surname} onChange={handleInputChange} />
            </label>
            <label>
              Nazwa użytkownika:
              <input type="text" name="username" value={updatedUser.username} onChange={handleInputChange} />
            </label>
            <label>
              Nowe hasło:
              <input type="password" name="password" value={updatedUser.password} onChange={handleInputChange} />
            </label>
            <button type="submit">Zapisz zmiany</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;