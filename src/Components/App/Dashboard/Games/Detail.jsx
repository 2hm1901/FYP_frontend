import { X } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import picture from "../../../../assets/banner-right.png";

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

  const renderParticipant = (participant) => (
    <div
      key={participant.user_id}
      className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
    >
      <img
        src={`http://localhost:8000/storage/avatars/${participant.avatar}` || picture}
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
  );

  const renderJoinRequest = (request) => (
    <div
      key={request.id}
      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
    >
      <div className="flex items-center gap-4">
        <img
          src={`http://localhost:8000/storage/avatars/${request.user.avatar}` || picture}
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
          onClick={() => handleAcceptRequest(request.user.id)}
        >
          Chấp nhận
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          onClick={() => handleRejectRequest(request.user.id)}
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
  );
}