import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');
        const email = searchParams.get('email');

        if (!token || !email) {
            toast.error('Liên kết không hợp lệ.');
        }
    }, [location.search, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');
        const email = searchParams.get('email');

        try {
            const response = await axios.post('/api/reset-password', {
                token,
                email,
                password,
                password_confirmation: passwordConfirmation,
            });
            setMessage(response.data.message);
            setErrors({});
            toast.success(response.data.message, {
                autoClose: 2000,
                onClose: () => navigate('/login'),
            });
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
                toast.error('Có lỗi xảy ra. Vui lòng kiểm tra lại.');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md space-y-8 bg-white rounded-xl shadow-lg p-8">
                <div className="text-center space-y-3">
                    <h1 className="text-3xl font-bold text-gray-900">Đặt lại mật khẩu</h1>
                    <p className="text-gray-600 text-sm">Nhập mật khẩu mới cho tài khoản của bạn.</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">
                            Mật khẩu mới
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                            required
                        />
                        {errors.password && <p className="text-red-600 text-sm">{errors.password[0]}</p>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password_confirmation" className="text-sm font-medium text-gray-700">
                            Xác nhận mật khẩu
                        </label>
                        <input
                            id="password_confirmation"
                            type="password"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                            required
                        />
                        {errors.password_confirmation && <p className="text-red-600 text-sm">{errors.password_confirmation[0]}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-200"
                    >
                        Đặt lại mật khẩu
                    </button>
                </form>

                {message && <p className="text-center text-green-600">{message}</p>}
            </div>
            <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} closeOnClick pauseOnHover />
        </div>
    );
};

export default ResetPassword;