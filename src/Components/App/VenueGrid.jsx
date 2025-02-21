import React, { useState, useEffect } from 'react';
import VenueCard from './VenueCard';
import axios from 'axios';

export default function VenueGrid() {
    const [venues, setVenues] = useState([]);

    useEffect(() => {
        axios.get('/api/getAllVenue')
            .then((response) => {
                setVenues(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('There was an error fetching the venue data:', error);
            });
    }, []);

    return (
        <div className="flex items-center justify-between mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {venues.map((venue) => (
                    <VenueCard key={venue.id} {...venue} />
                ))}
            </div>
        </div>
    );
}
