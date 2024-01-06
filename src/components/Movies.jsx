import React, { useState, useEffect } from 'react';
import { Table, Image } from 'react-bootstrap';

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

    const formatDuration = (durationArray) => {
        if (durationArray.length === 2) {
            const [hours, minutes] = durationArray;
            const formattedHours = hours > 0 ? `${hours}h` : '';
            const formattedMinutes = minutes > 0 ? `${minutes}min` : '';
            return `${formattedHours} ${formattedMinutes}`.trim();
        } else {
            return 'Invalid Duration';
        }
    };

    return (
        <div>
            
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Plakat</th>
                        <th>Tytuł</th>
                        <th>Reżyser</th>
                        <th>Rok wydania</th>
                        <th>Czas trwania</th>
                        <th>Opis</th>
                        <th>Gatunki</th>
                        <th>Aktorzy</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map(movie => (
                        <tr key={movie.id}>
                            <td>
                                <Image
                                    src={movie.posterLink}
                                    alt={`Plakat ${movie.title}`}
                                    fluid
                                    style={{ maxWidth: '100px', maxHeight: '150px' }}
                                />
                            </td>
                            <td>{movie.title}</td>
                            <td>{movie.director}</td>
                            <td>{movie.releaseYear}</td>
                            <td>{formatDuration(movie.duration)}</td>
                            <td>{movie.description}</td>
                            <td>
                                {movie.genres && movie.genres.length > 0
                                    ? movie.genres.map(genre => genre.genre).join(', ')
                                    : 'Brak gatunków'}
                            </td>
                            <td>{movie.actors.map(actor => `${actor.name} 
                            ${actor.surname}`).join(', ')}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Movies;