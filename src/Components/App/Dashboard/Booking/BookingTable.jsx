import React, { useState, useEffect } from "react";
import BookedRow from "./BookingRow";
import ChatComponent from "../../Chat/ChatComponent";

export default function BookingTable({ bookings, tab }) {
  const [values, setValues] = useState([]);
    const [showChat, setShowChat] = useState(false); // Trạng thái hiển thị chat
    const [selectedUserId, setSelectedUserId] = useState(null);

  const transformBookings = (data) => {
    if (!data.courts_booked) return [];

    return data.courts_booked.map(court => {
      const formatTime = (time) => {
        const hours = parseInt(time.split(":")[0], 10);
        return `${time} ${hours < 12 ? "SA" : "CH"}`;
      };

      return {
        id: `${data.id}-${court.court_number}-${court.start_time}-${court.end_time}`,
        venue_id: data.venue_id,
        name: data.venue_name,
        location: data.venue_location,
        court: court.court_number,
        date: data.booking_date,
        time: `${formatTime(court.start_time)} - ${formatTime(court.end_time)}`,
        payment: `${court.price} VNĐ`,
        status: court.status,
        note: data.note,
        tab: tab,
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

  // Callback để nhận user_id từ Row
  const handleOpenChat = (userId) => {
    setSelectedUserId(userId);
    setShowChat(true);
  };

  // Đóng chat
  const handleCloseChat = () => {
    setShowChat(false);
    setSelectedUserId(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 text-sm">
          <tr>
            {tab === "Sắp tới" && (
              ['Tên sân', 'Ngày & Giờ', 'Thanh toán', 'Tráng thái', 'Chi tiết', 'Nhắn tin', 'Tuyển người'].map((heading) => (
                <th key={heading} className="whitespace-nowrap px-6 py-4 text-left font-medium text-gray-500">
                  {heading}
                </th>
              ))
            )}
            {tab === "Đã huỷ" && (
              ['Tên sân', 'Ngày & Giờ', 'Thanh toán', 'Trạng thái', 'Nhắn tin'].map((heading) => (
                <th key={heading} className="whitespace-nowrap px-6 py-4 text-left font-medium text-gray-500">
                  {heading}
                </th>
              ))
            )}
            
          </tr>
        </thead>
        <tbody className="divide-y text-sm">
          {values.map((value) => (
            <BookedRow key={value.id} {...value} onOpenChat={handleOpenChat} />
          ))}
        </tbody>
      </table>
      {/* Render ChatComponent khi showChat là true */}
      {showChat && (
        <>
          <ChatComponent otherUserId={selectedUserId} isOpen={showChat} />
        </>
      )}
    </div>
  );
}