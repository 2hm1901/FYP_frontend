import React from "react";
import { useVenueForm } from "../../../../hooks/useVenueForm";
import PriceSlot from "./PriceSlot";

export default function EditVenueForm({ venueData, onSave, onCancel }) {
  const {
    formData,
    errors,
    allTimeOptions,
    timeOptions,
    handleInputChange,
    handlePriceSlotChange,
    addPriceSlot,
    removePriceSlot,
    handleSubmit,
    onCancel: cancelHandler,
  } = useVenueForm(venueData.owner_id, onSave, onCancel, venueData);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Chỉnh sửa sân</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input type="hidden" name="owner_id" value={formData.owner_id} />

        <div>
          <label className="block text-sm font-medium text-gray-700">Tên sân</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
              errors.name ? "border-red-500" : "border-gray-300"
            } focus:ring-emerald-500`}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={`mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
              errors.phone ? "border-red-500" : "border-gray-300"
            } focus:ring-emerald-500`}
            maxLength="10"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Địa điểm</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className={`mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
              errors.location ? "border-red-500" : "border-gray-300"
            } focus:ring-emerald-500`}
          />
          {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Số lượng sân</label>
          <input
            type="number"
            name="court_count"
            value={formData.court_count}
            onChange={handleInputChange}
            className={`mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
              errors.court_count ? "border-red-500" : "border-gray-300"
            } focus:ring-emerald-500`}
            min="1"
          />
          {errors.court_count && <p className="text-red-500 text-xs mt-1">{errors.court_count}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Giờ mở cửa</label>
          <select
            name="open_time"
            value={formData.open_time}
            onChange={handleInputChange}
            className={`mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
              errors.open_time ? "border-red-500" : "border-gray-300"
            } focus:ring-emerald-500`}
          >
            {allTimeOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          {errors.open_time && <p className="text-red-500 text-xs mt-1">{errors.open_time}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Giờ đóng cửa</label>
          <select
            name="close_time"
            value={formData.close_time}
            onChange={handleInputChange}
            className={`mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
              errors.close_time ? "border-red-500" : "border-gray-300"
            } focus:ring-emerald-500`}
          >
            {allTimeOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          {errors.close_time && <p className="text-red-500 text-xs mt-1">{errors.close_time}</p>}
        </div>

        <div className="col-span-1 sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Giá sân</label>
          {formData.price_slots.map((slot, index) => (
            <PriceSlot
              key={index}
              slot={slot}
              index={index}
              timeOptions={timeOptions}
              errors={errors}
              handlePriceSlotChange={handlePriceSlotChange}
              removePriceSlot={removePriceSlot}
            />
          ))}
          {errors.price_slots && <p className="text-red-500 text-xs mt-1">{errors.price_slots}</p>}
          {formData.price_slots.map((_, index) => (
            <div key={index}>
              {errors[`price_slots[${index}].start_time`] && (
                <p className="text-red-500 text-xs mt-1">{errors[`price_slots[${index}].start_time`]}</p>
              )}
              {errors[`price_slots[${index}].end_time`] && (
                <p className="text-red-500 text-xs mt-1">{errors[`price_slots[${index}].end_time`]}</p>
              )}
              {errors[`price_slots[${index}].price`] && (
                <p className="text-red-500 text-xs mt-1">{errors[`price_slots[${index}].price`]}</p>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addPriceSlot}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors"
          >
            Thêm khoảng giá
          </button>
        </div>

        <div className="col-span-1 sm:col-span-2 flex justify-end space-x-3 mt-4">
          <button
            type="button"
            onClick={cancelHandler}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400 transition-colors"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg shadow-md hover:bg-emerald-600 transition-colors"
          >
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
}