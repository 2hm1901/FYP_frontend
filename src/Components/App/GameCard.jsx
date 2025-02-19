import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

function GameCard({ host, type, subType, slots, time, location, distance, level, status, onClick }) {
    return (
        <a href="/gameDetail" onClick={onClick} className="block w-[300px] flex-shrink-0 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-4 space-y-4">
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <span className="bg-gray-200 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">{type}</span>
                        {subType && <span className="bg-gray-200 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">{subType}</span>}
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="flex -space-x-2">
                                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white">
                                    {host.name[0]}
                                </div>
                        </div>
                        <div className="text-sm">
                            <span className="font-medium">{slots}</span> Going
                        </div>
                    </div>
                    <div className="text-sm text-gray-500">
                            {host.name} | {host.karma} Karma
                        </div>
                </div>
                <div className="space-y-2 text-sm">
                    <div>{time}</div>
                    <div className="flex items-center text-gray-500">
                        <FaMapMarkerAlt className="h-4 w-4 mr-1" />
                        <span>{location}</span>
                        <span className="ml-1">({distance})</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <span className="text-gray-500">{level}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${status === "BOOKED" ? "bg-green-200 text-green-800" : "bg-gray-200 text-gray-800"}`}>
                            {status}
                        </span>
                    </div>
                </div>
            </div>
        </a>
    );
}

export default GameCard;
