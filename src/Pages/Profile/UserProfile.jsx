import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../Layouts/Layout';

export default function UserProfile() {
    const { userId } = useParams();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`/api/getUser?user_id=${userId}`);
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [userId]);

    if (loading) return <Layout><div>Loading...</div></Layout>;
    if (!userData) return <Layout><div>User not found.</div></Layout>;

    return (
        <Layout>
            <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold text-gray-800">Hồ sơ người dùng</h1>
                <div className="mt-4 space-y-2">
                    <p><strong>Tên:</strong> {userData.username || 'Không rõ'}</p>
                    <p><strong>Karma:</strong> {userData.karma || 0}</p>
                    {/* Thêm các thông tin khác nếu cần */}
                </div>
            </div>
        </Layout>
    );
}