import { Eye, MessageCircle, UserPlus } from "lucide-react";
import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../../../Context/AppContext";
import BookingDetail from "./BookingDetail";
import FormHiring from "./FormHiring";
import axios from "axios";

export default function BookedRow({
  id,
  venue_id,
  name,
  location,
  court,
  date,
  time,
  payment,
  status,
  onOpenChat,
}) {
  const [showDetail, setShowDetail] = useState(false);
  const [showFormHiring, setShowFormHiring] = useState(false);
  const [isRecruited, setIsRecruited] = useState(false);
  const { user } = useContext(AppContext);
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    const checkRecruitmentStatus = async () => {
      try {
        const response = await axios.get(`/api/getGameStatus`, {
          params: { id: id },
        });
        setIsRecruited(response.data.is_recruited);
      } catch (error) {
        console.error("Error checking recruitment status:", error);
      }
    };
    checkRecruitmentStatus();
  }, [id]);

  // Fetch venue và owner info dựa trên venue_id
  useEffect(() => {
    const fetchVenueOwnerInfo = async () => {
      try {
        const response = await axios.get('/api/venue-owner', {
          params: { venue_id: venue_id },
        });
        if (response.data.success) {
          console.log(response.data.data);
          setOwner(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching venue and owner info:", error);
      }
    };
    fetchVenueOwnerInfo();
  }, [venue_id]);

  const handleViewDetails = () => {
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
  };

  const handleViewFormHiring = () => {
    setShowFormHiring(true);
  }

  const handleCloseFormHiring = () => {
    setShowFormHiring(false);
  }

  const handleOpenChatClick = () => {
    onOpenChat(owner?.id); // Gửi user_id lên Table
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
            <div className="text-green-600">{court}</div>
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
          <span
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 ${status === "awaiting"
              ? "bg-purple-100 text-purple-600"
              : "bg-green-100 text-green-600"
              }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${status === "awaiting" ? "bg-purple-600" : "bg-green-600"
                }`}
            ></span>
            {status === "awaiting" ? "Awaiting" : "Accepted"}
          </span>
        </td>
        <td className="whitespace-nowrap px-6 py-4">
          <button
            className="inline-flex items-center gap-1 text-pink-600"
            onClick={handleViewDetails}
          >
            <Eye className="h-4 w-4" />
            View Details
          </button>
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
          <button
            onClick={handleViewFormHiring}
            disabled={isRecruited || status === "awaiting"}
            className={`flex items-center gap-2 px-4 py-2 rounded text-white ${isRecruited || status === "awaiting"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
              }`}
          >
            <UserPlus className="h-4 w-4" />
            <span>{isRecruited ? "Đã tuyển" : "Tuyển"}</span>
          </button>
        </td>
        <td>
          {showDetail && (
            <BookingDetail
              onClose={handleCloseDetail}
              image={owner?.avatar ? `http://localhost:8000${owner.avatar}` : "/placeholder.svg"}
              name={name}
              location={location}
              court={court}
              date={date}
              time={time}
              payment={payment}
            />
          )}
          {showFormHiring && (
            <FormHiring
              onClose={handleCloseFormHiring}
              id={id}
              venue_id={venue_id}
              creator_id={user.id}
              court={court}
              date={date}
              start_time={time.split(" - ")[0]}
              end_time={time.split(" - ")[1]}
            />
          )}
        </td>
      </tr>
    </>
  );
}