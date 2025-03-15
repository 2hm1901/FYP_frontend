import { useState } from "react";
import axios from "axios";
import { validateVenueForm } from "../utils/validate";

export const useVenueForm = (userId, onSave, onCancel, initialData = null) => {
  const [formData, setFormData] = useState(
    initialData
      ? {
          ...initialData,
          price_slots: initialData.courtPrices?.[0]?.price_slots || [], // Lấy từ courtPrices
        }
      : {
          owner_id: userId || "",
          name: "",
          phone: "",
          location: "",
          court_count: "",
          open_time: "05:00",
          close_time: "23:00",
          price_slots: [],
        }
  );
  const [errors, setErrors] = useState({});

  const allTimeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    const hourStr = hour.toString().padStart(2, "0");
    allTimeOptions.push(`${hourStr}:00`);
    allTimeOptions.push(`${hourStr}:30`);
  }

  const getFilteredTimeOptions = () => {
    const openTime = new Date(`1970-01-01T${formData.open_time}:00`);
    const closeTime = new Date(`1970-01-01T${formData.close_time}:00`);
    return allTimeOptions.filter((time) => {
      const currentTime = new Date(`1970-01-01T${time}:00`);
      return currentTime >= openTime && currentTime <= closeTime;
    });
  };

  const timeOptions = getFilteredTimeOptions();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePriceSlotChange = (index, field, value) => {
    const updatedPriceSlots = [...formData.price_slots];
    updatedPriceSlots[index] = {
      ...updatedPriceSlots[index],
      [field]: field === "price" ? parseInt(value) || "" : value,
    };
    setFormData((prev) => ({ ...prev, price_slots: updatedPriceSlots }));
    setErrors((prev) => ({ ...prev, price_slots: "" }));
  };

  const addPriceSlot = () => {
    const defaultStart = formData.open_time;
    const defaultEnd = timeOptions[timeOptions.indexOf(defaultStart) + 1] || formData.close_time;
    setFormData((prev) => ({
      ...prev,
      price_slots: [...prev.price_slots, { start_time: defaultStart, end_time: defaultEnd, price: "" }],
    }));
  };

  const removePriceSlot = (index) => {
    const updatedPriceSlots = formData.price_slots.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, price_slots: updatedPriceSlots }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateVenueForm(formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const submitData = {
      ...formData,
      court_count: parseInt(formData.court_count),
      price_slots: formData.price_slots.map((slot) => ({
        ...slot,
        price: parseInt(slot.price),
      })),
    };

    try {
      const url = initialData ? `/api/venues/${initialData.id}` : "/api/createNewVenue";
      const method = initialData ? "put" : "post";
      const response = await axios({
        method,
        url,
        data: submitData,
      });
      onSave(response.data);
      if (!initialData) {
        setFormData({
          owner_id: userId || "",
          name: "",
          phone: "",
          location: "",
          court_count: "",
          open_time: "05:00",
          close_time: "23:00",
          price_slots: [],
        });
      }
      setErrors({});
    } catch (error) {
      console.error("Error saving venue:", error);
      alert("Có lỗi khi lưu sân!");
    }
  };

  return {
    formData,
    errors,
    allTimeOptions,
    timeOptions,
    handleInputChange,
    handlePriceSlotChange,
    addPriceSlot,
    removePriceSlot,
    handleSubmit,
    onCancel,
  };
};