import React, { useEffect, useState } from 'react';
import Layout from '../../../Layouts/Layout';
import { FaMapMarkerAlt, FaClock, FaPhone, FaLink, FaStar } from 'react-icons/fa';
import { Tabs, Tab, Box } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import { Card, CardContent } from "@mui/material";
import picture from '../../../assets/banner-right.png';
import axios from 'axios';
import { useParams } from "react-router-dom";

export default function VenueDetail() {
    const { id } = useParams();
    const [value, setValue] = React.useState('info');
    const [venue, setVenue] = useState(null);

    useEffect(() => {
        axios.get(`/api/getVenueDetail/${id}`)
            .then(response => {
                setVenue(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the venue details!', error);
            });
    }, [id]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    if (!venue) {
        return <div>Loading...</div>;
    }

    return (
        <Layout>
        <div className="min-h-screen bg-[#006837]">
            <div className="relative h-[300px] md:h-[400px] w-full">
                <img
                    src={picture}
                    alt="Facility banner"
                    className="object-cover w-full h-full"
                />
            </div>

            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row items-start gap-4 mb-8">
                    <div className="w-16 h-16 rounded-full overflow-hidden relative flex-shrink-0">
                        <img
                            src={picture}
                            alt="Logo"
                            width={64}
                            height={64}
                            className="object-cover"
                        />
                    </div>
                    <div className="flex-1">
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            {venue.name}
                        </h1>
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            ))}
                            <span className="text-white ml-2">5.0</span>
                        </div>
                    </div>
                    <a href={`/bookingTable/${id}`} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded">
                        Đặt lịch
                    </a>
                </div>

                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Thông tin & Hình ảnh" value="info" />
                            <Tab label="Dịch vụ & Đánh giá" value="services" />
                        </Tabs>
                    </Box>
                    <TabPanel value="info">
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="md:col-span-2 space-y-6">
                                <Card>
                                    <CardContent className="p-6 space-y-4 text-white bg-[#005c30]">
                                        <div className="flex items-center gap-3">
                                            <FaMapMarkerAlt className="w-5 h-5 flex-shrink-0" />
                                            <p>{venue.location}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <FaClock className="w-5 h-5 flex-shrink-0" />
                                            <p>Giờ hoạt động: {venue.open_time} - {venue.close_time}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <FaPhone className="w-5 h-5 flex-shrink-0" />
                                            <p>{venue.phone}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <FaLink className="w-5 h-5 flex-shrink-0" />
                                            <a href= "#" className="hover:underline">
                                            https://datlich.alobo.vn/san/sport_indexsport
                                            </a>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabPanel>

                    <TabPanel value="services">
                        <div className="text-white p-6">
                            <h2 className="text-xl font-bold mb-4">Dịch vụ</h2>
                            <p>Chi tiết về các dịch vụ và đánh giá của khách hàng.</p>
                        </div>
                    </TabPanel>
                </TabContext>
            </div>
        </div>
    </Layout>
    );
}
