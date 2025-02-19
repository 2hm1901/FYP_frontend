import React, { useState } from 'react';
import { FaSlidersH, FaTrophy, FaCalendarAlt, FaChevronDown, FaMapMarkerAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const FilterNav = () => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [selectedLevel, setSelectedLevel] = useState('Level');
    const [selectedDistance, setSelectedDistance] = useState('Distance');
    const [selectedDate, setSelectedDate] = useState(null);

    const toggleDropdown = (dropdown) => {
        setOpenDropdown(openDropdown === dropdown ? null : dropdown);
    };

    return (
        <div className="flex flex-wrap gap-2 p-1">
            <div className="h-12 px-4 bg-white border border-gray-300 rounded flex items-center">
                <FaSlidersH className="mr-2 h-4 w-4" />
                Filter & Sort By:
            </div>
            <div className="relative">
                <button
                    className="h-12 px-4 bg-white border border-gray-300 rounded flex items-center"
                    onClick={() => toggleDropdown('level')}
                >
                    <FaTrophy className="mr-2 h-4 w-4" />
                    {selectedLevel}
                    <FaChevronDown className="ml-2 h-4 w-4" />
                </button>
                {openDropdown === 'level' && (
                    <div className="absolute mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg">
                        <div className="p-2" onClick={() => { setSelectedLevel('Beginner'); setOpenDropdown(null); }}>Beginner</div>
                        <div className="p-2" onClick={() => { setSelectedLevel('Intermediate'); setOpenDropdown(null); }}>Intermediate</div>
                        <div className="p-2" onClick={() => { setSelectedLevel('Advanced'); setOpenDropdown(null); }}>Advanced</div>
                    </div>
                )}
            </div>
            <div className="relative">
                <button
                    className="h-12 px-4 bg-white border border-gray-300 rounded flex items-center"
                    onClick={() => toggleDropdown('distance')}
                >
                    <FaMapMarkerAlt className="mr-2 h-4 w-4" />
                    {selectedDistance}
                    <FaChevronDown className="ml-2 h-4 w-4" />
                </button>
                {openDropdown === 'distance' && (
                    <div className="absolute mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg">
                        <div className="p-2" onClick={() => { setSelectedDistance('0-5 km'); setOpenDropdown(null); }}>0-5 km</div>
                        <div className="p-2" onClick={() => { setSelectedDistance('5-10 km'); setOpenDropdown(null); }}>5-10 km</div>
                        <div className="p-2" onClick={() => { setSelectedDistance('10-20 km'); setOpenDropdown(null); }}>10-20 km</div>
                    </div>
                )}
            </div>
            <div className="relative">
                <button
                    className="h-12 px-4 bg-white border border-gray-300 rounded flex items-center"
                    onClick={() => toggleDropdown('date')}
                >
                    <FaCalendarAlt className="mr-2 h-4 w-4" />
                    {selectedDate ? selectedDate.toDateString() : 'Date'}
                    <FaChevronDown className="ml-2 h-4 w-4" />
                </button>
                {openDropdown === 'date' && (
                    <div className="absolute mt-2 bg-white border border-gray-300 rounded shadow-lg z-10">
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => { setSelectedDate(date); setOpenDropdown(null); }}
                            inline
                            calendarClassName="custom-datepicker"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default FilterNav;
