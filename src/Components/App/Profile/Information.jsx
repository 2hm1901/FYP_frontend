import React, { useContext, useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import axios from "axios";
import { AppContext } from "../../../Context/AppContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Information({ handleFileChange }) {
  const { user, token, setUser } = useContext(AppContext);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone_number: "",
    skill_level: "",
    avatar: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Đồng bộ formData với user
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
        skill_level: user.skill_level || "",
        avatar: user.avatar || "",
      });
      setPhotoPreview(`http://localhost:8000${user.avatar}`);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      console.log(formData);
      const response = await axios.put("/api/updateProfile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.user);
      toast.success("Thông tin đã được cập nhật thành công!");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Không thể cập nhật thông tin");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-xl bg-gray-50 p-8">
      {/* Photo Upload Section */}
      <div className="mb-10 flex justify-center">
        <div className="relative mx-auto mb-4 h-[200px] w-[200px] group">
          <label htmlFor="photo-upload" className="cursor-pointer">
            <div className="flex h-full w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-white p-4 transition-all duration-300 group-hover:border-indigo-400 group-hover:shadow-lg">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Profile preview"
                  className="h-full w-full object-contain rounded-xl"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-400">
                  <svg
                    className="mb-3 h-16 w-16 transition-colors duration-300 group-hover:text-indigo-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="text-gray-500 font-medium transition-colors duration-300 group-hover:text-indigo-600">
                    Upload Photo
                  </span>
                </div>
              )}
            </div>
            <div className="absolute -right-2 -top-2 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500 text-white shadow-md transform transition-transform duration-300 group-hover:scale-110">
              <Pencil className="h-5 w-5" />
            </div>
          </label>
          <input
            id="photo-upload"
            type="file"
            accept="image/jpeg,image/png,image/svg+xml"
            className="hidden"
            onChange={(e) => {
              handleFileChange(e);
              const file = e.target.files?.[0];
              if (file) {
                if (file.size > 1024 * 1024) {
                  toast.error("Ảnh phải nhỏ hơn 1MB!");
                  return;
                }
                const reader = new FileReader();
                reader.onloadend = () => {
                  setPhotoPreview(reader.result);
                  setFormData((prevData) => ({
                    ...prevData,
                    avatar: reader.result,
                  }));
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>
      </div>
      <p className="text-center text-sm text-gray-600 font-medium">
        Tải lên ảnh có kích thước tối thiểu là 150 × 150 pixel (JPG, PNG, SVG).
      </p>

      {/* Form Fields */}
      <div className="grid gap-6 md:grid-cols-2 mt-8">
        <div className="flex flex-col">
          <label htmlFor="username" className="mb-2 font-semibold text-gray-700">
            Tên
          </label>
          <input
            type="text"
            id="username"
            placeholder="Nhập tên của bạn"
            value={formData.username}
            onChange={handleInputChange}
            className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-300"
          />
        </div>
        {/* Các field khác giữ nguyên */}
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 font-semibold text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Nhập địa chỉ email"
            value={formData.email}
            onChange={handleInputChange}
            className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-300"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="phone_number" className="mb-2 font-semibold text-gray-700">
            Số điện thoại
          </label>
          <input
            type="tel"
            id="phone_number"
            placeholder="Nhập số điện thoại"
            value={formData.phone_number}
            onChange={handleInputChange}
            className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-300"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="skill_level" className="mb-2 font-semibold text-gray-700">
            Trình độ
          </label>
          <select
            id="skill_level"
            value={formData.skill_level}
            onChange={handleInputChange}
            className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-300"
          >
            <option value="">Trình độ của bạn?</option>
            <option value="Newbie">Newbie</option>
            <option value="Yếu">Yếu</option>
            <option value="TBY">TBY</option>
            <option value="TB-">TB-</option>
            <option value="TB">TB</option>
            <option value="TB+">TB+</option>
            <option value="TB++">TB++</option>
            <option value="Khá">Khá</option>
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-10 flex justify-end space-x-4">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`rounded-xl bg-indigo-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-indigo-600 hover:shadow-lg transform hover:-translate-y-0.5 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isLoading ? "Saving..." : "Save Change"}
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}