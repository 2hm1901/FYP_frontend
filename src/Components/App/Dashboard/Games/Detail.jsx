import { X, MessageCircle, Star } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import picture from "../../../../assets/banner-right.png";
import ChatComponent from "../../Chat/ChatComponent";

export default function Detail({
  onClose,
  venueName,
  venueLocation,
  creatorName,
  courtNumber,
  gameDate,
  startTime,
  endTime,
  currentPlayers,
  maxPlayers,
  skillLevelRequired,
  gameId,
  creatorId,
  currentUserId
}) {
  const [participants, setParticipants] = useState([]);
  const [joinRequests, setJoinRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const fetchGameData = async () => {
    try {
      const [gameResponse, requestsResponse] = await Promise.all([
        axios.get(`/api/getGameDetail/${gameId}`),
        axios.get(`/api/getJoinRequests/${gameId}`)
      ]);

      setParticipants(gameResponse.data.participants || []);
      setJoinRequests(requestsResponse.data.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGameData();
  }, [gameId]);

  const handleAcceptRequest = async (userId) => {
    try {
      await axios.post('/api/acceptJoinRequest', {
        game_id: gameId,
        user_id: userId
      });
      
      await axios.post(
        '/api/users/add-points',
        { user_id: creatorId, points: 5 },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      
      toast.success('Chấp nhận yêu cầu thành công');
      await fetchGameData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi chấp nhận yêu cầu');
    }
  };

  const handleRejectRequest = async (userId) => {
    try {
      await axios.post('/api/rejectJoinRequest', {
        game_id: gameId,
        user_id: userId
      });
      
      toast.success('Từ chối yêu cầu thành công');
      await fetchGameData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi từ chối yêu cầu');
    }
  };

  const handleKickPlayer = async (userId) => {
    try {
      await axios.post('/api/kickPlayer', {
        game_id: gameId,
        user_id: userId,
        creator_id: creatorId
      });
      
      await axios.post(
        '/api/users/add-points',
        { user_id: creatorId, points: -5 },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      
      toast.success('Đã kick người chơi thành công');
      await fetchGameData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi kick người chơi');
    }
  };

  const handleReviewSubmit = async (userId) => {
    try {
      await axios.post('/api/reviews', {
        reviewer_id: currentUserId,
        reviewed_id: userId,
        reviewed_type: 'user',
        rating: rating,
        comment: comment
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      
      toast.success('Đánh giá thành công');
      setShowReviewForm(false);
      setRating(0);
      setComment("");
    } catch (error) {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi đánh giá');
    }
  };

  const handleParticipantClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  const renderParticipant = (participant) => (
    <div
      key={participant.user_id}
      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
      onClick={() => handleParticipantClick(participant.user_id)}
    >
      <div className="flex items-center gap-4">
        <img
          src={`/api/avatar/${participant.avatar}` || picture}
          alt={participant.username}
          width={40}
          height={40}
          className="rounded-full border-2 border-gray-300"
        />
        <div>
          <p className="font-medium text-gray-800">{participant.username}</p>
          {participant.user_id === creatorId && (
            <p className="text-sm text-gray-500">Host</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedUserId(participant.user_id);
            setShowChat(true);
          }}
          className="text-blue-500 hover:text-blue-700 transition-colors"
        >
          <MessageCircle className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedUserId(participant.user_id);
            setShowReviewForm(true);
          }}
          className="text-yellow-500 hover:text-yellow-700 transition-colors"
        >
          <Star className="h-5 w-5" />
        </button>
        {currentUserId === creatorId && participant.user_id !== currentUserId && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleKickPlayer(participant.user_id);
            }}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );

  const renderJoinRequest = (request) => (
    <div
      key={request.id}
      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
      onClick={() => handleParticipantClick(request.user.id)}
    >
      <div className="flex items-center gap-4">
        <img
          src={`/api/avatar/${request.user.avatar}` || picture}
          alt={request.user.username}
          width={40}
          height={40}
          className="rounded-full border-2 border-gray-300"
        />
        <div>
          <p className="font-medium text-gray-800">{request.user.username}</p>
          <p className="text-sm text-gray-500">
            {new Date(request.created_at).toLocaleString('vi-VN')}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            handleAcceptRequest(request.user.id);
          }}
        >
          Chấp nhận
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            handleRejectRequest(request.user.id);
          }}
        >
          Từ chối
        </button>
      </div>
    </div>
  );

  if (loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <>
      <div className="flex inset-0 bg-black/50 items-center justify-center p-4 fixed z-50">
        <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
            <h2 className="text-2xl font-semibold text-gray-900">Chi tiết trận đấu</h2>
            <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6 space-y-8">
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin sân</h3>
              <div className="flex items-start gap-4">
                <div className="flex-1 space-y-4">
                  <div>
                    <h4 className="font-medium">{venueName}</h4>
                    <p className="text-sm text-green-600">{courtNumber}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-10">
                    <div>
                      <p className="text-sm text-gray-500">Địa chỉ</p>
                      <p className="font-medium">{venueLocation}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Ngày & Giờ</p>
                      <p className="font-medium">{gameDate}</p>
                      <p className="text-sm text-gray-500">{startTime} - {endTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Người tạo</p>
                      <p className="font-medium">{creatorName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Số người chơi</p>
                      <p className="font-medium">{currentPlayers}/{maxPlayers}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Yêu cầu trình độ</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">{skillLevelRequired}</p>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Danh sách người tham gia</h3>
              <div className="space-y-4">
                {participants.length > 0 ? 
                  participants.filter(p => p.status === "accepted").map(renderParticipant) : 
                  <p className="text-gray-500">Chưa có người tham gia</p>
                }
              </div>
            </section>

            {currentUserId === creatorId && joinRequests.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Yêu cầu tham gia</h3>
                <div className="space-y-4">
                  {joinRequests.map(renderJoinRequest)}
                </div>
              </section>
            )}
          </div>

          <div className="border-t p-6 flex justify-end sticky bottom-0 bg-white">
            <button
              className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
              onClick={onClose}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>

      {showChat && (
        <ChatComponent
          otherUserId={selectedUserId}
          isOpen={showChat}
          onClose={() => setShowChat(false)}
        />
      )}

      {showReviewForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Đánh giá người chơi</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Nhập bình luận của bạn..."
                className="w-full p-2 border rounded"
                rows={4}
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowReviewForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Hủy
                </button>
                <button
                  onClick={() => handleReviewSubmit(selectedUserId)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Gửi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}