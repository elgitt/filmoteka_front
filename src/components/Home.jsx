import React from 'react';
import { Link } from 'react-router-dom';
import'../css/home.css'

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <h1 className="text-center">Filmoteka</h1>
        <h2 className="text-center">System rekomendacji filmów</h2>
      </div>
      <div className="row mt-4">
        <div className="col-md-6 offset-md-3 text-center">
          <Link to="/login" className="btn btn-secondary">Login</Link>
          <span className="mx-2"></span>
          <Link to="/register" className="btn btn-secondary">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;