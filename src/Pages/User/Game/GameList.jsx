import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../Layouts/Layout';
import FilterNav from '../../../Components/App/FilterNav';
import GameGrid from '../../../Components/App/GameGrid';
import axios from 'axios';

const GameList = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get('/api/getAllGame');
                setGames(response.data);
            } catch (error) {
                console.error('Error fetching games:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    const handleGameClick = (gameId) => {
        navigate(`/gameDetail/${gameId}`);
    };

    return (
        <Layout>
            <div className="p-5 bg-gray-50 min-h-screen">
                <FilterNav />
                <div className="mt-6">
                    {loading ? (
                        <p className="text-gray-500">Loading games...</p>
                    ) : (
                        <GameGrid games={games} onGameClick={handleGameClick} />
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default GameList;