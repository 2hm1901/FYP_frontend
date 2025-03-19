import React from "react";

export default function ProfileForm({ formData, errors, handleInputChange }) {
  return (
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
          className={`rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-300 ${errors.username ? "border-red-500" : ""}`}
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-500">{errors.username}</p>
        )}
      </div>
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
          className={`rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-300 ${errors.email ? "border-red-500" : ""}`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="phone_number" className="mb-2 font-semibold text-gray-700">
          Số điện thoại
        </label>
        <input
          type="tel"
          id="phone_number"
          placeholder="Nhập số điện thoại (VD: 0912345678)"
          value={formData.phone_number}
          onChange={handleInputChange}
          className={`rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-300 ${errors.phone_number ? "border-red-500" : ""}`}
        />
        {errors.phone_number && (
          <p className="mt-1 text-sm text-red-500">{errors.phone_number}</p>
        )}
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
  );
}