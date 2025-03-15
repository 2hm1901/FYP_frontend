import React, { useState, useEffect } from "react";
import Row from "./Row";

export default function Table({ bookings }) {
  const [values, setValues] = useState([]);

  const transformBookings = (data) => {
    if (!data.courts_booked) return [];

    const formatTime = (time) => {
      const hours = parseInt(time.split(":")[0], 10);
      return `${time} ${hours < 12 ? "SA" : "CH"}`;
    };

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    return data.courts_booked.map(court => {
      return {
        id: `${data.id}-${court.court_number}-${court.start_time}-${court.end_time}`,
        venue_id: data.venue_id,
        user_id: data.user_id,
        name: data.venue_name,
        court: court.court_number,
        date: data.booking_date,
        time: `${formatTime(court.start_time)} - ${formatTime(court.end_time)}`,
        payment: `${court.price} VNĐ`,
        note: data.note,
        createAt: formatDate(data.created_at),
      };
    });
  };

  const getBookings = () => {
    const bookingsArray = Array.isArray(bookings) ? bookings : [bookings];

    // Chuyển đổi và sắp xếp theo `booking_date`
    const transformedBookings = bookingsArray
      .flatMap(transformBookings)
      .sort((a, b) => {
        const dateA = new Date(a.date.split("/").reverse().join("-")); // "02/03/2025" -> "2025-03-02"
        const dateB = new Date(b.date.split("/").reverse().join("-"));
        return dateA - dateB;
      });

    setValues(transformedBookings);
  };

  useEffect(() => {
    getBookings();
  }, [bookings]);

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 text-sm">
          <tr>
            {['Tên sân', 'Người đặt', 'Ngày & Giờ', 'Thanh toán', 'Check Bill', 'Ghi chú', ''].map((heading) => (
              <th key={heading} className="whitespace-nowrap px-6 py-4 text-left font-medium text-gray-500">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y text-sm">
          {values.map((value) => (
            <Row key={value.id} {...value} />
          ))}
        </tbody>
      </table>
    </div>
  );
}