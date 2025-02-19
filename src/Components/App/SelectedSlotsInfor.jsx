import axios from 'axios';
import { React, usePage } from 'react';

const SelectedSlotsInfo = ({ selectedInfo, courtPrices, id_court }) => {
  const { auth } = usePage().props;
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
        });
      });
    });

    return {
      user_id: auth.user.id, // Replace with actual user ID
      court_id: id_court, // Replace with actual court ID
      courts_booked: courtsBooked,
      total_price: totalAmount,
      booking_date: new Date().toLocaleTimeString(), // Get the time when the user presses the booking button
    };
  };

  const handleBooking = async () => {
    const bookingData = formatBookingData();
    try {
      const response = await axios.post('/api/bookCourt', bookingData);
      console.log('Booking successful:', response.data);
    } catch (error) {
      console.error('Error booking court:', error);
    }
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
        Book Now
      </button>
    </div>
  );
};

export default SelectedSlotsInfo;