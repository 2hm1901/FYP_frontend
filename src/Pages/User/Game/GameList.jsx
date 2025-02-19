import React from 'react';
import Layout from '../../../Layouts/Layout';
import FilterNav from '../../../Components/App/FilterNav';
import GameCard from '../../../Components/App/GameCard';

const GameList = () => {
  return (
        <Layout>
            <div className="p-5 bg-gray-50 min-h-screen">
            <FilterNav />
            <div className="flex items-center justify-between mt-6">
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
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
                    status="BOOKED"
                />
                </div>
                </div>
                </div>
        </Layout>

  );
};

export default GameList;
