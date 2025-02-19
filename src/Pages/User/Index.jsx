import React from 'react';
import Layout from '../../Layouts/Layout';
import { FaChevronDown, FaChevronLeft, FaChevronRight, FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import bannerRight from '../../assets/banner-right.png';
import VenueCard from '../../Components/App/VenueCard';
import GameCard from '../../Components/App/GameCard';

const Index = () => {
    return (
        <Layout>
            <div className="bg-gradient-to-r from-green-800 to-blue-900 p-16">
                <div className="container mx-auto text-center">
                    <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-16">
                        <div className="lg:w-1/2 text-center lg:text-left mb-16 lg:mb-0">
                            <h1 className="text-6xl font-bold text-yellow-500 mb-8">World Class Badminton Coaching & Premium Courts</h1>
                            <h2 className="text-3xl text-white mb-4">Choose Your Coaches And Start Your Training</h2>
                            <p className="text-white mb-16">Unleash Your Athletic Potential with Expert Coaching, State-of-the-Art Facilities, and Personalized Training Programs.</p>

                            <div className="flex justify-center lg:justify-start items-center mb-16">
                                <div className="relative">
                                    <FaMapMarkerAlt className="text-black absolute left-3 top-3 text-3xl" />
                                    <input type="text" className="pl-12 pr-40 py-4 rounded-full border border-gray-300" placeholder="Choose Location" />
                                    <FaChevronDown className="absolute right-3 top-3 text-black" />
                                    <button className="absolute right-0 top-0 h-full bg-green-500 text-white px-8 rounded-r-full">
                                        <FaSearch />
                                    </button>
                                </div>
                            </div>
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
                                <a href='/venues' className="text-emerald-500 font-medium flex items-center">
                                    SEE ALL VENUES
                                    <FaChevronRight className="ml-1 h-4 w-4" />
                                </a>
                            </div>
                            <div className="relative">
                                <div className="flex space-x-4 overflow-x-auto pb-4">
                                    {/* Venue Cards */}
                                    <VenueCard
                                        image=""
                                        title="Game Theory - Joseph's"
                                        rating={4.67}
                                        reviews={6}
                                        location="Gate 3, No.2, Vittal M..."
                                        distance="~0.13 Kms"
                                    />
                                    <VenueCard
                                        image=""
                                        title="Wellness Sports Inc"
                                        rating={5.00}
                                        reviews={4}
                                        location="#1, Bhavya Plaza, 2nd..."
                                        distance="~0.46 Kms"
                                    />
                                    <VenueCard
                                        image=""
                                        title="Wellness Sports Inc"
                                        rating={5.00}
                                        reviews={4}
                                        location="#1, Bhavya Plaza, 2nd..."
                                        distance="~0.46 Kms"
                                    />
                                    <VenueCard
                                        image=""
                                        title="Wellness Sports Inc"
                                        rating={5.00}
                                        reviews={4}
                                        location="#1, Bhavya Plaza, 2nd..."
                                        distance="~0.46 Kms"
                                    />
                                    <VenueCard
                                        image=""
                                        title="Wellness Sports Inc"
                                        rating={5.00}
                                        reviews={4}
                                        location="#1, Bhavya Plaza, 2nd..."
                                        distance="~0.46 Kms"
                                    />
                                </div>
                                <div className="absolute -left-4 top-1/2 -translate-y-1/2">
                                    <button className="rounded-full bg-white p-2" onClick={() => {
                                        document.querySelector('.overflow-x-auto').scrollBy({ left: -200, behavior: 'smooth' });
                                    }}>
                                    <FaChevronLeft className="h-4 w-4" />
                                    </button>
                                </div>
                                <div className="absolute -right-4 top-1/2 -translate-y-1/2">
                                    <button className="rounded-full bg-white p-2" onClick={() => {
                                        document.querySelector('.overflow-x-auto').scrollBy({ left: 200, behavior: 'smooth' });
                                    }}>
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
                                <a href='/games' className="text-emerald-500 font-medium flex items-center">
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
            </div>
        </Layout>
    );
};

export default Index;
