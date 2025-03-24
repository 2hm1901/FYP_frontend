import React, { useState, useEffect } from 'react';
import Layout from '../../Layouts/Layout';
import { FaChevronDown, FaChevronLeft, FaChevronRight, FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import bannerRight from '../../assets/banner-right.png';
import VenueCard from '../../Components/App/VenueCard';
import GameCard from '../../Components/App/GameCard';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Index = () => {
    const [venues, setVenues] = useState([]);
    const [games, setGames] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [venuesResponse, gamesResponse] = await Promise.all([
                    axios.get('/api/getAllVenue'),
                    axios.get('/api/getAllGame')
                ]);
                setVenues(venuesResponse.data.slice(0, 5));
                setGames(gamesResponse.data.slice(0, 5));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Layout>
            <div className="bg-gradient-to-r from-green-800 to-blue-900 p-16">
                <div className="container mx-auto text-center">
                    <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-16">
                        <div className="lg:w-1/2 text-center lg:text-left mb-16 lg:mb-0">
                            <h1 className="text-6xl font-bold text-yellow-500 mb-8">World Class Badminton Coaching & Premium Courts</h1>
                            <h2 className="text-3xl text-white mb-4">Choose Your Coaches And Start Your Training</h2>
                            <p className="text-white mb-16">Unleash Your Athletic Potential with Expert Coaching, State-of-the-Art Facilities, and Personalized Training Programs.</p>
                        </div>
                        <div className="lg:w-1/2 flex justify-center lg:justify-end">
                            <div className="relative">
                                <img src={bannerRight} alt="Badminton Player" className="h-120 w-120 rounded-full border-4 border-white" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg mt-10">
                    {/* Venues Section */}
                    <div className="w-full space-y-8 mb-10">
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-semibold text-black">Book Venues</h2>
                                <Link to='/venues' className="text-emerald-500 font-medium flex items-center">
                                    SEE ALL VENUES
                                    <FaChevronRight className="ml-1 h-4 w-4" />
                                </Link>
                            </div>
                            <div className="relative">
                                <div id="venueCards" className="flex space-x-4 overflow-x-auto pb-4">
                                    {venues.map((venue) => (
                                        <VenueCard
                                            key={venue.id}
                                            image={venue.image}
                                            name={venue.name}
                                            rating={venue.rating}
                                            reviews={venue.reviews_count}
                                            location={venue.location}
                                            distance={venue.distance}
                                            onClick={() => navigate(`/venue/${venue.id}`)}
                                        />
                                    ))}
                                </div>
                                <div className="absolute -left-4 top-1/2 -translate-y-1/2">
                                    <button 
                                        className="rounded-full bg-white p-2 shadow-md hover:bg-gray-100 transition duration-300"
                                        onClick={() => document.querySelector('#venueCards').scrollBy({ left: -200, behavior: 'smooth' })}
                                    >
                                        <FaChevronLeft className="h-4 w-4" />
                                    </button>
                                </div>
                                <div className="absolute -right-4 top-1/2 -translate-y-1/2">
                                    <button 
                                        className="rounded-full bg-white p-2 shadow-md hover:bg-gray-100 transition duration-300"
                                        onClick={() => document.querySelector('#venueCards').scrollBy({ left: 200, behavior: 'smooth' })}
                                    >
                                        <FaChevronRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Games Section */}
                    <div className="w-full space-y-8">
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-semibold text-black">Book Games</h2>
                                <Link to='/game' className="text-emerald-500 font-medium flex items-center">
                                    SEE ALL GAMES
                                    <FaChevronRight className="ml-1 h-4 w-4" />
                                </Link>
                            </div>
                            <div className="relative">
                                <div id="gameCards" className="flex space-x-4 overflow-x-auto pb-4">
                                    {games.map((game) => (
                                        <GameCard
                                            key={game.id}
                                            game={game}
                                            onClick={() => navigate(`/gameDetail/${game.id}`)}
                                        />
                                    ))}
                                </div>
                                <div className="absolute -left-4 top-1/2 -translate-y-1/2">
                                    <button 
                                        className="rounded-full bg-white p-2 shadow-md hover:bg-gray-100 transition duration-300"
                                        onClick={() => document.querySelector('#gameCards').scrollBy({ left: -200, behavior: 'smooth' })}
                                    >
                                        <FaChevronLeft className="h-4 w-4" />
                                    </button>
                                </div>
                                <div className="absolute -right-4 top-1/2 -translate-y-1/2">
                                    <button 
                                        className="rounded-full bg-white p-2 shadow-md hover:bg-gray-100 transition duration-300"
                                        onClick={() => document.querySelector('#gameCards').scrollBy({ left: 200, behavior: 'smooth' })}
                                    >
                                        <FaChevronRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Index;
