import React, { useState, useEffect } from 'react';
import SelectedSlotsInfo from './SelectedSlotsInfor';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { format } from 'date-fns';
import axios from 'axios';

const BookingTable = ({ bookingTable }) => {

    const [selectedCells, setSelectedCells] = useState({});
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [bookedCourts, setBookedCourts] = useState([]);
    const numberOfCourts = bookingTable.venue.court_count;
    const courtNames = Array.from({ length: numberOfCourts }, (_, i) => `Sân ${i + 1}`);

    useEffect(() => {
        // Reset selected cells when the date changes
        getBookedCourts(bookingTable.venue.id, selectedDate);
        setSelectedCells({});
    }, [selectedDate]);

    const generateTimeSlots = (startTime, endTime) => {
        const slots = [];
    
        // Tách giờ và phút từ startTime và endTime
        const [startHour, startMinute] = startTime.split(":").map(Number);
        const [endHour, endMinute] = endTime.split(":").map(Number);
    
        // Chuyển đổi thời gian bắt đầu và kết thúc thành số phút để dễ tính toán
        const startTotalMinutes = startHour * 60 + startMinute;
        const endTotalMinutes = endHour * 60 + endMinute;
    
        // Tạo các slot cách nhau 30 phút từ startTime đến endTime
        for (let minutes = startTotalMinutes; minutes <= endTotalMinutes; minutes += 30) {
            const hour = Math.floor(minutes / 60);
            const minute = minutes % 60;
            // Định dạng lại thành chuỗi "HH:mm"
            const timeSlot = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
            slots.push(timeSlot);
        }
    
        return slots;
    };

    const timeSlots = generateTimeSlots(bookingTable.venue.open_time, bookingTable.venue.close_time);

    const getBookedCourt = (bookings) => {
        const slots = {};

        bookings.forEach((booking) => {
            booking.courts_booked.forEach((court) => {
                const courtName = court.court_number; // "Sân 4"
                if (!slots[courtName]) {
                    slots[courtName] = new Set(); // Dùng Set để tránh trùng lặp
                }

                // Thêm tất cả các khung giờ từ start_time đến end_time
                let currentTime = formatTime(court.start_time);
                const endTime = formatTime(court.end_time);

                while (currentTime !== endTime) {
                    slots[courtName].add(currentTime);
                    currentTime = add30Minutes(currentTime);
                }
            });
        });

        // Chuyển Set thành mảng và sắp xếp đúng thứ tự
        Object.keys(slots).forEach((court) => {
            slots[court] = Array.from(slots[court]).sort();
        });

        setBookedCourts(slots);
    };

    // Hàm chuẩn hóa thời gian thành HH:mm
    const formatTime = (time) => {
        let [hour, minute] = time.split(":").map(Number);
        return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
    };

    // Hàm để tăng thời gian lên 30 phút
    const add30Minutes = (time) => {
        let [hour, minute] = time.split(":").map(Number);
        minute += 30;
        if (minute >= 60) {
            hour += 1;
            minute = 0;
        }
        return formatTime(`${hour}:${minute}`);
    };

    const getBookedCourts = async (courtId, selectedDate) => {

        const formattedDate = selectedDate ? format(selectedDate, "dd/MM/yyyy") : null;

        try {
            const response = await axios.get(`/api/getBookedCourts/${courtId}`, {
                params: { booking_date: formattedDate }
            });
            getBookedCourt(response.data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    const handleCellClick = (court, time) => {
        if (bookedCourts[court]?.includes(formatTime(time))) {
            return; // Nếu đã đặt rồi thì không làm gì cả
        }
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
            <div className="mb-2">
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="dd/MM/yyyy"
                    customInput={<button className="bg-green-500 text-white px-4 py-2 rounded flex items-center">
                        <FaCalendarAlt className="mr-2" />
                        {selectedDate.toLocaleDateString("en-GB")}
                        <IoIosArrowDown className="ml-2" />
                    </button>}
                />
            </div>
            <table className="border-collapse w-1000">
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
                            <td className="border font-normal text-left">{field}</td>
                            {timeSlots.map((time, index) => (
                                <td
                                    key={index}
                                    className={`border p-0 text-left cursor-pointer ${bookedCourts[field]?.includes(formatTime(time))
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

            {Object.keys(selectedInfo).length > 0 && <SelectedSlotsInfo selectedInfo={selectedInfo} courtPrices={bookingTable.courtPrices} selectedDate={selectedDate} venueName={bookingTable.venue.name} venueLocation={bookingTable.venue.location}/>}
        </div>
    );
};

export default BookingTable;