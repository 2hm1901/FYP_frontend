import React from 'react';
import Layout from '../../../Layouts/Layout';
import SearchVenue from '../../../Components/App/SearchVenue';
import VenueGrid from '../../../Components/App/VenueGrid';

const VenueList = () => {
    return (
        <Layout>
            <div className="p-5 bg-gray-50 min-h-screen">
                <SearchVenue />
                <VenueGrid />
            </div>
        </Layout>
    );
};

export default VenueList;
