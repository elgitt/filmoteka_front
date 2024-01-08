import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import Sidebar from './Sidebar';
import { Container, Table, Image } from 'react-bootstrap';
import '../css/Ratings.css';

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
        <div className="container-fluid">
            <Sidebar />
            <div className="row">
                <div className="col-md-10">
                    {/* <h2>Do obejrzenia</h2> */}
                    <Table className="table">
                        <thead>
                            <tr>
                                <th>Poster</th>
                                <th>Title</th>
                                <th>Type</th>
                                <th>Genre</th>

                            </tr>
                        </thead>
                        <tbody>
                            {userWatchlist.map((movie) => (
                                <tr key={movie.id}>
                                    <td>
                                        <Image
                                            src={movie.posterLink}
                                            alt={`Poster ${movie.title}`}
                                            className="img-fluid smaller-poster" 
                                        />
                                    </td>
                                    <td>{movie.title}</td>
                                    <td>{movie.type}</td>
                                    <td>{movie.genres ? movie.genres.map((genre) => genre.genre).join(', ') : 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default UserWatchlist;