import React from 'react';
import GameCard from './GameCard';

function GameGrid({ games, onGameClick }) {
    return (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {games.length > 0 ? (
                games.map((game) => (
                    <GameCard 
                        key={game.id} 
                        game={game} 
                        onClick={() => onGameClick(game.id)} 
                    />
                ))
            ) : (
                <p className="text-gray-500">No games available.</p>
            )}
        </div>
    );
}

export default GameGrid;