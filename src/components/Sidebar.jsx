import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import '../css/Sidebar.css';

const Sidebar = () => {
  const { user } = useAuth();

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
          <Link to="/watchlist" className="nav-link">Do obejrzenia</Link>
        </li>
        <li className="nav-item">
          <Link to="/profile" className="nav-link">Profil</Link>
        </li>
        <li className="nav-item">
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
