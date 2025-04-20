import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../../Context/AppContext';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../../Layouts/Layout';
import GameCard from '../../../Components/App/GameCard';
import { FaClock, FaMapMarkerAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import picture from '../../../assets/banner-right.png';
import { toast } from 'react-toastify';

export default function GameDetail() {
    const { gameId } = useParams();
    const [game, setGame] = useState(null);
    const [otherGames, setOtherGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AppContext);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchGameDetail = async () => {
            try {
                const gameResponse = await axios.get(`/api/getGameDetail/${gameId}`);
                setGame(gameResponse.data);

                const allGamesResponse = await axios.get('/api/getAllGame');
                const filteredGames = allGamesResponse.data.filter(g => g.id !== gameId);
                setOtherGames(filteredGames.slice(0, 5));
            } catch (error) {
                console.error('Error fetching game data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGameDetail();
    }, [gameId]);

    const handleJoinRequest = async () => {
        try {
            const response = await axios.post('/api/requestJoinGame', {
                game_id: gameId,
                user_id: user.id
            });
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi gửi yêu cầu');
        }
    };

    // Kiểm tra xem người dùng đã tham gia game chưa
    const hasJoined = game?.participants?.some(participant => participant.user_id === user?.id);

    // Hàm điều hướng đến trang hồ sơ người chơi
    const handleParticipantClick = (userId) => {
        navigate(`/profile/${userId}`);
    };

    if (loading) {
        return <Layout><div className="p-6 text-gray-500">Loading...</div></Layout>;
    }

    if (!game) {
        return <Layout><div className="p-6 text-red-500">Game not found.</div></Layout>;
    }

    return (
        <Layout>
            <div className="max-w-2xl mx-auto p-6 space-y-8 bg-white shadow-lg rounded-lg">
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Thông tin trận đấu</h1>
                            <p className="text-gray-600">Hosted: {game.creator?.username || 'Unknown'}</p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <FaClock className="w-6 h-6 text-gray-600" />
                            <div>
                                <p className="font-semibold text-gray-800">{game.game_date}, {game.start_time} - {game.end_time}</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <FaMapMarkerAlt className="w-6 h-6 text-gray-600" />
                                <div>
                                    <p className="text-gray-800">{game.venue?.name || `Venue ${game.venue?.id}`} - {game.court_number}</p>
                                    <p className="text-gray-500">Địa chỉ: {game.venue?.location}</p>
                                </div>
                            </div>
                            <div className="flex gap-4 mt-4">
                                <button
                                    className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-white shadow-md transition duration-300 ease-in-out transform hover:scale-105 ${
                                        hasJoined
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-emerald-500 hover:bg-emerald-600 border-gray-300'
                                    }`}
                                    disabled={hasJoined}
                                    onClick={handleJoinRequest}
                                >
                                    {hasJoined ? 'Đã tham gia' : 'Yêu cầu tham gia'}
                                </button>
                            </div>
                            
                            {/* Hiển thị QR code nếu có */}
                            {game.qr_code && (
                                <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                                    <h3 className="text-lg font-medium text-gray-800 mb-2">Mã QR thanh toán</h3>
                                    <div className="flex justify-center">
                                        <img 
                                            src={`/api/qr_codes/${game.qr_code}`} 
                                            alt="QR Code" 
                                            className="max-w-xs border border-gray-300 rounded-lg"
                                        />
                                    </div>
                                </div>
                            )}
                            
                            {/* Hiển thị ảnh thanh toán nếu có */}
                            {game.payment_image && (
                                <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                                    <h3 className="text-lg font-medium text-gray-800 mb-2">Ảnh xác nhận thanh toán</h3>
                                    <div className="flex justify-center">
                                        <img 
                                            src={`/api/payment_images/${game.payment_image}`} 
                                            alt="Payment Image" 
                                            className="max-w-xs border border-gray-300 rounded-lg"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Danh sách người chơi ({game.current_players})</h2>
                    <div className="space-y-4">
                        {game.participants && game.participants.length > 0 ? (
                            game.participants
                                .filter(participant => participant.status === "accepted")
                                .map((participant, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                                        onClick={() => handleParticipantClick(participant.user_id)}
                                    >
                                        <img
                                            src={participant.avatar ? `/api/avatar/${participant.avatar}` : picture}
                                            alt={participant.username}
                                            width={40}
                                            height={40}
                                            className="rounded-full border-2 border-gray-300"
                                        />
                                        <div>
                                            <p className="font-medium text-gray-800">{participant.username}</p>
                                            {participant.user_id === game.creator.id && (
                                                <p className="text-sm text-gray-500">Host</p>
                                            )}
                                        </div>
                                    </div>
                                ))
                        ) : (
                            <p className="text-gray-500">Chưa có người tham gia</p>
                        )}
                    </div>
                </div>
                <div className="w-full space-y-8">
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-semibold text-black">Other Games</h2>
                            <a href="/game" className="text-emerald-500 font-medium flex items-center">
                                SEE ALL GAMES
                                <FaChevronRight className="ml-1 h-4 w-4" />
                            </a>
                        </div>
                        <div className="relative">
                            <div id="gameCards" className="flex space-x-4 overflow-x-auto pb-4">
                                {otherGames.map((otherGame) => (
                                    <GameCard
                                        key={otherGame.id}
                                        game={otherGame}
                                        onClick={() => navigate(`/gameDetail/${otherGame.id}`)}
                                    />
                                ))}
                            </div>
                            <div className="absolute -left-4 top-1/2 -translate-y-1/2">
                                <button
                                    className="rounded-full bg-white p-2 shadow-md hover:bg-gray-100 transition duration-300"
                                    onClick={() => document.querySelector('#gameCards').scrollBy({ left: -200, behavior: 'smooth' })}
                                >
                                    <FaChevronLeft className="h-4 w-4" />
                                </button>
                            </div>
                            <div className="absolute -right-4 top-1/2 -translate-y-1/2">
                                <button
                                    className="rounded-full bg-white p-2 shadow-md hover:bg-gray-100 transition duration-300"
                                    onClick={() => document.querySelector('#gameCards').scrollBy({ left: 200, behavior: 'smooth' })}
                                >
                                    <FaChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </Layout>
    );
}