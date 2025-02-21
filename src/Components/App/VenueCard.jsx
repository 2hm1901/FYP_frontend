import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import picture from '../../assets/banner.jpg';
import { Link } from 'react-router-dom';

function VenueCard({ id, image, name, rating, reviews, location, distance }) {
    return (
        <Link 
            to={`/venueDetail/${id}`} 
            className="block w-[300px] flex-shrink-0 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden"
        >
            <div className="relative h-[200px]">
                <img
                    src={picture}
                    alt={name}
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{name}</h3>
                    <div className="flex items-center text-sm">
                        <span className="text-emerald-500 font-medium">4.7</span>
                        <span className="text-gray-500 ml-1">(4)</span>
                    </div>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                    <FaMapMarkerAlt className="h-4 w-4 mr-2" />
                    <span>{location} (~10 km)</span>
                </div>
            </div>
        </Link>
    );
}

export default VenueCard;
