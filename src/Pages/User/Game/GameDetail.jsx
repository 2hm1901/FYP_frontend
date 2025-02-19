import React from 'react';
import Layout from '../../../Layouts/Layout';
import GameCard from '../../../Components/App/GameCard';
import { FaClock, FaMapMarkerAlt,
         FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import picture from '../../../assets/banner-right.png';

export default function GameDetail() {
    return (
        <Layout>
            <div className="max-w-2xl mx-auto p-6 space-y-8 bg-white shadow-lg rounded-lg">
                {/* Header Section */}
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <img
                            src={picture}
                            alt="Host"
                            width={56}
                            height={56}
                            className="rounded-full border-2 border-gray-300"
                        />
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Badminton Activity</h1>
                            <p className="text-gray-600">Hosted by Sadeeh</p>
                        </div>
                    </div>

                    {/* Date and Location */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <FaClock className="w-6 h-6 text-gray-600" />
                            <div>
                                <p className="font-semibold text-gray-800">Wednesday, 18 Dec 2024</p>
                                <p className="text-gray-500">09:30 PM to 10:30 PM</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <FaMapMarkerAlt className="w-6 h-6 text-gray-600" />
                                <p className="text-gray-800">Wilson Garden Club, Off Hosur Main Road</p>
                            </div>
                            <div className="flex gap-4 mt-4">
                                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-white bg-emerald-500 hover:bg-emerald-600 shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                                    Request to play
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 bg-white hover:bg-gray-100 shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                                    Show In Map
                                </button>
                            </div>
                        </div>
                    </div>
                    </div>

                    {/* Players Section */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Players (4)</h2>
                    <div className="space-y-4">
                        {[
                            { name: "Sadeeh Hassan", isHost: true },
                            { name: "Faisal Khan" },
                            { name: "Danish Zw" },
                            { name: "John Doe" }
                        ].map((player, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <img
                                    src={picture}
                                    alt={player.name}
                                    width={40}
                                    height={40}
                                    className="rounded-full border-2 border-gray-300"
                                />
                                <div>
                                    <p className="font-medium text-gray-800">{player.name}</p>
                                    {player.isHost && (
                                        <p className="text-sm text-gray-500">Host</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full space-y-8">
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-semibold text-black">Other Games</h2>
                                <a href='/game' className="text-emerald-500 font-medium flex items-center">
                                    SEE ALL GAMES
                                    <FaChevronRight className="ml-1 h-4 w-4" />
                                </a>
                            </div>
                            <div className="relative">
                                <div id='gameCards' className="flex space-x-4 overflow-x-auto pb-4">
                                    {/* Game Cards */}
                                    <GameCard
                                        host = {{ name: "Hai", karma: 110 }}
                                        type="Regular"
                                        slots="2"
                                        time="Wed, 11 Dec 2024, 01:30 PM - 02:30 PM"
                                        location="White Feathers Sport"
                                        distance="~8.77 Kms"
                                        level="Beginner - Professional"
                                        status="BOOKED"
                                    />
                                    <GameCard
                                        host = {{ name: "Hai", karma: 110 }}
                                        type="Regular"
                                        slots="2"
                                        time="Wed, 11 Dec 2024, 01:30 PM - 02:30 PM"
                                        location="White Feathers Sport"
                                        distance="~8.77 Kms"
                                        level="Beginner - Professional"
                                        status="BOOKED"
                                    />
                                    <GameCard
                                        host = {{ name: "Hai", karma: 110 }}
                                        type="Regular"
                                        slots="2"
                                        time="Wed, 11 Dec 2024, 01:30 PM - 02:30 PM"
                                        location="White Feathers Sport"
                                        distance="~8.77 Kms"
                                        level="Beginner - Professional"
                                        status="BOOKED"
                                    />
                                    <GameCard
                                        host = {{ name: "Hai", karma: 110 }}
                                        type="Regular"
                                        slots="2"
                                        time="Wed, 11 Dec 2024, 01:30 PM - 02:30 PM"
                                        location="White Feathers Sport"
                                        distance="~8.77 Kms"
                                        level="Beginner - Professional"
                                        status="BOOKED"
                                    />
                                    <GameCard
                                        host = {{ name: "Hai", karma: 110 }}
                                        type="Regular"
                                        slots="2"
                                        time="Wed, 11 Dec 2024, 01:30 PM - 02:30 PM"
                                        location="White Feathers Sport"
                                        distance="~8.77 Kms"
                                        level="Beginner - Professional"
                                        status="UNBOOKED"
                                    />
                                </div>
                                <div className="absolute -left-4 top-1/2 -translate-y-1/2">
                                    <button className="rounded-full bg-white p-2" onClick={() => {
                                        document.querySelector('#gameCards').scrollBy({ left: -200, behavior: 'smooth' });
                                    }}>
                                        <FaChevronLeft className="h-4 w-4" />
                                    </button>
                                </div>
                                <div className="absolute -right-4 top-1/2 -translate-y-1/2">
                                    <button className="rounded-full bg-white p-2" onClick={() => {
                                        document.querySelector('#gameCards').scrollBy({ left: 200, behavior: 'smooth' });
                                    }}>
                                        <FaChevronRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
            </div>
        </Layout>
    );
}
