import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Image, Button, Col, Row } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import '../css/MovieDetails.css';
import Sidebar from './Sidebar';

const MovieDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [movie, setMovie] = useState(null);
    const [selectedRating, setSelectedRating] = useState(0);

    useEffect(() => {
        fetchMovieDetails();
    }, []);

    const fetchMovieDetails = async () => {
        try {
            const response = await fetch(`http://localhost:8080/movies/${id}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch movie details. Status: ${response.status}`);
            }
            const data = await response.json();
            setMovie(data);
        } catch (error) {
            console.error('Error fetching movie details:', error.message);
        }
    };

    const addToWatchlist = async () => {
        try {
            const response = await fetch(`http://localhost:8080/watchlist/add?userId=${user.id}&movieId=${id}`, {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error(`Failed to add to watchlist. Status: ${response.status}`);
            }
            console.log("addedtowatch");
        } catch (error) {
            console.error('Error adding to watchlist:', error.message);
        }
    };

    const handleRatingClick = (rating) => {
        setSelectedRating(rating);
    };

    const rateMovie = async () => {
        try {
            const response = await fetch(`http://localhost:8080/rating/add?userId=${user.id}&movieId=${id}&rating=${selectedRating}`, {
                method: 'POST',
            });

            console.log("success:)");
        } catch (error) {
            console.error('Error adding rating:', error.message);
        }
    };


    return (
        <div className="container">
            <Sidebar />
            {movie && (
                <div className="movie-details-content">
                    <Row>
                        <Col md={4}>
                            <Image className="img-fluid movie-poster" src={movie.posterLink} alt={`Plakat ${movie.title}`} />
                        </Col>
                        <Col md={8}>
                            <h2>{movie.title}</h2>
                            <Button onClick={addToWatchlist}>Dodaj do watchlisty</Button>
                            <div className="rating-section">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                                    <span key={rating} onClick={() => handleRatingClick(rating)}>
                                        {rating <= selectedRating ? '❤️' : '🤍'}
                                    </span>
                                ))}
                                <Button onClick={rateMovie}>Oceń</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            )}
        </div>
    );
};

export default MovieDetails;