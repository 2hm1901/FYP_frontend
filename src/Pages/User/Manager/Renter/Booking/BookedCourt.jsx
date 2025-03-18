import React, { useState, useEffect, useContext } from "react";
import Layout from '../../../../../Layouts/Layout';
import Nav from '../../../../../Components/App/Dashboard/Nav';
import Pagination from "../../../../../Components/App/Dashboard/Booking/Pagination";
import BookedTable from "../../../../../Components/App/Dashboard/Booking/BookingTable";
import BookingTabs from "../../../../../Components/App/Dashboard/Booking/BookingTabs";
import axios from "axios";
import { AppContext } from "../../../../../Context/AppContext";

export default function BookedCourt() {
    const [activeTab, setActiveTab] = useState("Sắp tới");
    const { user } = useContext(AppContext);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        if (user) {
            fetchBookings();
        }
    }, [activeTab, user]);

    const fetchBookings = async () => {
        let status;
        switch (activeTab) {
            case "Sắp tới":
                status = ["awaiting", "accepted"];
                break;
            case "Đã huỷ":
                status = ["cancelled"];
                break;
            default:
                status = ["awaiting", "accepted"];
        }

        try {
            const response = await axios.get(`/api/getBookings`, {
                params: { user_id: user?.id, status: status }
            });
            setBookings(response.data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    return (
        <Layout>
            <Nav />
            <div className="min-h-screen bg-gray-50/50 p-8">
                <div className="rounded-xl bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Sân đã đặt</h1>
                            <p className="text-gray-500">Quản lý và theo dõi tất cả các đặt chỗ sân sắp tới của bạn</p>
                        </div>
                        <BookingTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                    </div>
                    <BookedTable bookings={bookings} tab={activeTab} />
                    <Pagination />
                </div>
            </div>
        </Layout>
    );
}