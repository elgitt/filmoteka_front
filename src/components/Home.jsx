import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <h1 className="text-center">Welcome to Filmoteka</h1>
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
