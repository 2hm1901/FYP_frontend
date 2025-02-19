import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white p-8">
            <div className="container mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold">We Welcome Your Passion And Expertise</h2>
                    <button className="bg-green-500 text-white px-4 py-2 mt-4 rounded hover:bg-green-600">Join Now</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
                    {/* Contact Us Section */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                        <p>123 Badminton St.</p>
                        <p>City, Country</p>
                        <p>Email: info@badminton.com</p>
                        <div className="flex space-x-4 mt-4">
                            <FaFacebook className="text-blue-600" />
                            <FaTwitter className="text-blue-400" />
                            <FaInstagram className="text-pink-600" />
                        </div>
                    </div>

                    {/* Quick Links Section */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                        <ul>
                            <li><a href="#about" className="hover:text-green-300">About Us</a></li>
                            <li><a href="#services" className="hover:text-green-300">Services</a></li>
                            <li><a href="#blog" className="hover:text-green-300">Blog</a></li>
                            <li><a href="#contact" className="hover:text-green-300">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Support Section */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Support</h3>
                        <ul>
                            <li><a href="#faq" className="hover:text-green-300">FAQ</a></li>
                            <li><a href="#support" className="hover:text-green-300">Support Center</a></li>
                            <li><a href="#terms" className="hover:text-green-300">Terms of Service</a></li>
                            <li><a href="#privacy" className="hover:text-green-300">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Other Links Section */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Other Links</h3>
                        <ul>
                            <li><a href="#coaches" className="hover:text-green-300">Coaches</a></li>
                            <li><a href="#venues" className="hover:text-green-300">Sports Venue</a></li>
                            <li><a href="#events" className="hover:text-green-300">Events</a></li>
                            <li><a href="#news" className="hover:text-green-300">News</a></li>
                        </ul>
                    </div>

                    {/* Our Locations Section */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Our Locations</h3>
                        <ul>
                            <li><a href="#location1" className="hover:text-green-300">Ha Noi</a></li>
                            <li><a href="#location2" className="hover:text-green-300">Da Nang</a></li>
                            <li><a href="#location3" className="hover:text-green-300">Ho Chi Minh</a></li>
                            <li><a href="#location4" className="hover:text-green-300">Quang Binh</a></li>
                        </ul>
                    </div>

                    {/* Download Section */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Download</h3>
                        <button className="bg-blue-500 text-white px-4 py-2 mb-2 rounded hover:bg-blue-600">App Store</button>
                        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Google Play</button>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="text-center mt-8">
                    <p>&copy; 2023 Badminton. All rights reserved.</p>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
