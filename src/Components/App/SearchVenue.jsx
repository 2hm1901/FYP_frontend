import React from 'react';
import { FaSearch } from 'react-icons/fa';

export default function SearchVenue() {
    return (
        <div className="border-b bg-white shadow-sm">
            <div className="container py-4 flex flex-col lg:flex-row items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-800">
                    Discover and Book Top Badminton Courts in Bangalore Online
                </h1>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <FaSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <input
                            type="search"
                            placeholder="Search by venue name"
                            className="pl-8 w-[300px] border border-gray-300 rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
