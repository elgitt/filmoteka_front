import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { Image } from 'react-bootstrap';
import '../css/RecommendedMovies.css'; // Import stylów CSS
import Sidebar from './Sidebar';

const RecommendedMovies = () => {
    const { user } = useAuth();
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  useEffect(() => {
    fetchRecommendedMovies();
  }, []);

  const fetchRecommendedMovies = async () => {
    try {
      const response = await fetch(`http://localhost:8080/rating/moviesForTopGenres?userId=${user.id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch recommended movies. Status: ${response.status}`);
      }

      const data = await response.json();
      setRecommendedMovies(data);
    } catch (error) {
      console.error('Error fetching recommended movies:', error.message);
    }
  };

  return (
    <div className="recommended-movies-container">
      <Sidebar />
      <div className="recommended-movies-list">
        {recommendedMovies.map((movie) => (
          <div key={movie[1]} className="recommended-item">
            <div className="movie-details-container">
              <Image src={movie[0]} alt={`Poster ${movie[8]}`} fluid className="movie-poster" />
              <div className="movie-details">
                <h3>{movie[8]}</h3>
                <p>{`Typ: ${movie[5] === 'M' ? 'Film' : 'Serial'}`}</p>
                <p>{`Gatunek: ${movie[9]}`}</p>
                <p>{`Reżyser: ${movie[3]}`}</p>
                <p>{`Czas trwania: ${movie[4]}`}</p>
                <p>{`Premiera: ${movie[7]}`}</p>
                <p>{`Opis: ${movie[2]}`}</p>
                {movie[6] && <p>{`Sezony: ${movie[6]}`}</p>}
              </div>
            </div>            
          </div>
        ))}
      </div>
    </div>
  );
};


export default RecommendedMovies;
