import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';

const VerifyEmail = () => {
    const { id, hash } = useParams();
    const navigate = useNavigate();
    const {setToken} = useContext(AppContext);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await axios.get(
                    `/api/email/verify/${id}/${hash}`
                );
                setMessage(response.data.message);
                setErrors(null);
                if (response.data.token) {
                    setToken(response.data.token);
                    localStorage.setItem('token', response.data.token);
                    navigate('/');
                }
            } catch (error) {
                setErrors(error.response.data.errors);
                setMessage('');
            }
        };
        verifyEmail();
    }, [id, hash, navigate, setToken]);

    return (
        <div>
            <h2>Xác nhận Email</h2>
            {message && <p>{message}</p>}
            {errors && <p style={{ color: 'red' }}>{errors.message}</p>}
        </div>
    );
};

export default VerifyEmail;