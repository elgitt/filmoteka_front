import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import Sidebar from './Sidebar';
import { Container, Table, Image } from 'react-bootstrap';


const UserWatchlist = () => {
    const { user } = useAuth();
    const [userWatchlist, setUserWatchlist] = useState([]);

    useEffect(() => {
        fetchUserWatchlist();
    }, []);

    const fetchUserWatchlist = async () => {
        try {
            const response = await fetch(`http://localhost:8080/watchlist/getByUser?userId=${user.id}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch user watchlist. Status: ${response.status}`);
            }
            const data = await response.json();
            setUserWatchlist(data);
        } catch (error) {
            console.error('Error fetching user watchlist:', error.message);
        }
    };

    return (
        <div className="recommended-movies-container">
            <Sidebar />
            <div className="recommended-movies-list">
                {userWatchlist.map((movie) => (
                    <div key={movie.id} className="recommended-item">
                        <div className="movie-details-container">
                            <Image
                                src={movie.posterLink}
                                alt={`Poster ${movie.title}`}
                                fluid
                                className="movie-poster"
                            />
                            <div className="movie-details">
                                <h3>{movie.title}</h3>
                                <p>{`Typ: ${movie.type === 'M' ? 'Film' : 'Serial'}`}</p>
                                <p>{`Gatunek: ${
                                    movie.genres ? movie.genres.map((genre) => genre.genre).join(', ') : 'N/A'
                                }`}</p>
                                  <p>{`Reżyser: ${movie.director}`}</p>
                                  <p>{`Czas trwania: ${movie.duration}`}</p>
                                  <p>{`Premiera: ${movie.releaseYear}`}</p>
                                  {movie.type === 'S' && <p>{`Ilość sezonów: ${movie.seasons}`}</p>}
                                  
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserWatchlist;
