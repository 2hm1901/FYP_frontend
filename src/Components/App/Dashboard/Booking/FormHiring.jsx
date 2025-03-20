import React, { useState } from "react";
import { Range } from "react-range";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FormHiring({
  onClose,
  id,
  venue_id,
  creator_id,
  court,
  date,
  start_time,
  end_time,
}) {
  const [currentPlayers, setCurrentPlayers] = useState(1);
  const [maxPlayers, setMaxPlayers] = useState(8);
  const [skillRange, setSkillRange] = useState([0, 1]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCurrentPlayersChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setCurrentPlayers(value || "");
    setError("");
    if (!value || value === "") {
      setError("Vui lòng nhập số lượng người chơi hiện tại.");
    }
    if (value > maxPlayers) {
      setError("Số lượng người chơi hiện tại không được vượt quá " + maxPlayers);
    }
  };

  const handleMaxPlayersChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= currentPlayers) {
      setMaxPlayers(value);
    }
    if (maxPlayers >= currentPlayers) {
      setError("");
    }
  };

  const skillLevels = ["Newbie", "Yếu", "TBY", "TB-", "TB", "TB+", "TB++", "Khá"];

  const getSelectedSkills = () => {
    const [min, max] = skillRange;
    return skillLevels.slice(min, max + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error || currentPlayers === "" || currentPlayers > maxPlayers) {
      setError("Vui lòng kiểm tra lại thông tin đã nhập");
      return;
    }

    setIsSubmitting(true);

    const formData = {
      id,
      venue_id,
      creator_id,
      court_number: court,
      game_date: date,
      start_time,
      end_time,
      current_players: String(currentPlayers),
      max_players: String(maxPlayers),
      skill_levels: getSelectedSkills(),
    };

    try {
      const response = await axios.post("/api/createGame", formData);
      toast.success("Game đã được tạo thành công!"); // Hiển thị toast thành công
      setTimeout(() => {
        onClose(); // Đóng form sau 2 giây
        window.location.reload(); // Tải lại trang
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Không thể tạo game"); // Hiển thị toast lỗi
      setError(error.response?.data?.message || "Không thể gửi dữ liệu");
    } finally {
      setIsSubmitting(false); // Đặt lại trạng thái submit
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Form Hiring</h2>
          <button
            className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-all duration-200"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="venue_id" value={venue_id} />
          <input type="hidden" name="creator_id" value={creator_id} />

          {/* Các field khác giữ nguyên */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Court</label>
            <input
              type="text"
              name="court"
              value={court}
              readOnly
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="text"
              name="date"
              value={date}
              readOnly
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Start Time</label>
              <input
                type="text"
                name="start_time"
                value={start_time}
                readOnly
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">End Time</label>
              <input
                type="text"
                name="end_time"
                value={end_time}
                readOnly
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Current Players</label>
            <input
              type="number"
              name="current_players"
              value={currentPlayers}
              onChange={handleCurrentPlayersChange}
              min="1"
              max="8"
              className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 ${
                error ? "border-red-500" : "border-gray-300"
              }`}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Max Players</label>
            <input
              type="number"
              name="max_players"
              value={maxPlayers}
              onChange={handleMaxPlayersChange}
              min={currentPlayers}
              max="8"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400"
            />
          </div>

          {/* Skill Level với multi-range slider */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Skill Level Range</label>
            <div className="px-4">
              <Range
                step={1}
                min={0}
                max={skillLevels.length - 1}
                values={skillRange}
                onChange={(values) => setSkillRange(values)}
                renderTrack={({ props, children }) => {
                  const { key, ...restProps } = props;
                  return (
                    <div
                      key={key}
                      {...restProps}
                      className="h-1 w-full bg-gray-200 rounded-full"
                    >
                      <div
                        className="absolute h-1 bg-blue-500 rounded-full"
                        style={{
                          left: `${(skillRange[0] / (skillLevels.length - 1)) * 100}%`,
                          width: `${((skillRange[1] - skillRange[0]) / (skillLevels.length - 1)) * 100}%`,
                        }}
                      />
                      {children}
                    </div>
                  );
                }}
                renderThumb={({ props, index }) => {
                  const { key, ...restProps } = props;
                  return (
                    <div
                      key={key}
                      {...restProps}
                      className="h-4 w-4 bg-blue-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  );
                }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              {skillLevels.map((level, index) => (
                <span
                  key={index}
                  className={
                    skillRange[0] <= index && index <= skillRange[1]
                      ? "text-blue-600 font-medium"
                      : ""
                  }
                >
                  {level}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              Selected: {getSelectedSkills().join(", ")}
            </p>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 bg-blue-600 text-white rounded-lg focus:ring-4 focus:ring-blue-200 focus:outline-none transition-all duration-200 font-medium ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? "Đang gửi..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}