import { Eye, MoreVertical, Edit, X } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import Detail from "./Detail";
import EditForm from "./Edit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Row({
    id,
    venue_id,
    creator_id,
    creator_name,
    court_number,
    game_date,
    start_time,
    end_time,
    current_players,
    max_players,
    skill_level_required,
}) {
    const [venue, setVenue] = useState({});
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    const fetchVenue = async () => {
        try {
            const response = await axios.get(`/api/getVenueDetail/${venue_id}`);
            setVenue(response.data);
        } catch (error) {
            console.error("Error fetching venue:", error);
        }
    };

    useEffect(() => {
        if (venue_id) {
            fetchVenue();
        }
    }, [venue_id]);

    const handleEdit = () => {
        setShowEditForm(true);
        setIsDropdownOpen(false);
    };

    const handleCloseEditForm = () => {
        setShowEditForm(false);
    };

    const handleCancel = async () => {
        setIsDropdownOpen(false);
        console.log("Cancel game:", id);
        try {
            const response = await axios.delete("/api/cancelGame", { data: { id } });
            toast.success("Game đã được hủy thành công!"); // Hiển thị toast thành công
            console.log(response.data.message);
            setTimeout(() => {
                window.location.reload(); // Reload trang sau khi hủy game
            }, 2000); // Reload trang sau 2 giây
        } catch (error) {
            console.error("Error:", error);
            toast.error(error.response?.data?.message || "Không thể hủy game"); // Hiển thị toast lỗi
        }
    };

    const handleViewDetails = () => {
        setShowDetail(true);
    };

    const handleCloseDetail = () => {
        setShowDetail(false);
    };

    return (
        <>
            <tr className="relative">
                <td className="whitespace-nowrap px-6 py-4 flex items-center gap-3">
                    <div>
                        <div className="font-medium text-gray-900">{venue.name}</div>
                        <div className="text-green-600">{court_number}</div>
                    </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-gray-900">{game_date}</div>
                    <div className="text-gray-500">
                        {start_time} - {end_time}
                    </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-gray-900">
                    {current_players}/{max_players}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-gray-900">
                    {skill_level_required}
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
                    <div className="relative">
                        <button
                            className="rounded-lg p-2 hover:bg-gray-100"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            <MoreVertical className="h-4 w-4 text-gray-400" />
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute left-2 mt-2 w-30 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                <button
                                    onClick={handleEdit}
                                    className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                                >
                                    <Edit className="h-4 w-4 mr-2 text-blue-500" />
                                    <span>Edit</span>
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                                >
                                    <X className="h-4 w-4 mr-2 text-red-500" />
                                    <span>Cancel</span>
                                </button>
                            </div>
                        )}
                    </div>
                </td>
                <td>
                {showDetail && (
                <Detail
                    onClose={handleCloseDetail}
                    venueName={venue.name}
                    venueLocation={venue.location}
                    creatorName={creator_name}
                    courtNumber={court_number}
                    gameDate={game_date}
                    startTime={start_time}
                    endTime={end_time}
                    currentPlayers={current_players}
                    maxPlayers={max_players}
                    skillLevelRequired={skill_level_required}
                />
            )}
            {showEditForm && (
                <EditForm
                    onClose={handleCloseEditForm}
                    id={id}
                    venue_id={venue_id}
                    creator_id={creator_id}
                    court_number={court_number}
                    game_date={game_date}
                    start_time={start_time}
                    end_time={end_time}
                    current_players={current_players}
                    max_players={max_players}
                    skill_level_required={skill_level_required}
                />
            )}
            <ToastContainer/>
                </td>
            </tr>
        </>
    );
}