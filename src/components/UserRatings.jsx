import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import Sidebar from './Sidebar';
import { Image } from 'react-bootstrap';
import '../css/Ratings.css';

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
        <div className="container-fluid">
            <Sidebar />
            <div className="row">
                <div className="col-md-10">
                    {/* <h2>Oceny</h2> */}
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Poster</th>
                                <th>Title</th>
                                <th>Type</th>
                                <th>Genres</th>
                                <th>Rating</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userRatings.map(([rating, movieId], index) => (
                                // Sprawdź, czy rating.moviesMovie istnieje przed próbą dostępu do jego właściwości
                                rating.moviesMovie && (
                                    <tr key={rating.id}>
                                        <td>
                                            <Image
                                                src={rating.moviesMovie.posterLink}
                                                alt={`Poster ${rating.moviesMovie.title}`}
                                                className="img-fluid smaller-poster" // Dodaj niestandardową klasę "smaller-poster"
                                            />

                                        </td>
                                        <td>{rating.moviesMovie.title}</td>
                                        <td>{rating.moviesMovie.type}</td>
                                        <td>
                                            {rating.moviesMovie.genres
                                                ? rating.moviesMovie.genres.map((genre) => genre.genre).join(', ')
                                                : 'N/A'}
                                        </td>
                                        <td>{rating.rating}</td>
                                        <td>{`${rating.ratingDate[2]}/${rating.ratingDate[1]}/${rating.ratingDate[0]}`}</td>
                                    </tr>
                                )
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserRatings;