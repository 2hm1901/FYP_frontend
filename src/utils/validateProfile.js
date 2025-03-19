export const validateUsername = (value) => {
    const usernameRegex = /^[a-zA-Z0-9\s]{3,}$/;
    if (value && !usernameRegex.test(value)) {
      return "Tên phải có ít nhất 3 ký tự, chỉ chứa chữ cái, số và khoảng trắng";
    }
    return "";
  };
  
  export const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
      return "Email không hợp lệ (VD: example@domain.com)";
    }
    return "";
  };
  
  export const validatePhoneNumber = (value) => {
    const phoneRegex = /^(03|05|07|08|09)[0-9]{8}$/;
    if (value && !phoneRegex.test(value)) {
      return "Số điện thoại phải là số Việt Nam hợp lệ (10 chữ số, bắt đầu bằng 03, 05, 07, 08, 09)";
    }
    return "";
  };