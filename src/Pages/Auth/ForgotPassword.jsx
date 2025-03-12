import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(email);
            const response = await axios.post('/api/forgot-password', { email });
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
                    <h1 className="text-3xl font-bold text-gray-900">Quên mật khẩu</h1>
                    <p className="text-gray-600 text-sm">Nhập email đã được xác thực để đặt lại mật khẩu.</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                            required
                        />
                        {errors.email && <p className="text-red-600 text-sm">{errors.email[0]}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-200"
                    >
                        Gửi yêu cầu
                    </button>
                </form>

                {message && <p className="text-center text-green-600">{message}</p>}
                <p className="text-center text-sm text-gray-600">
                    Quay lại trang đăng nhập?{' '}
                    <a href="/login" className="text-indigo-600 hover:underline font-medium">
                        Đăng nhập
                    </a>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;