import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import '../css/Sidebar.css';

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <div className="col-md-2 bg-light sidebar">
      <h2 className="text-center mt-3">Filmoteka</h2>
      
      <div className="text-center mt-3">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
          alt="User Avatar"
          className="rounded-circle"
          style={{ width: '50px', height: '50px' }}
        />
        <p>{user.name} {user.surname}</p>
      </div>
      
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/movies" className="nav-link">Przeglądaj</Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard/recommended" className="nav-link">Polecane</Link>
        </li>
        <li className="nav-item">
          <Link to="/ratings" className="nav-link">Ocenione</Link>
        </li>
        <li className="nav-item">
          <Link to="/watchlist" className="nav-link">Watchlista</Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard/profile" className="nav-link">Profil</Link>
        </li>
        <li className="nav-item">
          <Link to="/home" className="nav-link">Wyloguj</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
