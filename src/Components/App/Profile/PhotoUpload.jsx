import React, { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import { toast } from "react-toastify";

export default function PhotoUpload({ onPhotoChange, initialAvatar }) {
  const [photoPreview, setPhotoPreview] = useState(null);

  // Hiển thị avatar ban đầu từ user nếu có
  useEffect(() => {
    if (initialAvatar) {
      setPhotoPreview(`/api/avatar/${initialAvatar}`);
    }
  }, [initialAvatar]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        toast.error("Ảnh phải nhỏ hơn 1MB!");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        onPhotoChange(reader.result); // Truyền base64 lên parent
      };
      reader.readAsDataURL(file);
    }
  };

  return (
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
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}