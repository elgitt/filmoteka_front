import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import '../css/Sidebar.css';

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <nav className="w3-sidebar w3-bar-block w3-white w3-collapse w3-top" style={{ zIndex: 3, width: '250px' }} id="mySidebar">
      <div className="logo">
        <div className="FILMO-TEKA">
          FILMO
          <br />
          TEKA
        </div>
      </div>            
      <ul className="nav flex-column">
        <li className={`nav-item ${location.pathname === '/movies' ? 'active' : ''}`}>
          <Link to="/movies" className="nav-link">Przeglądaj</Link>
        </li>
        <li className={`nav-item ${location.pathname === '/recommended' ? 'active' : ''}`}>
          <Link to="/recommended" className="nav-link">Polecane</Link>
        </li>
        <li className={`nav-item ${location.pathname === '/ratings' ? 'active' : ''}`}>
          <Link to="/ratings" className="nav-link">Ocenione</Link>
        </li>
        <li className={`nav-item ${location.pathname === '/watchlist' ? 'active' : ''}`}>
          <Link to="/watchlist" className="nav-link">Do obejrzenia</Link>
        </li>
        <li className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`}>
          <Link to="/profile" className="nav-link">Profil</Link>
        </li>
        {user && user.id === 10 && (
          <li className={`nav-item ${location.pathname === '/admin' ? 'active' : ''}`}>
            <Link to="/admin" className="nav-link">Zarządzaj</Link>
          </li>
        )}
        <li className={`nav-item ${location.pathname === '/home' ? 'active' : ''}`}>
          <Link to="/home" className="nav-link">Wyloguj</Link>
        </li>
      </ul>
      <div className="text-center mt-3">
        <img
          src="https://i.pinimg.com/originals/7c/20/6f/7c206f9da1a2123e8a3471c29f8568af.jpg"
          alt="User Avatar"
          className="rounded-circle"
          style={{ width: '50px', height: '50px' }}
        />
        <p>{user.name} {user.surname}</p>
      </div>
    </nav>
  );
};

export default Sidebar;