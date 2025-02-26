
import { React, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";

export default function BookingInfoRenter() {
    const { user } = useContext(AppContext);
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state?.bookingData || {};

    const [bookingData, setBookingData] = useState({
        ...data,
        renter_name: "",
        renter_email: "",
        renter_phone: "",
        note: "",
    });

    useEffect(() => {
        if (user) {
            setBookingData(prev => ({
                ...prev,
                renter_name: user.username || "",
                renter_email: user.email || "",
                renter_phone: user.phone || "",
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        setBookingData({ ...bookingData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(bookingData);
        navigate('/BookingConfirm', { state: { bookingData } });
    }

    return (
        <div className="w-full max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-8">Nhập thông tin người đặt</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                        Tên
                    </label>
                    <input
                        type="text"
                        id="renter_name"
                        name="renter_name"
                        placeholder="Enter Name"
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md text-gray-600 placeholder-gray-400"
                        value={bookingData.renter_name}
                        onChange={handleChange}
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                        Email
                    </label>
                    <input
                        type="email"
                        id="renter_email"
                        name="renter_email"
                        placeholder="Enter Email Address"
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md text-gray-600 placeholder-gray-400"
                        value={bookingData.renter_email}
                        onChange={handleChange}
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-900">
                        Số điện thoại
                    </label>
                    <input
                        type="tel"
                        id="renter_phone"
                        name="renter_phone"
                        placeholder="Enter Phone Number"
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md text-gray-600 placeholder-gray-400"
                        value={bookingData.renter_phone}
                        onChange={handleChange}
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="details" className="block text-sm font-medium text-gray-900">
                        Ghi chú
                    </label>
                    <textarea
                        id="note"
                        name="note"
                        placeholder="Enter Comments"
                        rows={4}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md text-gray-600 placeholder-gray-400 resize-none"
                        value={bookingData.note}
                        onChange={handleChange}
                    />
                </div>

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
                        type="submit" className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors flex items-center gap-2">
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
            </form>
        </div>
    )
}

