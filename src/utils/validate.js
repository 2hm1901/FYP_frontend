export const validateVenueForm = (formData) => {
    const newErrors = {};
  
    // Kiểm tra các trường cơ bản
    if (!formData.name.trim()) newErrors.name = "Tên sân không được để trống";
    if (!formData.phone.trim()) newErrors.phone = "Số điện thoại không được để trống";
    if (!formData.location.trim()) newErrors.location = "Địa điểm không được để trống";
    if (!formData.court_count || parseInt(formData.court_count) <= 0) {
      newErrors.court_count = "Số lượng sân phải lớn hơn 0";
    }
    if (!formData.open_time) newErrors.open_time = "Giờ mở cửa không được để trống";
    if (!formData.close_time) newErrors.close_time = "Giờ đóng cửa không được để trống";
  
    if (formData.open_time && formData.close_time) {
      const openTime = new Date(`1970-01-01T${formData.open_time}:00`);
      const closeTime = new Date(`1970-01-01T${formData.close_time}:00`);
      if (openTime >= closeTime) {
        newErrors.close_time = "Giờ đóng cửa phải sau giờ mở cửa";
      }
    }
  
    // Kiểm tra price_slots
    if (formData.price_slots.length === 0) {
      newErrors.price_slots = "Phải có ít nhất một khoảng giá";
    } else {
      formData.price_slots.forEach((slot, index) => {
        if (!slot.start_time) newErrors[`price_slots[${index}].start_time`] = "Giờ bắt đầu không được để trống";
        if (!slot.end_time) newErrors[`price_slots[${index}].end_time`] = "Giờ kết thúc không được để trống";
        if (!slot.price || parseFloat(slot.price) <= 0) {
          newErrors[`price_slots[${index}].price`] = "Giá phải lớn hơn 0";
        }
        if (slot.start_time && slot.end_time) {
          const start = new Date(`1970-01-01T${slot.start_time}:00`);
          const end = new Date(`1970-01-01T${slot.end_time}:00`);
          if (start >= end) {
            newErrors[`price_slots[${index}].end_time`] = "Giờ kết thúc phải sau giờ bắt đầu";
          }
        }
      });
  
      // Kiểm tra trùng lặp
      for (let i = 0; i < formData.price_slots.length; i++) {
        for (let j = i + 1; j < formData.price_slots.length; j++) {
          const slot1 = formData.price_slots[i];
          const slot2 = formData.price_slots[j];
          const start1 = new Date(`1970-01-01T${slot1.start_time}:00`);
          const end1 = new Date(`1970-01-01T${slot1.end_time}:00`);
          const start2 = new Date(`1970-01-01T${slot2.start_time}:00`);
          const end2 = new Date(`1970-01-01T${slot2.end_time}:00`);
          if (start1 < end2 && start2 < end1) {
            newErrors.price_slots = "Các khoảng thời gian không được trùng lặp";
          }
        }
      }
  
      // Kiểm tra phủ kín từ open_time đến close_time
      if (formData.open_time && formData.close_time && formData.price_slots.length > 0) {
        const openTime = new Date(`1970-01-01T${formData.open_time}:00`).getTime();
        const closeTime = new Date(`1970-01-01T${formData.close_time}:00`).getTime();
        const sortedSlots = [...formData.price_slots].sort((a, b) =>
          new Date(`1970-01-01T${a.start_time}:00`) - new Date(`1970-01-01T${b.start_time}:00`)
        );
  
        const firstSlotStart = new Date(`1970-01-01T${sortedSlots[0].start_time}:00`).getTime();
        if (firstSlotStart > openTime) {
          newErrors.price_slots = `Chưa set giá từ ${formData.open_time} đến ${sortedSlots[0].start_time}`;
        }
  
        for (let i = 0; i < sortedSlots.length - 1; i++) {
          const currentEnd = new Date(`1970-01-01T${sortedSlots[i].end_time}:00`).getTime();
          const nextStart = new Date(`1970-01-01T${sortedSlots[i + 1].start_time}:00`).getTime();
          if (currentEnd < nextStart) {
            newErrors.price_slots = `Chưa set giá từ ${sortedSlots[i].end_time} đến ${sortedSlots[i + 1].start_time}`;
          }
        }
  
        const lastSlotEnd = new Date(`1970-01-01T${sortedSlots[sortedSlots.length - 1].end_time}:00`).getTime();
        if (lastSlotEnd < closeTime) {
          newErrors.price_slots = `Chưa set giá từ ${sortedSlots[sortedSlots.length - 1].end_time} đến ${formData.close_time}`;
        }
      }
    }
  
    return newErrors;
  };