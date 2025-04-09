import { React, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import SuccessDialog from "../Notification/SuccessDialog";
import { Eye, Upload } from "lucide-react";

export default function BookingConfirm() {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state?.bookingData || {};
    const [isOpen, setIsOpen] = useState(false);
    const [ownerBankInfo, setOwnerBankInfo] = useState(null);
    const [paymentImage, setPaymentImage] = useState(null);
    const [paymentImagePreview, setPaymentImagePreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchOwnerBankInfo = async () => {
            try {
                const response = await axios.get('/api/venue-owner', {
                    params: { venue_id: data.venue_id },
                });
                if (response.data.success) {
                    console.log("Owner bank info:", response.data.data.bankAccount);
                    setOwnerBankInfo(response.data.data.bankAccount);
                }
            } catch (error) {
                console.error("Error fetching owner bank info:", error);
            }
        };

        if (data.venue_id) {
            fetchOwnerBankInfo();
        }
    }, [data.venue_id]);

    const handlePaymentImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPaymentImagePreview(reader.result);
                setPaymentImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        if (!paymentImage) {
            alert("Vui lòng tải lên ảnh chuyển khoản trước khi xác nhận!");
            return;
        }

        setIsLoading(true);
        try {
            console.log("Booking data:", { ...data, payment_image: paymentImage });
            const response = await axios.post('/api/bookCourt', { ...data, payment_image: paymentImage });

            if (response.status === 201) {
                console.log("Booking court successful:", response.data);
                setIsOpen(true); 
            } else {
                console.error("Unexpected response:", response);
            }
        } catch (error) {
            console.error("Error booking court:", error);
            alert("Có lỗi xảy ra khi đặt sân. Vui lòng thử lại!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mt-5 mb-5 mx-auto p-6 space-y-8 border border-gray-300 rounded-md shadow-md">
            {/* Order Confirmation Section */}
            <section className="text-center pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold">Xác nhận thông tin</h1>
                <p className="text-gray-600 mt-2">
                    Cảm ơn bạn đã đặt sân!
                    <span className="font-bold text-green-600"> {data.venue_name} </span>
                    rất vui khi được tiếp đón các bạn đến chơi.
                </p>

            </section>

            {/* Booking Details Section */}
            <section className="pb-4 border-b border-gray-300">
                <h2 className="text-xl font-semibold mb-4">Thông tin đặt sân</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <h3 className="text-sm font-medium text-gray-600 mb-1">Sân đã đặt</h3>
                        {data.courts_booked?.map((court, index) => (
                            <p key={index} className="text-gray-700">{court.court_number}</p>
                        ))}
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-600 mb-1">Ngày đặt</h3>
                        {data.courts_booked?.map((court, index) => (
                            <p key={index} className="text-gray-700">{data.booking_date}</p>
                        ))}
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-600 mb-1">Khung giờ</h3>
                        {data.courts_booked?.map((court, index) => (
                            <p key={index} className="text-gray-700">{court.start_time} → {court.end_time}</p>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Information Section */}
            <section className="pb-4 border-b border-gray-300">
                <h2 className="text-xl font-semibold mb-4">Thông tin người đặt</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <h3 className="text-sm font-medium text-gray-600 mb-1">Tên</h3>
                        <p className="text-gray-700">{data.renter_name}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-600 mb-1">Email</h3>
                        <p className="text-gray-700">{data.renter_email}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-600 mb-1">Số điện thoại</h3>
                        <p className="text-gray-700">{data.renter_phone}</p>
                    </div>
                </div>
            </section>

            {/* Payment Information Section */}
            <section className="pb-4 border-b border-gray-300">
                <h2 className="text-xl font-semibold mb-4">Thông tin thanh toán</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-sm font-medium text-gray-600 mb-1">Tổng tiền:</h3>
                        <p className="text-emerald-600 font-bold text-xl">{data.total_price} VNĐ</p>
                    </div>
                    
                    {ownerBankInfo && (
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-gray-600">Thông tin chuyển khoản:</h3>
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                        <div>
                                            <p className="text-sm text-gray-500">Số tài khoản</p>
                                            <p className="font-medium text-gray-900">{ownerBankInfo.account_number}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        <div>
                                            <p className="text-sm text-gray-500">Ngân hàng</p>
                                            <p className="font-medium text-gray-900">{ownerBankInfo.bank_name}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                {ownerBankInfo.qr_code && (
                                    <div className="mt-6 pt-6 border-t border-gray-200">
                                        <p className="text-sm text-gray-500 mb-3">Quét mã QR để thanh toán:</p>
                                        <div className="bg-white p-4 rounded-lg inline-block">
                                            <img 
                                                src={`/api/qr_codes/${ownerBankInfo.qr_code}`} 
                                                alt="QR Code" 
                                                className="w-48 h-48 object-contain"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Payment Image Upload Section */}
            <section className="pb-4 border-b border-gray-300">
                <h2 className="text-xl font-semibold mb-4">Xác nhận thanh toán</h2>
                <div className="space-y-4">
                    <p className="text-gray-600">
                        Vui lòng tải lên ảnh chụp màn hình hoặc ảnh chuyển khoản để xác nhận thanh toán.
                    </p>
                    
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                        <div className="space-y-1 text-center">
                            {paymentImagePreview ? (
                                <div className="mb-4">
                                    <img 
                                        src={paymentImagePreview} 
                                        alt="Payment Image Preview" 
                                        className="mx-auto h-48 w-auto object-contain"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setPaymentImagePreview(null);
                                            setPaymentImage(null);
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
                                            htmlFor="payment_image_file"
                                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                        >
                                            <span>Tải lên ảnh</span>
                                            <input
                                                id="payment_image_file"
                                                name="payment_image_file"
                                                type="file"
                                                className="sr-only"
                                                accept="image/*"
                                                onChange={handlePaymentImageChange}
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
            </section>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-8">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors flex items-center gap-2">
                    <span className="sr-only">Go back</span>
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    Back
                </button>
                <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isLoading || !paymentImage}
                    className={`px-6 py-2 bg-gray-900 text-white rounded-md transition-colors flex items-center gap-2 ${
                        isLoading || !paymentImage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
                    }`}>
                    {isLoading ? 'Đang xử lý...' : 'Xác nhận đặt sân'}
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            </div>
            <SuccessDialog
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onConfirm={() => navigate("/")}
                message="Cảm ơn bạn đã đặt sân! Hẹn gặp bạn tại sân cầu lông."
            />
        </div>
    );
}