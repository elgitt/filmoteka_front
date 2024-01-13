import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import Sidebar from './Sidebar';
import { Image } from 'react-bootstrap';


const UserRatings = () => {
    const { user } = useAuth();
    const [userRatings, setUserRatings] = useState([]);

    useEffect(() => {
        fetchUserRatings();
    }, []);

    const fetchUserRatings = async () => {
        try {
            const response = await fetch(`http://localhost:8080/rating/getByUser?userId=${user.id}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch user ratings. Status: ${response.status}`);
            }

            const data = await response.json();
            setUserRatings(data);
        } catch (error) {
            console.error('Error fetching user ratings:', error.message);
        }
    };

    return (
        <div className="recommended-movies-container">
            <Sidebar />
            <div className="recommended-movies-list">
                {userRatings.map(([rating, movieId], index) => (
                    rating.moviesMovie && (
                        <div key={rating.id} className="recommended-item">
                            <div className="movie-details-container">
                                <Image
                                    src={rating.moviesMovie.posterLink}
                                    alt={`Poster ${rating.moviesMovie.title}`}
                                    fluid
                                    className="movie-poster"
                                />
                                <div className="movie-details">
                                    <h3>{rating.moviesMovie.title}</h3>
                                    <p>{`Typ: ${rating.moviesMovie.type === 'M' ? 'Film' : 'Serial'}`}</p>
                                    <p>{`Gatunek: ${
                                        rating.moviesMovie.genres
                                            ? rating.moviesMovie.genres.map((genre) => genre.genre).join(', ')
                                            : 'N/A'
                                    }`}</p>
                                    <p>{`Reżyser: ${rating.moviesMovie.director}`}</p>
                                    <p>{`Ocena: ${rating.rating}`}</p>
                                    <p>{`Data oceny: ${rating.ratingDate[2]}/${rating.ratingDate[1]}/${rating.ratingDate[0]}`}</p>
                                </div>
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default UserRatings;
