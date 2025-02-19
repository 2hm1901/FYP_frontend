import { React,Link, usePage } from 'react';
import { GiShuttlecock, GiTennisRacket, GiTennisCourt } from 'react-icons/gi';
import { FaUser, FaUserCog, FaSignOutAlt, FaTasks } from 'react-icons/fa';
import { Menu, MenuItem, MenuButton, MenuItems } from '@headlessui/react';
import logo1 from '../../assets/logo1-removebg-preview.png';

const Header = () => {
    const { auth } = usePage().props;

    return (
        <header className="bg-green-800 p-1 sticky top-0 z-50">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <a href="/">
                        <img src={logo1} alt="Badminton" className="h-20 w-50 mr-0" />
                    </a>
                </div>
                <nav className="flex space-x-20">
                    <a href="/" className="text-white hover:text-green-300 text-lg flex items-center">
                        <GiShuttlecock className="mr-2 text-2xl transform rotate-180 " /> Trang chủ
                    </a>
                    <a href="/game" className="text-white hover:text-green-300 text-lg flex items-center">
                        <GiTennisRacket className="mr-2 text-2xl" /> Tìm sân
                    </a>
                    <a href="/venue" className="text-white hover:text-green-300 text-lg flex items-center">
                        <GiTennisCourt className="mr-2 text-2xl" /> Đặt sân
                    </a>
                    {auth.user && (
                        <a href={route('dashboard')} className="text-white hover:text-green-300 text-lg flex items-center">
                            <FaTasks className="mr-2 text-2xl" /> Quản lý sân
                        </a>
                    )}
                </nav>
                <div className="flex space-x-4 mr-10 relative">
                    {auth.user ? (
                        <Menu as="div" className="relative">
                            <MenuButton className="bg-white text-green-800 px-4 py-2 rounded hover:bg-gray-200 flex items-center">
                                Xin chào, {auth.user.username} <FaUserCog className="ml-2" />
                            </MenuButton>
                            <MenuItems className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                                <MenuItem>
                                    {({ active }) => (
                                        <Link
                                            href={route('logout')}
                                            className={`block px-4 py-2 text-gray-800 ${active ? 'bg-gray-200' : ''} flex items-center`}
                                        >
                                            <FaTasks className="mr-2" /> Quản lý sân
                                        </Link>
                                    )}
                                </MenuItem>
                                <MenuItem>
                                    {({ active }) => (
                                        <Link
                                            href={route('logout')}
                                            className={`block px-4 py-2 text-gray-800 ${active ? 'bg-gray-200' : ''} flex items-center`}
                                        >
                                            <FaUser className="mr-2" /> Hồ sơ
                                        </Link>
                                    )}
                                </MenuItem>
                                <MenuItem>
                                    {({ active }) => (
                                        <Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className={`block w-full text-left px-4 py-2 text-gray-800 ${active ? 'bg-gray-200' : ''} flex items-center`}
                                        >
                                            <FaSignOutAlt className="mr-2" /> Đăng xuất
                                        </Link>
                                    )}
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                    ) : (
                        <Link href={route('login')} className="bg-white text-green-800 px-4 py-2 rounded hover:bg-gray-200">
                            Đăng ký / Đăng nhập
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
