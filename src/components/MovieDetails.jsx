import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Image, Button, Col, Row, Alert } from 'react-bootstrap'; // Dodano Alert
import { useAuth } from './AuthContext';
import '../css/MovieDetails.css';
import Sidebar from './Sidebar';

const MovieDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [movie, setMovie] = useState(null);
    const [selectedRating, setSelectedRating] = useState(0);
    const [showWatchlistAlert, setShowWatchlistAlert] = useState(false);
    const [showRatingAlert, setShowRatingAlert] = useState(false);

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
            setShowWatchlistAlert(true);
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

            setShowRatingAlert(true);
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
                            <h5>{movie.type === 'M' ? 'Film' : 'Serial'}</h5>
                            {movie.type === 'S' && <p>{`Ilość sezonów: ${movie.seasons}`}</p>}
                            <p>{`Reżyser: ${movie.director}`}</p>
                            <p>{`Rok premiery: ${movie.releaseYear}`}</p>
                            <p>{`Czas trwania: ${movie.duration}`}</p>
                            <p>{`Aktorzy: ${movie.actors.map(actor => `${actor.name} ${actor.surname}`).join(", ")}`}</p>
                            <p>{`Gatunki: ${movie.genres.map(genre => genre.genre).join(", ")}`}</p>
                            <p>{`Opis: ${movie.description}`}</p>      
                            <div className="rating-section">
                                <Button onClick={addToWatchlist}>Chcę zobaczyć</Button>
                                <Button onClick={rateMovie}>Oceniam</Button>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                                    <span key={rating} onClick={() => handleRatingClick(rating)}>
                                        {rating <= selectedRating ? '❤️' : '🤍'}
                                    </span>
                                ))}
                            </div>
                            <Alert show={showWatchlistAlert} variant="success" onClose={() => setShowWatchlistAlert(false)} dismissible>
                                Dodano do listy Do obejrzenia!
                            </Alert>
                            <Alert show={showRatingAlert} variant="success" onClose={() => setShowRatingAlert(false)} dismissible>
                                Oceniono film!
                            </Alert>
                        </Col>
                    </Row>
                </div>
            )}
        </div>
    );
};

export default MovieDetails;
