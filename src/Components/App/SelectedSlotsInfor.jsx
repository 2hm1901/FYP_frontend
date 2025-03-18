import axios from 'axios';
import { React, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from "../../Context/AppContext";
import {format} from 'date-fns';

const SelectedSlotsInfo = ({ selectedInfo, courtPrices, selectedDate, venueName, venueLocation, venueId }) => {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  const id_venue = venueId;
  let totalAmount1 = 0;
  let totalAmount = 0;

  const roundTime = (time) => {
    let [hour, minute] = time.split(":").map(Number);

    if (minute === 0) {
        minute = 30;
    } else {
        hour += 1;
        minute = 0;
    }

    return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
  };

  const calculatePrice = (time) => {
    const hour = parseInt(time.split(":")[0], 10);
    const minute = parseInt(time.split(":")[1], 10);

    const priceSlot = courtPrices[0].price_slots.find(slot => {
      const [startHour, startMinute] = slot.start_time.split(":").map(Number);
      const [endHour, endMinute] = slot.end_time.split(":").map(Number);
      const startTime = startHour * 60 + startMinute;
      const endTime = endHour * 60 + endMinute;
      const currentTime = hour * 60 + minute;
      return currentTime >= startTime && currentTime < endTime;
    });

    return priceSlot ? priceSlot.price : 0;
  };

  const formatBookingData = () => {
    const courtsBooked = [];
    Object.keys(selectedInfo).forEach((court) => {
      selectedInfo[court].forEach((times) => {
        const startTime = times[0];
        const endTime = roundTime(times[times.length - 1]);
        const amount = times.reduce((sum, time) => sum + calculatePrice(time), 0);
        totalAmount1 += amount;
        courtsBooked.push({
          court_number: court,
          start_time: startTime,
          end_time: endTime,
          price: amount,
          status: "awaiting",
        });
      });
    });

    return {
      user_id: user.id, // Convert to int
      venue_id: id_venue, // Convert to int
      venue_name: venueName,
      venue_location: venueLocation,
      courts_booked: courtsBooked,
      total_price: totalAmount,
      booking_date: format(selectedDate, "dd/MM/yyyy"),
    };
  };

  const handleBooking = async () => {
    const bookingData = formatBookingData();
    navigate('/bookingInfoRenter', { state: { bookingData } });
  };

  return (
    <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Sân đã chọn: </h2>
      {Object.keys(selectedInfo).map((court) => (
        selectedInfo[court].map((times, index) => {
          const startTime = times[0];
          const endTime = roundTime(times[times.length - 1]);
          const lengthOfTime = times.length * 30; // assuming each slot is 30 minutes
          const amount = times.reduce((sum, time) => sum + calculatePrice(time), 0);
          totalAmount += amount;
          return (
            <div key={`${court}-${index}`} className="mb-2 p-2 bg-white rounded-lg shadow-sm">
              <div className="text-sm font-medium">{court}: {startTime} - {endTime}</div>
              <div className="text-xs text-gray-600">Tổng: {lengthOfTime} phút</div>
              <div className="text-xs text-gray-600">Số tiền: {amount} VNĐ</div>
            </div>
          );
        })
      ))}
      <div className="mt-4 p-2 bg-white rounded-lg shadow-sm">
        <div className="text-lg font-medium">Tổng tiền: {totalAmount} VNĐ</div>
      </div>
      <button onClick={handleBooking} className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
        Xác nhận
      </button>
    </div>
  );
};

export default SelectedSlotsInfo;