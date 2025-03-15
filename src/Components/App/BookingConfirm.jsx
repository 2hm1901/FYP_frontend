import { React, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import SuccessDialog from "../Notification/SuccessDialog";

export default function BookingConfirm() {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state?.bookingData || {};
    const [isOpen, setIsOpen] = useState(false);


    const handleSubmit = async () => {
        try {
            console.log("Booking data:", data);
            const response = await axios.post('/api/bookCourt', data);

            if (response.status === 201) {
                console.log("Booking court successful:", response.data);
                setIsOpen(true); 
            } else {
                console.error("Unexpected response:", response);
            }
        } catch (error) {
            console.error("Error booking court:", error);
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <h3 className="text-sm font-medium text-gray-600 mb-1">Tổng tiền:</h3>
                        <p className="text-emerald-600">{data.total_price} VNĐ</p>
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
                    className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors flex items-center gap-2">
                    Next
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