import React, { useState, useEffect, useContext } from 'react';
import Header from '../Components/App/Header';
import Footer from '../Components/App/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from '../Context/AppContext';
import echo from '../utils/echo';

const Layout = ({ children }) => {
    const { user } = useContext(AppContext);
    const [notifications, setNotifications] = useState(() => {
        // Load thông báo từ localStorage khi khởi tạo, riêng cho từng user
        return user ? JSON.parse(localStorage.getItem(`notifications_${user.id}`) || '[]') : [];
    });

    useEffect(() => {
        if (user) {
            console.log('Listening on channel: user.' + user.id);
            const channel = echo.private(`user.${user.id}`).listen('.court-cancelled', (event) => {
                console.log('Received court-cancelled event:', event);
                toast.error(`Sân ${event.courtNumber} tại ${event.venueName} (${event.startTime} - ${event.endTime}) đã bị hủy bởi chủ sân!`, {
                    position: 'top-right',
                    autoClose: 5000,
                });

                setNotifications((prev) => {
                    const newNotif = {
                        id: Date.now(),
                        message: `Sân ${event.courtNumber} tại ${event.venueName} (${event.startTime} - ${event.endTime}) đã bị hủy`,
                        timestamp: new Date().toLocaleString(),
                        isRead: false, // Thêm trạng thái đã đọc
                    };
                    const updatedNotifs = [...prev, newNotif];
                    localStorage.setItem(`notifications_${user.id}`, JSON.stringify(updatedNotifs));
                    return updatedNotifs;
                });
            });

            return () => {
                channel.stopListening('.court-cancelled');
                echo.leave(`user.${user.id}`);
            };
        }
    }, [user]);

    // Đồng bộ localStorage khi notifications thay đổi
    useEffect(() => {
        if (user) {
            localStorage.setItem(`notifications_${user.id}`, JSON.stringify(notifications));
        }
    }, [notifications, user]);

    return (
        <div className="flex flex-col min-h-screen">
            <Header notifications={notifications} setNotifications={setNotifications} />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
            <ToastContainer />
        </div>
    );
};

export default Layout;