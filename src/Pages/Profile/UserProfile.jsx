import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../Layouts/Layout';
import { FaStar, FaUser, FaTrophy, FaHistory, FaComment } from 'react-icons/fa';

// Hàm ẩn email
const maskEmail = (email) => {
    if (!email) return '';
    const [username, domain] = email.split('@');
    const maskedUsername = username.charAt(0) + '*'.repeat(username.length - 2) + username.charAt(username.length - 1);
    return `${maskedUsername}@${domain}`;
};

// Hàm ẩn số điện thoại
const maskPhoneNumber = (phone) => {
    if (!phone) return '';
    const visibleDigits = 4;
    const maskedPart = '*'.repeat(phone.length - visibleDigits);
    return maskedPart + phone.slice(-visibleDigits);
};

export default function UserProfile() {
    const { userId } = useParams();
    const [userData, setUserData] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        const fetchUserAndReviews = async () => {
            try {
                const userResponse = await axios.get(`/api/getUser?user_id=${userId}`);
                setUserData(userResponse.data.data);

                const reviewsResponse = await axios.get('/api/reviews', {
                    params: {
                        reviewed_id: userId,
                        reviewed_type: 'user'
                    }
                });
                setReviews(reviewsResponse.data.data.reviews);
                setAverageRating(reviewsResponse.data.data.average_rating);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserAndReviews();
    }, [userId]);

    if (loading) return <Layout><div className="flex justify-center items-center h-screen">Loading...</div></Layout>;
    if (!userData) return <Layout><div className="flex justify-center items-center h-screen">Không tìm thấy người dùng</div></Layout>;

    return (
        <Layout>
            <div className="min-h-screen bg-gray-100 py-8">
                <div className="max-w-6xl mx-auto px-4">
                    {/* Profile Header */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
                            <div className="absolute -bottom-16 left-8">
                                <img 
                                    src={userData.avatar ? `/api/avatar/${userData.avatar}` : "/placeholder.svg"} 
                                    alt={userData.username}
                                    className="w-32 h-32 rounded-full border-4 border-white"
                                />
                            </div>
                        </div>
                        <div className="pt-20 px-8 pb-8">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-800">{userData.username}</h1>
                                    <p className="text-gray-600 mt-1">Trình độ: {userData.skill_level}</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-gray-800">{userData.point || 0}</div>
                                        <div className="text-gray-600">Điểm</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-gray-800">{reviews.length}</div>
                                        <div className="text-gray-600">Đánh giá</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="mt-8 bg-white rounded-lg shadow-lg">
                        <div className="border-b border-gray-200">
                            <nav className="flex -mb-px">
                                <button
                                    onClick={() => setActiveTab('overview')}
                                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                                        activeTab === 'overview'
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    <FaUser className="inline-block mr-2" />
                                    Tổng quan
                                </button>
                                <button
                                    onClick={() => setActiveTab('reviews')}
                                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                                        activeTab === 'reviews'
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    <FaComment className="inline-block mr-2" />
                                    Đánh giá
                                </button>
                            </nav>
                        </div>

                        {/* Tab Content */}
                        <div className="p-6">
                            {activeTab === 'overview' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-gray-50 p-6 rounded-lg">
                                        <h3 className="text-lg font-semibold mb-4">Thông tin cá nhân</h3>
                                        <div className="space-y-3">
                                            <p><span className="font-medium">Email:</span> {maskEmail(userData.email)}</p>
                                            <p><span className="font-medium">Số điện thoại:</span> {userData.phone_number ? maskPhoneNumber(userData.phone_number) : 'Chưa cập nhật'}</p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 p-6 rounded-lg">
                                        <h3 className="text-lg font-semibold mb-4">Thống kê</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center">
                                                <FaTrophy className="text-yellow-500 mr-2" />
                                                <span>Điểm trung bình: {averageRating.toFixed(1)}/5</span>
                                            </div>
                                            <div className="flex items-center">
                                                <FaHistory className="text-blue-500 mr-2" />
                                                <span>Số trận đã tham gia: {userData.games_played || 0}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'reviews' && (
                                <div>
                                    <div className="flex items-center mb-6">
                                        <div className="flex items-center">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <FaStar
                                                    key={star}
                                                    className={`w-6 h-6 ${star <= averageRating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                />
                                            ))}
                                        </div>
                                        <span className="ml-2 text-gray-600">
                                            ({averageRating.toFixed(1)}/5 từ {reviews.length} đánh giá)
                                        </span>
                                    </div>

                                    <div className="space-y-6">
                                        {reviews.length > 0 ? (
                                            reviews.map((review) => (
                                                <div key={review.id} className="border-b pb-6 last:border-b-0">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <p className="font-semibold text-lg">{review.reviewer_name}</p>
                                                            <div className="flex items-center mt-1">
                                                                {[1, 2, 3, 4, 5].map((star) => (
                                                                    <FaStar
                                                                        key={star}
                                                                        className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <span className="text-sm text-gray-500">
                                                            {new Date(review.created_at).toLocaleDateString('vi-VN')}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-600 mt-2">{review.comment}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-600 text-center py-8">Chưa có đánh giá nào.</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}