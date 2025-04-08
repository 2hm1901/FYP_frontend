import React from 'react';
import { FaBell, FaCheckCircle, FaCircle } from 'react-icons/fa';
import axios from 'axios';
import { format } from 'date-fns';

const NotificationDropdown = ({ notifications, setNotifications, token, user }) => {
    const [notifOpen, setNotifOpen] = React.useState(false);

    const handleMarkAsRead = async (notificationId) => {
        try {
            await axios.post(
                '/api/notifications/mark-read',
                { notification_id: notificationId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setNotifications((prev) =>
                prev.map((notif) =>
                    notif.id === notificationId ? { ...notif, is_read: true } : notif
                )
            );
        } catch (error) {
            console.error('Failed to mark notification as read:', error);
        }
    };

    const handleClearNotification = (notificationId) => {
        setNotifications((prev) => prev.filter((notif) => notif.id !== notificationId));
    };

    return (
        <div className="relative">
            <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="text-white hover:text-green-300 relative focus:outline-none transition-colors duration-200"
            >
                <FaBell className="text-2xl" />
                {notifications.filter((n) => !n.is_read).length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {notifications.filter((n) => !n.is_read).length}
                    </span>
                )}
            </button>

            {notifOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-100 animate-fadeIn">
                    {notifications.length === 0 ? (
                        <div className="p-6 text-gray-600 text-center text-sm">Không có thông báo nào</div>
                    ) : (
                        notifications.map((notif) => (
                            <div
                                key={notif.id}
                                className="p-4 border-b border-gray-100 flex items-start space-x-3 hover:bg-gray-50 transition-all duration-200"
                            >
                                {/* Biểu tượng phân biệt đã đọc/chưa đọc */}
                                <div className="flex-shrink-0">
                                    {notif.is_read ? (
                                        <FaCheckCircle className="text-green-500 text-sm mt-1" />
                                    ) : (
                                        <FaCircle className="text-blue-500 text-xs mt-1" />
                                    )}
                                </div>

                                {/* Nội dung thông báo */}
                                <div className="flex-1">
                                    <p className={`text-sm ${notif.is_read ? 'text-gray-600' : 'font-semibold text-gray-800'}`}>
                                        {notif.message}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">{format(new Date(notif.created_at), 'dd/MM/yyyy HH:mm')}</p>
                                </div>

                                {/* Nút hành động */}
                                <div className="flex space-x-2">
                                    {!notif.is_read && (
                                        <button
                                            onClick={() => handleMarkAsRead(notif.id)}
                                            className="text-green-600 hover:text-green-800 text-xs font-medium transition-colors duration-200"
                                        >
                                            Đánh dấu là đã đọc
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;