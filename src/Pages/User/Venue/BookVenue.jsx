import React, { useState, useEffect } from 'react';
import Layout from '../../../Layouts/Layout';
import BookingTable from '../../../Components/App/BookingTable';
import axios from 'axios';
import { useParams } from "react-router-dom";

const BookVenue = () => {
  const [bookingTable, setBookingTable] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/getBookingTable/${id}`)
      .then(response => {
        setBookingTable(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the information!', error);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-8xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-xl font-bold mb-4">Lịch sân vào ngày 20 tháng 12, 2024</h1>
          <p className="text-red-500 mb-4">
            Lưu ý: Nếu bạn cần đặt lịch cố định vui lòng liên hệ: 0981.086.979 để được hỗ trợ.
          </p>
          <BookingTable venue={bookingTable.venue} courtPrices={bookingTable.courtPrices} />
        </div>
      </div>
    </Layout>
  );
};

export default BookVenue;
