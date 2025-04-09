import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../Context/AppContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhotoUpload from "./PhotoUpload";
import ProfileForm from "./ProfileForm";
import { validateUsername, validateEmail, validatePhoneNumber } from "../../../utils/validateProfile";
import { useProfileUpdate } from "../../../hooks/useProfileUpdate";
import { CreditCard, Building, QrCode } from "lucide-react";
import axios from "axios";

export default function Information() {
  const { user, token, setUser } = useContext(AppContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone_number: "",
    skill_level: "",
    avatar: "",
    account_number: "",
    bank_name: "",
    qr_code: null,
    user_type: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    phone_number: "",
    account_number: "",
    bank_name: "",
  });
  const [qrCodePreview, setQrCodePreview] = useState(null);
  const [hasBankInfo, setHasBankInfo] = useState(false);
  const [bankInfo, setBankInfo] = useState(null);
  const [isLoadingBankInfo, setIsLoadingBankInfo] = useState(false);

  const { handleSubmit, isLoading } = useProfileUpdate(token, setUser);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
        skill_level: user.skill_level || "",
        avatar: user.avatar || "",
        account_number: "",
        bank_name: "",
        qr_code: null,
        user_type: user.user_type || "",
      });
      
      // Lấy thông tin ngân hàng từ API nếu user là owner
      if (user.user_type === "owner") {
        fetchBankInfo();
      }
    }
  }, [user]);

  const fetchBankInfo = async () => {
    if (!user || user.user_type !== "owner") return;
    
    setIsLoadingBankInfo(true);
    try {
      const response = await axios.get(`/api/bank-account/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.data && response.data.success && response.data.bankAccount) {
        const bankAccount = response.data.bankAccount;
        setBankInfo(bankAccount);
        setHasBankInfo(true);
        
        // Cập nhật formData với thông tin ngân hàng
        setFormData(prev => ({
          ...prev,
          account_number: bankAccount.account_number || "",
          bank_name: bankAccount.bank_name || "",
        }));
        
        // Hiển thị QR code nếu có
        if (bankAccount.qr_code) {
          setQrCodePreview(`/api/qr_codes/${bankAccount.qr_code}`);
        }
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin ngân hàng:", error);
    } finally {
      setIsLoadingBankInfo(false);
    }
  };

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
      account_number: id === "account_number" ? (value ? "" : "Vui lòng nhập số tài khoản") : prev.account_number,
      bank_name: id === "bank_name" ? (value ? "" : "Vui lòng nhập tên ngân hàng") : prev.bank_name,
    }));
  };

  const handlePhotoChange = (base64) => {
    setFormData((prevData) => ({
      ...prevData,
      avatar: base64,
    }));
  };

  const handleQrCodeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setQrCodePreview(reader.result);
        setFormData((prevData) => ({
          ...prevData,
          qr_code: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
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

      {/* Bank Account Information - Only for owners */}
      {user?.user_type === "owner" && (
        <div className="mt-8 border-t border-gray-200 pt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Thông tin ngân hàng</h3>

          
          <h4 className="text-lg font-medium text-gray-800 mb-4">{hasBankInfo ? "Cập nhật thông tin ngân hàng" : "Thêm thông tin ngân hàng"}</h4>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col">
              <label htmlFor="account_number" className="mb-2 font-semibold text-gray-700 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-indigo-500" />
                Số tài khoản
              </label>
              <input
                type="text"
                id="account_number"
                placeholder="Nhập số tài khoản ngân hàng"
                value={formData.account_number}
                onChange={handleInputChange}
                className={`rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-300 ${errors.account_number ? "border-red-500" : ""}`}
              />
              {errors.account_number && (
                <p className="mt-1 text-sm text-red-500">{errors.account_number}</p>
              )}
            </div>
            
            <div className="flex flex-col">
              <label htmlFor="bank_name" className="mb-2 font-semibold text-gray-700 flex items-center gap-2">
                <Building className="h-5 w-5 text-indigo-500" />
                Tên ngân hàng
              </label>
              <input
                type="text"
                id="bank_name"
                placeholder="Nhập tên ngân hàng"
                value={formData.bank_name}
                onChange={handleInputChange}
                className={`rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-300 ${errors.bank_name ? "border-red-500" : ""}`}
              />
              {errors.bank_name && (
                <p className="mt-1 text-sm text-red-500">{errors.bank_name}</p>
              )}
            </div>
          </div>
          
          <div className="mt-6">
            <label className="mb-2 font-semibold text-gray-700 flex items-center gap-2">
              <QrCode className="h-5 w-5 text-indigo-500" />
              Mã QR thanh toán
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                {qrCodePreview ? (
                  <div className="mb-4">
                    <img 
                      src={qrCodePreview} 
                      alt="QR Code Preview" 
                      className="mx-auto h-32 w-32 object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setQrCodePreview(null);
                        setFormData({ ...formData, qr_code: null });
                      }}
                      className="mt-2 text-sm text-red-600 hover:text-red-800"
                    >
                      Xóa ảnh
                    </button>
                  </div>
                ) : (
                  <>
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="qr_code_file"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Tải lên ảnh</span>
                        <input
                          id="qr_code_file"
                          name="qr_code_file"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleQrCodeChange}
                        />
                      </label>
                      <p className="pl-1">hoặc kéo thả</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF lên đến 10MB</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-10 flex justify-end space-x-4">
        <button
          onClick={() => handleSubmit(formData, errors)}
          disabled={isLoading || errors.username || errors.email || errors.phone_number || (user?.user_type === "owner" && (errors.account_number || errors.bank_name))}
          className={`rounded-xl bg-indigo-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-indigo-600 hover:shadow-lg transform hover:-translate-y-0.5 ${isLoading || errors.username || errors.email || errors.phone_number || (user?.user_type === "owner" && (errors.account_number || errors.bank_name)) ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isLoading ? "Saving..." : "Save Change"}
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}