import React, { useState, useEffect, useContext } from 'react';
import Header from '../Components/App/Header';
import Footer from '../Components/App/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from '../Context/AppContext';
import echo from '../utils/echo';
import axios from 'axios';

const Layout = ({ children }) => {
    const { user, token } = useContext(AppContext);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (user) {
            const fetchNotifications = async () => {
                try {
                    const response = await axios.get('http://127.0.0.1:8000/api/notifications', {
                        headers: { Authorization: `Bearer ${token}` },
                        params: { user_id: user.id },
                    });
                    setNotifications(response.data.data);
                } catch (error) {
                    console.error('Failed to fetch notifications:', error);
                }
            };
            fetchNotifications();
        }
    }, [user, token]);

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
                    const exists = prev.some((n) => n.id === event.notificationId);
                    if (exists) return prev;
                    return [
                        {
                            id: event.notificationId,
                            message: `Sân ${event.courtNumber} tại ${event.venueName} (${event.startTime} - ${event.endTime}) đã bị hủy`,
                            is_read: false,
                            created_at: new Date().toLocaleString(),
                        },
                        ...prev,
                    ];
                });
            });

            return () => {
                channel.stopListening('.court-cancelled');
                echo.leave(`user.${user.id}`);
            };
        }
    }, [user]);

    return (
        <div className="flex flex-col min-h-screen">
            <Header notifications={notifications} setNotifications={setNotifications} />
            <main className="flex-grow">{children}</main>
            <Footer />
            <ToastContainer />
        </div>
    );
};

export default Layout;