import React, { useState, useContext } from 'react';
import { GiShuttlecock, GiTennisRacket, GiTennisCourt } from 'react-icons/gi';
import { FaUser, FaUserCog, FaSignOutAlt, FaTasks } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo1 from '../../assets/logo1-removebg-preview.png';
import { AppContext } from '../../Context/AppContext';
import NotificationDropdown from '../Notification/NotificationDropdown';

const Header = ({ notifications, setNotifications }) => {
    const { user, token, setUser, setToken } = useContext(AppContext);
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    async function handleLogout(e) {
        e.preventDefault();
        try {
            await axios.post('/api/logout', null, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(null);
            setToken(null);
            localStorage.removeItem('token');
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }

    return (
        <header className="bg-green-800 p-1 sticky top-0 z-50">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <a href="/">
                        <img src={logo1} alt="Badminton" className="h-20 w-50 mr-0" />
                    </a>
                </div>
                <nav className="flex space-x-20">
                    <Link to="/" className="text-white hover:text-green-300 text-lg flex items-center">
                        <GiShuttlecock className="mr-2 text-2xl transform rotate-180" /> Trang chủ
                    </Link>
                    <Link to="/game" className="text-white hover:text-green-300 text-lg flex items-center">
                        <GiTennisRacket className="mr-2 text-2xl" /> Tìm sân
                    </Link>
                    <Link to="/venue" className="text-white hover:text-green-300 text-lg flex items-center">
                        <GiTennisCourt className="mr-2 text-2xl" /> Đặt sân
                    </Link>
                    {user && (
                        <Link to="/dashboard" className="text-white hover:text-green-300 text-lg flex items-center">
                            <FaTasks className="mr-2 text-2xl" /> Quản lý sân
                        </Link>
                    )}
                </nav>

                <div className="flex space-x-4 mr-10 relative items-center">
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="bg-white text-green-800 px-4 py-2 rounded hover:bg-gray-200 flex items-center"
                            >
                                Xin chào, {user.username} <FaUserCog className="ml-2" />
                            </button>
                            {menuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                                    <Link to="/" className="px-4 py-2 text-gray-800 hover:bg-gray-200 flex items-center">
                                        <FaTasks className="mr-2" /> Quản lý sân
                                    </Link>
                                    <Link to="/" className="px-4 py-2 text-gray-800 hover:bg-gray-200 flex items-center">
                                        <FaUser className="mr-2" /> Hồ sơ
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 flex items-center"
                                    >
                                        <FaSignOutAlt className="mr-2" /> Đăng xuất
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="bg-white text-green-800 px-4 py-2 rounded hover:bg-gray-200">
                            Đăng ký / Đăng nhập
                        </Link>
                    )}
                    {user && (
                        <NotificationDropdown
                            notifications={notifications}
                            setNotifications={setNotifications}
                            token={token}
                            user={user}
                        />
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;