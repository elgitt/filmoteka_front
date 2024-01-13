import React from 'react';
import { Link } from 'react-router-dom';
import '../css/home.css';


export const Home = () => {
  return (
    <div className="home">
      <div className="div">
        <div className="logo">
          <div className="FILMO-TEKA">
            FILMO
            <br />
            TEKA
          </div>
        </div>
       
        <div className="button-wrapper">
          <Link to="/login" className="btn btn-outline-light">
            Zaloguj się 
          </Link>
          <Link to="/register" className="btn btn-outline-light">
            Zarejestruj się 
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
