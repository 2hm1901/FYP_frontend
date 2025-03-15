import React, { useState, useEffect, useContext } from "react";
import Layout from '../../../../../Layouts/Layout';
import Nav from '../../../../../Components/App/Dashboard/Nav';
import Pagination from "../../../../../Components/App/Dashboard/Booking/Pagination";
import Table from "../../../../../Components/App/Dashboard/Request/Table";
import axios from "axios";
import { AppContext } from "../../../../../Context/AppContext";

export default function BookedCourt() {
    const { user } = useContext(AppContext);
    const [bookings, setBookings] = useState([]); // Khởi tạo mảng rỗng
    const [isLoading, setIsLoading] = useState(true); // Trạng thái loading

    useEffect(() => {
        if (user) {
            fetchBookings();
        }
    }, [user]);

    const fetchBookings = async () => {
        setIsLoading(true); // Bắt đầu loading
        try {
            const response = await axios.get(`/api/getRequests`, {
                params: { user_id: user?.id }
            });
            const fetchedBookings = response.data.data || [];
            setBookings(fetchedBookings);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            setBookings([]); // Reset về mảng rỗng nếu lỗi
        } finally {
            setIsLoading(false); // Kết thúc loading
        }
    };

    return (
        <Layout>
            <Nav />
            <div className="min-h-screen bg-gray-50/50 p-8">
                <div className="rounded-xl bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Yêu cầu đặt sân</h1>
                            <p className="text-gray-500">Các yêu cầu đặt sân</p>
                        </div>
                    </div>
                    {isLoading ? (
                        <div className="text-center py-4">
                            <p className="text-gray-500">Đang tải dữ liệu...</p>
                        </div>
                    ) : bookings.length > 0 ? (
                        <Table bookings={bookings} />
                    ) : (
                        <div className="text-center py-4">
                            <p className="text-gray-500">Không có đặt yêu cầu nào</p>
                        </div>
                    )}
                    {!isLoading && bookings.length > 0 && <Pagination />}
                </div>
            </div>
        </Layout>
    );
}