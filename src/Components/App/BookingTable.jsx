import React, { useState } from 'react';
import SelectedSlotsInfo from './SelectedSlotsInfor';

const BookingTable = ({ bookingTable }) => {
    const [selectedCells, setSelectedCells] = useState({});

    const generateTimeSlots = (startHour, endHour) => {
        const slots = [];
        for (let hour = startHour; hour <= endHour; hour++) {
            slots.push(`${hour}:00`);
            if (hour < endHour) {
                slots.push(`${hour}:30`);
            }
        }
        return slots;
    };

    const formatHourOnly = (time) => {
        return parseInt(time.split(":")[0], 10);
    };

    const timeSlots = generateTimeSlots(formatHourOnly(bookingTable.venue.open_time), formatHourOnly(bookingTable.venue.close_time));

    const bookedSlots = {
        "Sân 1": ["8:00", "8:30", "9:00", "9:30", "10:00"],
        "Sân 4": ["8:00", "8:30", "9:00", "9:30", "10:00"]
    };

    const numberOfCourts = bookingTable.venue.court_count;
    const courtNames = Array.from({ length: numberOfCourts }, (_, i) => `Sân ${i + 1}`);

    const handleCellClick = (court, time) => {
        setSelectedCells((prev) => ({
            ...prev,
            [`${court}-${time}`]: !prev[`${court}-${time}`]
        }));
    };

    const getSelectedInfo = () => {
        const selectedInfo = {};
        Object.keys(selectedCells).forEach((key) => {
            if (selectedCells[key]) {
                const [court, time] = key.split('-');
                if (!selectedInfo[court]) {
                    selectedInfo[court] = [];
                }
                selectedInfo[court].push(time);
            }
        });

        // Sort and group times
        Object.keys(selectedInfo).forEach((court) => {
            selectedInfo[court].sort();
            const groupedTimes = [];
            let currentGroup = [selectedInfo[court][0]];

            for (let i = 1; i < selectedInfo[court].length; i++) {
                const prevTime = selectedInfo[court][i - 1];
                const currentTime = selectedInfo[court][i];
                const [prevHour, prevMinute] = prevTime.split(':');
                const [currentHour, currentMinute] = currentTime.split(':');

                if (
                    parseInt(currentHour) === parseInt(prevHour) &&
                    parseInt(currentMinute) === parseInt(prevMinute) + 30
                ) {
                    currentGroup.push(currentTime);
                } else if (
                    parseInt(currentHour) === parseInt(prevHour) + 1 &&
                    parseInt(currentMinute) === 0 &&
                    parseInt(prevMinute) === 30
                ) {
                    currentGroup.push(currentTime);
                } else {
                    groupedTimes.push(currentGroup);
                    currentGroup = [currentTime];
                }
            }
            groupedTimes.push(currentGroup);
            selectedInfo[court] = groupedTimes;
        });

        return selectedInfo;
    };

    const selectedInfo = getSelectedInfo();

    return (
        <div className='overflow-x-auto'>
            <table className="border-collapse w-full">
                <thead>
                    <tr className='relative'>
                        {timeSlots.map((time, index) => (
                            <th key={index} className="p-6 relative">
                                <span className='absolute right-0 left-10 bottom-0 text-xs text-left text-gray-500'>
                                    {time}
                                </span>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {courtNames.map((field) => (
                        <tr key={field}>
                            <td className="border font-bold text-left">{field}</td>
                            {timeSlots.map((time, index) => (
                                <td
                                    key={index}
                                    className={`border p-0 text-left cursor-pointer ${
                                        bookedSlots[field]?.includes(time)
                                            ? "bg-red-500"
                                            : selectedCells[`${field}-${time}`]
                                            ? "bg-green-500"
                                            : "bg-white"
                                    }`}
                                    onClick={() => handleCellClick(field, time)}
                                ></td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {Object.keys(selectedInfo).length > 0 && <SelectedSlotsInfo selectedInfo={selectedInfo} courtPrices={bookingTable.courtPrices} id_court={bookingTable.venue.id} />}
        </div>
    );
};

export default BookingTable;