import React, { useEffect, useState, useContext } from 'react';
import Layout from '../../../Layouts/Layout';
import { FaMapMarkerAlt, FaClock, FaPhone, FaLink, FaStar } from 'react-icons/fa';
import { Tabs, Tab, Box } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import { Card, CardContent } from "@mui/material";
import picture from '../../../assets/banner-right.png';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { AppContext } from '../../../Context/AppContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function VenueDetail() {
    const { id } = useParams();
    const { user } = useContext(AppContext);
    const [value, setValue] = useState('info');
    const [venue, setVenue] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [reviewForm, setReviewForm] = useState({
        rating: 0,
        comment: ''
    });

    useEffect(() => {
        axios.get(`/api/getVenueDetail/${id}`)
            .then(response => setVenue(response.data))
            .catch(error => {
                console.error('Error fetching venue details:', error);
                toast.error('Lỗi khi tải thông tin sân');
            });

        axios.get('/api/reviews', {
            params: {
                reviewed_id: id,
                reviewed_type: 'venue'
            }
        })
            .then(response => {
                setReviews(response.data.data.reviews);
                setAverageRating(response.data.data.average_rating);
            })
            .catch(error => {
                console.error('Error fetching reviews:', error);
                toast.error('Lỗi khi tải đánh giá');
            });
    }, [id]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        if (!user) {
            toast.error('Vui lòng đăng nhập để gửi đánh giá');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
            return;
        }

        axios.post('/api/reviews', {
            reviewer_id: user.id,
            reviewed_id: id,
            reviewed_type: 'venue',
            rating: reviewForm.rating,
            comment: reviewForm.comment
        }, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                setReviews([response.data.data, ...reviews]);
                setAverageRating(response.data.data.average_rating || averageRating);
                setShowReviewModal(false);
                setReviewForm({ rating: 0, comment: '' });
                toast.success('Đánh giá đã được gửi thành công!');
            })
            .catch(error => {
                console.error('Error submitting review:', error);
                toast.error(error.response?.status === 401
                    ? 'Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.'
                    : 'Có lỗi khi gửi đánh giá');
            });
    };

    if (!venue) {
        return <div className="flex justify-center items-center h-screen text-gray-800">Loading...</div>;
    }

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
                <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
                    <img
                        src={picture}
                        alt="Facility banner"
                        className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                </div>

                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
                        <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg border-4 border-white">
                            <img
                                src={picture}
                                alt="Logo"
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">{venue.name}</h1>
                            <div className="flex items-center justify-center md:justify-start gap-2">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar
                                        key={i}
                                        className={`w-6 h-6 ${i < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-400'}`}
                                    />
                                ))}
                                <span className="text-gray-800 text-lg ml-2">{averageRating.toFixed(1)} ({reviews.length} đánh giá)</span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <a
                                href={`/bookingTable/${id}`}
                                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-colors duration-200"
                            >
                                Đặt lịch
                            </a>
                            <button
                                onClick={() => setShowReviewModal(true)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                disabled={!user || !localStorage.getItem('token')}
                            >
                                Viết đánh giá
                            </button>
                        </div>
                    </div>

                    {/* Review Modal */}
                    {showReviewModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300">
                            <div className="bg-white p-8 rounded-xl max-w-lg w-full shadow-2xl transform transition-transform duration-300 scale-100 hover:scale-105">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Đánh giá sân</h2>
                                <form onSubmit={handleReviewSubmit}>
                                    <div className="mb-6">
                                        <label className="block text-gray-700 font-medium mb-2">Điểm đánh giá:</label>
                                        <div className="flex gap-2">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar
                                                    key={i}
                                                    className={`w-8 h-8 cursor-pointer transition-colors duration-200 ${i < reviewForm.rating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-300`}
                                                    onClick={() => setReviewForm({ ...reviewForm, rating: i + 1 })}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-gray-700 font-medium mb-2">Bình luận:</label>
                                        <textarea
                                            value={reviewForm.comment}
                                            onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow duration-200 shadow-sm"
                                            rows="5"
                                            required
                                        />
                                    </div>
                                    <div className="flex gap-4 justify-end">
                                        <button
                                            type="submit"
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-colors duration-200"
                                        >
                                            Gửi đánh giá
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setShowReviewModal(false)}
                                            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-colors duration-200"
                                        >
                                            Hủy
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'white', borderRadius: '8px', mb: 4 }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label="venue tabs"
                                sx={{
                                    '& .MuiTab-root': { color: '#374151', fontWeight: 'bold' },
                                    '& .Mui-selected': { color: '#1f2937' },
                                    '& .MuiTabs-indicator': { backgroundColor: '#1f2937' }
                                }}
                            >
                                <Tab label="Thông tin & Hình ảnh" value="info" />
                                <Tab label="Dịch vụ & Đánh giá" value="services" />
                            </Tabs>
                        </Box>
                        <TabPanel value="info" sx={{ p: 0 }}>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="md:col-span-2 space-y-6">
                                    <Card sx={{ bgcolor: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                                        <CardContent className="p-6 space-y-4 text-gray-800">
                                            <div className="flex items-center gap-4">
                                                <FaMapMarkerAlt className="w-6 h-6 text-orange-500" />
                                                <p className="text-lg">{venue.location}</p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <FaClock className="w-6 h-6 text-orange-500" />
                                                <p className="text-lg">Giờ hoạt động: {venue.open_time} - {venue.close_time}</p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <FaPhone className="w-6 h-6 text-orange-500" />
                                                <p className="text-lg">{venue.phone}</p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <FaLink className="w-6 h-6 text-orange-500" />
                                                <a href="#" className="text-lg hover:underline text-orange-500">
                                                    https://datlich.alobo.vn/san/sport_indexsport
                                                </a>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </TabPanel>

                        <TabPanel value="services" sx={{ p: 0 }}>
                            <div className="p-6 bg-white bg-opacity-90 rounded-xl">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Dịch vụ & Đánh giá</h2>
                                <div className="space-y-6">
                                    {reviews.length > 0 ? (
                                        reviews.map(review => (
                                            <Card
                                                key={review.id}
                                                sx={{
                                                    bgcolor: 'white',
                                                    borderRadius: '12px',
                                                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                                    transition: 'transform 0.2s',
                                                    '&:hover': { transform: 'translateY(-4px)' }
                                                }}
                                            >
                                                <CardContent className="p-6">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className="flex items-center gap-3">
                                                            <span className="font-bold text-lg text-orange-500">{review.reviewer_name}</span>
                                                            <div className="flex">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <FaStar
                                                                        key={i}
                                                                        className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-400'}`}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <p className="text-sm text-gray-500">
                                                            {new Date(review.created_at).toLocaleDateString('vi-VN')}
                                                        </p>
                                                    </div>
                                                    <p className="text-gray-700">{review.comment}</p>
                                                </CardContent>
                                            </Card>
                                        ))
                                    ) : (
                                        <p className="text-gray-600 text-lg">Chưa có đánh giá nào cho sân này.</p>
                                    )}
                                </div>
                            </div>
                        </TabPanel>
                    </TabContext>
                </div>
            </div>
        </Layout>
    );
}