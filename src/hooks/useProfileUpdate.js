import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const useProfileUpdate = (token, setUser) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData, errors) => {
    if (!token) return;

    if (errors.username || errors.email || errors.phone_number) {
      toast.error("Vui lòng sửa các lỗi trước khi gửi!");
      return;
    }

    if (!formData.username || !formData.email) {
      toast.error("Tên và email là bắt buộc!");
      return;
    }

    setIsLoading(true);
    const submitData = {
      username: formData.username,
      email: formData.email,
      phone_number: formData.phone_number,
      skill_level: formData.skill_level,
    };

    if (formData.avatar && formData.avatar.startsWith("data:image")) {
      submitData.avatar = formData.avatar;
    }

    try {
      console.log(submitData);
      const response = await axios.put("/api/updateProfile", submitData, {
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

  return { handleSubmit, isLoading };
};