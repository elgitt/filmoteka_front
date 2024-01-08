import React from 'react';
import { useAuth } from './AuthContext';
import Sidebar from './Sidebar';
import '../css/ProfilePage.css'

const ProfilePage = () => {
  const { user } = useAuth();

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
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
