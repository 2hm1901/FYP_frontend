import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

function GameCard({ game, onClick }) {

    const { 
        id,
        venue,
        creator, 
        court_number, 
        game_date, 
        start_time, 
        end_time, 
        current_players, 
        max_players, 
        skill_level_required, 
        is_active 
    } = game;

    return (
        <a href={`/gameDetail/${id}`} onClick={onClick} className="block w-[300px] flex-shrink-0 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-4 space-y-4">
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <div className="flex -space-x-2">
                                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white">
                                    {creator.username[0]}
                                </div>
                        </div>
                        <div className="text-sm">
                            <span className="font-medium">{current_players}/{max_players}</span> Going
                        </div>
                    </div>
                    <div className="text-sm text-gray-500">
                            {creator.username} | {creator.point || 0} Điểm
                        </div>
                </div>
                <div className="space-y-2 text-sm">
                    <div>{game_date}, {start_time} - {end_time}</div>
                    <div className="flex items-center text-gray-500">
                        <FaMapMarkerAlt className="h-4 w-4 mr-1" />
                        <span>{venue.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <span className="text-gray-500">Trình độ: {skill_level_required}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${is_active ? "bg-green-200 text-green-800" : "bg-gray-200 text-gray-800"}`}>
                            {is_active ? "ACTIVE" : "INACTIVE"}
                        </span>
                    </div>
                </div>
            </div>
        </a>
    );
}

export default GameCard;
