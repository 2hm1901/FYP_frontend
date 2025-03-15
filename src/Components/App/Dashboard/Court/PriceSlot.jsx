import React from "react";

const PriceSlot = ({ slot, index, timeOptions, errors, handlePriceSlotChange, removePriceSlot }) => {
  return (
    <div className="flex items-center space-x-2 mt-2">
      <select
        name={`start_time_${index}`}
        value={slot.start_time}
        onChange={(e) => handlePriceSlotChange(index, "start_time", e.target.value)}
        className={`p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
          errors[`price_slots[${index}].start_time`] ? "border-red-500" : "border-gray-300"
        } focus:ring-emerald-500`}
      >
        {timeOptions.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>
      <span>-</span>
      <select
        name={`end_time_${index}`}
        value={slot.end_time}
        onChange={(e) => handlePriceSlotChange(index, "end_time", e.target.value)}
        className={`p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
          errors[`price_slots[${index}].end_time`] ? "border-red-500" : "border-gray-300"
        } focus:ring-emerald-500`}
      >
        {timeOptions.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>
      <input
        type="number"
        name={`price_${index}`}
        value={slot.price}
        onChange={(e) => handlePriceSlotChange(index, "price", e.target.value)}
        className={`p-2 w-24 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
          errors[`price_slots[${index}].price`] ? "border-red-500" : "border-gray-300"
        } focus:ring-emerald-500`}
        placeholder="Giá"
        min="1"
      />
      <button
        type="button"
        onClick={() => removePriceSlot(index)}
        className="px-2 py-1 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600"
      >
        Xóa
      </button>
    </div>
  );
};

export default PriceSlot;