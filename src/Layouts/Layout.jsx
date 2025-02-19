import React from 'react';
import Header from '../Components/App/Header';
import Footer from '../Components/App/Footer';

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
                <main className="flex-grow">
                    {children}
                </main>
            <Footer />
        </div>
    );
};

export default Layout;
