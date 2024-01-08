import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import '../css/Movies.css';

const Movies = () => {
    const [movies, setMovies] = useState([]);

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

    return (
        <div className="container-fluid">
             <Sidebar />
            <div className="row">            
                <div className="col-md-10 movies-grid">
                    {movies.map((movie) => (
                        <div key={movie.id} className="movie-item">
                            <Link to={`/movies/${movie.id}`}>
                                <Image src={movie.posterLink} alt={`Plakat ${movie.title}`} fluid />
                            </Link>
                            <p>{movie.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Movies;
