import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import '../css/Movies.css';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await fetch('http://localhost:8080/movies/all');

            if (!response.ok) {
                throw new Error(`Failed to fetch movies. Status: ${response.status}`);
            }

            const data = await response.json();
            setMovies(data);
        } catch (error) {
            console.error('Error fetching movies:', error.message);
        }
    };

    const handleSearch = (event) => {
      const value = event.target.value;
      if (typeof value === 'string') {
        setSearchTerm(value.toLowerCase());
      }
    };
  
    const filteredMovies = movies.filter((movie) => {
      return (
        typeof searchTerm === 'string' &&
        (movie.title.toLowerCase().includes(searchTerm))
      );
    });
  
    return (
        <div className="movies-container">
          <Sidebar />
          <div className="searchbar">
        <input
          type="text"
          placeholder="Szukaj"
          value={searchTerm}
          onChange={handleSearch}
          className="search-field"
        />
      </div>
          <div className="movies-grid">
            {filteredMovies.map((movie) => (
              <div key={movie.id} className="movie-item">
                <Link to={`/movies/${movie.id}`} className="movie-link">
                  <Image src={movie.posterLink} alt={`Plakat ${movie.title}`} fluid />
                </Link>
                <div className="title">{movie.title}</div>
              </div>
            ))}
          </div>
        </div>
      );
};

export default Movies;