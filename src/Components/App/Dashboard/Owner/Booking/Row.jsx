import { MessageCircle, Trash } from "lucide-react";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Row({
  id,
  venue_id,
  user_id,
  name,
  court,
  date,
  time,
  payment,
  note,
  createAt,
  onOpenChat,
}) {
  const [owner, setOwner] = useState({});
  const [renter, setRenter] = useState({});

  // Fetch venue và owner info dựa trên venue_id
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

  // Fetch renter info dựa trên user_id
  useEffect(() => {
    const fetchRenterInfo = async () => {
      try {
        const response = await axios.get('/api/getUser', {
          params: { user_id: user_id }, // Thay user_id thành id để khớp với API
        });
        if (response.data) {
          setRenter(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching renter info:", error);
      }
    };
    fetchRenterInfo();
  }, [user_id]);

  const handleOpenChatClick = () => {
    onOpenChat(user_id); // Gửi user_id lên Table
  };

  return (
    <>
      <tr>
        <td className="whitespace-nowrap px-6 py-4 flex items-center gap-3">
          <img
            src={owner?.avatar ? `http://localhost:8000${owner.avatar}` : "/placeholder.svg"}
            alt={name}
            className="w-12 h-12 rounded-lg"
          />
          <div>
            <div className="font-medium text-gray-900">{name}</div>
            <div className="text-green-600">
              {court} <span className="text-gray-500"> Đặt sân lúc: {createAt} </span>
            </div>
          </div>
        </td>
        <td className="whitespace-nowrap px-6 py-4 items-center gap-3">
          <div className="flex">
            <img
              src={renter?.avatar ? `http://localhost:8000${renter.avatar}` : "/placeholder.svg"}
              alt={renter?.username}
              className="w-12 h-12 rounded-lg"
            />
            <div>
              <div className="font-medium text-gray-900 pl-4 pt-4">{renter?.username}</div>
            </div>
          </div>
        </td>
        <td className="whitespace-nowrap px-6 py-4">
          <div className="text-gray-900">{date}</div>
          <div className="text-gray-500">{time}</div>
        </td>
        <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
          {payment}
        </td>
        <td className="whitespace-nowrap px-6 py-4">
          <button
            className="inline-flex items-center gap-1 text-gray-600"
            onClick={handleOpenChatClick}
          >
            <MessageCircle className="h-4 w-4" />
            Chat
          </button>
        </td>
        <td className="whitespace-nowrap px-6 py-4">
          <div className="text-gray-600">
            {note ? note : "Không có ghi chú"}
          </div>
        </td>
        <td className="whitespace-nowrap px-6 py-4">
          <button className="inline-flex items-center gap-1 text-red-600">
            <Trash className="h-4 w-4" />
            Huỷ lịch
          </button>
        </td>
      </tr>
    </>
  );
}