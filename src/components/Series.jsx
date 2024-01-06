import React, { useState, useEffect } from 'react';
import { Table, Image } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const Series = () => {
    const [series, setSeries] = useState([]);

    useEffect(() => {
        fetchSeries();
    }, []);

    const fetchSeries = async () => {
        try {
            const response = await fetch('http://localhost:8080/series/all');
            if (response.ok) {
                const data = await response.json();
                setSeries(data);
            } else {
                console.error('Failed to fetch series');
            }
        } catch (error) {
            console.error('Error fetching series:', error);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div>
      
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Plakat</th>
                        <th>Tytuł</th>
                        <th>Reżyser</th>
                        <th>Data premiery</th>
                        <th>Data zakończenia</th>
                        <th>Opis</th>
                        <th>Ilość sezonów</th>
                        <th>Gatunki</th>
                        <th>Aktorzy</th>
                    </tr>
                </thead>
                <tbody>
                    {series.map(serie => (
                        <tr key={serie.id}>
                            <td>
                                <Image
                                    src={serie.posterLink}
                                    alt={`Plakat ${serie.title}`}
                                    fluid
                                    style={{ maxWidth: '100px', maxHeight: '150px' }}
                                />
                            </td>
                            <td>{serie.title}</td>
                            <td>{serie.director}</td>
                            <td>{formatDate(serie.timeFrameStart)}</td>
                            <td>{formatDate(serie.timeFrameEnd)}</td>
                            <td>{serie.description}</td>
                            <td>{serie.seasons.length}</td>
                            <td>
                                {serie.genres && serie.genres.length > 0
                                    ? serie.genres.map(genre => genre.genre).join(', ')
                                    : 'Brak gatunków'}
                            </td>
                            <td>
    {serie.actors && serie.actors.length > 0 ? (
        serie.actors.map(actor => (
            <div key={uuidv4()}>{`${actor.name || 'Undefined'} ${actor.surname || 'Undefined'}`}</div>
        ))
    ) : 'Brak aktorów'}
</td>

                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Series;
