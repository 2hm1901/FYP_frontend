import { Eye, Check, X } from "lucide-react";
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
          console.log("V:",response.data.data);
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
          params: { user_id: user_id },
        });
        if (response.data.success) {
          console.log("R:",response.data.data);
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
  }
  return (
    <>
      <tr>
        <td className="whitespace-nowrap px-6 py-4 flex items-center gap-3">
          <img
            src={ owner?.avatar ? `http://localhost:8000${owner.avatar}` : "/placeholder.svg"}
            alt={name}
            className="w-12 h-12 rounded-lg"
          />
          <div>
            <div className="font-medium text-gray-900">{name}</div>
            <div className="text-green-600">{court}</div>
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
                  <button className="inline-flex items-center justify-center rounded-xl bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                    <Check className="mr-1 h-4 w-4" />
                    Accept
                  </button>
                  <button className="inline-flex items-center justify-center rounded-xl bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                    <X className="mr-1 h-4 w-4" />
                    Decline
                  </button>
                </div>
              </td>
      </tr>
    </>
  );
}