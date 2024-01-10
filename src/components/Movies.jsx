import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import SearchField from 'react-search-field';
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

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    const filteredMovies = movies.filter((movie) => {
        // Implement your search logic here based on movie properties
        return (
            movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            movie.director.toLowerCase().includes(searchTerm.toLowerCase()) 
          // Add more conditions for other movie properties
          // ...
        );
    });

    return (
        <div className="movies-container">
          <Sidebar />
          <div className="searchbar">
            <SearchField
              placeholder="Szukaj"
              onChange={handleSearch}
              searchText={searchTerm}
              classNames="search-field"
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