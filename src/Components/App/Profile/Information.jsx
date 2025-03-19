import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../Context/AppContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhotoUpload from "./PhotoUpload";
import ProfileForm from "./ProfileForm";
import { validateUsername, validateEmail, validatePhoneNumber } from "../../../utils/validateProfile";
import { useProfileUpdate } from "../../../hooks/useProfileUpdate";

export default function Information() {
  const { user, token, setUser } = useContext(AppContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone_number: "",
    skill_level: "",
    avatar: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    phone_number: "",
  });

  const { handleSubmit, isLoading } = useProfileUpdate(token, setUser);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
        skill_level: user.skill_level || "",
        avatar: user.avatar || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      username: id === "username" ? validateUsername(value) : prev.username,
      email: id === "email" ? validateEmail(value) : prev.email,
      phone_number: id === "phone_number" ? validatePhoneNumber(value) : prev.phone_number,
    }));
  };

  const handlePhotoChange = (base64) => {
    setFormData((prevData) => ({
      ...prevData,
      avatar: base64,
    }));
  };

  return (
    <div className="rounded-xl bg-gray-50 p-8">
      <PhotoUpload
        onPhotoChange={handlePhotoChange}
        initialAvatar={user?.avatar} // Truyền avatar ban đầu
      />
      <p className="text-center text-sm text-gray-600 font-medium">
        Tải lên ảnh có kích thước tối thiểu là 150 × 150 pixel (JPG, PNG, SVG).
      </p>

      <ProfileForm
        formData={formData}
        errors={errors}
        handleInputChange={handleInputChange}
      />

      <div className="mt-10 flex justify-end space-x-4">
        <button
          onClick={() => handleSubmit(formData, errors)}
          disabled={isLoading || errors.username || errors.email || errors.phone_number}
          className={`rounded-xl bg-indigo-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-indigo-600 hover:shadow-lg transform hover:-translate-y-0.5 ${isLoading || errors.username || errors.email || errors.phone_number ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isLoading ? "Saving..." : "Save Change"}
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}