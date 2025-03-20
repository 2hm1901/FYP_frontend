import { Eye, Check, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Row({
  id,
  venue_id,
  user_id,
  name,
  courts,
  date,
  payment,
  note,
  createAt,
}) {
  const [owner, setOwner] = useState({});
  const [renter, setRenter] = useState({});

  useEffect(() => {
    const fetchVenueOwnerInfo = async () => {
      try {
        const response = await axios.get('/api/venue-owner', {
          params: { venue_id: venue_id },
        });
        if (response.data.success) {
          setOwner(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching venue and owner info:", error);
      }
    };
    fetchVenueOwnerInfo();
  }, [venue_id]);

  useEffect(() => {
    const fetchRenterInfo = async () => {
      try {
        const response = await axios.get('/api/getUser', {
          params: { user_id: user_id },
        });
        if (response.data.success) {
          setRenter(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching renter info:", error);
      }
    };
    fetchRenterInfo();
  }, [user_id]);

  const handleCheckBill = () => {
    console.log("Check bill of booking id:", id);
  };

  const handleAccept = async () => {
    const confirmed = window.confirm("Bạn có chắc muốn chấp nhận yêu cầu đặt sân này?");
    if (!confirmed) return;

    try {
      const response = await axios.post(
        '/api/bookings/accept',
        { booking_id: id },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      if (response.data.success) {
        console.log("Booking accepted:", response.data);
        window.location.reload(); // Reload the page after successful action
      }
    } catch (error) {
      console.error("Error accepting booking:", error);
    }
  };

  const handleDecline = async () => {
    const confirmed = window.confirm("Bạn có chắc muốn từ chối yêu cầu đặt sân này?");
    if (!confirmed) return;

    try {
      const response = await axios.post(
        '/api/bookings/decline',
        { booking_id: id },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      if (response.data.success) {
        console.log("Booking declined:", response.data);
        window.location.reload(); 
      }
    } catch (error) {
      console.error("Error declining booking:", error);
    }
  };

  return (
    <tr>
      <td className="whitespace-nowrap px-6 py-4 flex items-center gap-3">
        <img
          src={owner?.avatar ? `http://localhost:8000/storage/avatars/${owner.avatar}` : "/placeholder.svg"}
          alt={name}
          className="w-12 h-12 rounded-lg"
        />
        <div>
          <div className="font-medium text-gray-900">{name}</div>
          <div className="text-green-600 text-xs mt-1">
            {courts.map((court, index) => (
              <div key={index} className="flex items-center gap-1">
                <span className="font-semibold">{court.court_number}:</span>
                <span>{court.time}</span>
              </div>
            ))}
          </div>
        </div>
      </td>

      <td className="whitespace-nowrap px-6 py-4">
        <div className="text-gray-900">{date}</div>
      </td>

      <td className="whitespace-nowrap px-6 py-4 items-center gap-3">
        <div className="flex">
          <img
            src={renter?.avatar ? `http://localhost:8000/storage/avatars/${renter.avatar}` : "/placeholder.svg"}
            alt={renter?.username}
            className="w-12 h-12 rounded-lg"
          />
          <div>
            <div className="font-medium text-gray-900 pl-4 pt-4">{renter?.username}</div>
          </div>
        </div>
      </td>

      <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
        {payment}
      </td>

      <td className="whitespace-nowrap px-6 py-4">
        <button
          className="inline-flex items-center gap-1 text-pink-600"
          onClick={handleCheckBill}
        >
          <Eye className="h-4 w-4" />
          Xem ảnh CK
        </button>
      </td>

      <td className="whitespace-nowrap px-6 py-4">
        <div className="text-gray-600">
          {note ? note : "Không có ghi chú"}
        </div>
      </td>

      <td className="px-4 py-3">
        <div className="flex gap-2">
          <button
            onClick={handleAccept}
            className="inline-flex items-center justify-center rounded-xl bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <Check className="mr-1 h-4 w-4" />
            Accept
          </button>
          <button
            onClick={handleDecline}
            className="inline-flex items-center justify-center rounded-xl bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <X className="mr-1 h-4 w-4" />
            Decline
          </button>
        </div>
      </td>
    </tr>
  );
}