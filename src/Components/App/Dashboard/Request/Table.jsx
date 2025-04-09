import React, { useState, useEffect } from "react";
import Row from "./Row";

export default function Table({ bookings }) {
  const [values, setValues] = useState([]);

  const transformBookings = (data) => {
    if (!data || !data.courts_booked) return [];

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

    // Gộp tất cả courts_booked thành một object duy nhất
    const courts = data.courts_booked.map(court => ({
      court_number: court.court_number,
      time: `${formatTime(court.start_time)} - ${formatTime(court.end_time)}`,
      price: court.price,
      status: court.status,
    }));

    return [{
      id: data.id, // Dùng _id làm ID duy nhất cho hàng
      venue_id: data.venue_id,
      user_id: data.user_id,
      name: data.venue_name,
      courts: courts, // Mảng chứa thông tin các sân
      date: data.booking_date,
      payment: `${data.total_price} VNĐ`, // Tổng giá
      note: data.note,
      createAt: formatDate(data.created_at),
      payment_image: data.payment_image,
    }];
  };

  const getBookings = () => {
    const bookingsArray = Array.isArray(bookings) ? bookings : [bookings];
    const transformedBookings = bookingsArray.flatMap(transformBookings);
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
            {['Tên sân', 'Ngày đặt', 'Người đặt', 'Thanh toán', 'Check Bill', 'Ghi chú', ''].map((heading) => (
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