import { X } from "lucide-react";

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
}) {
  return (
    <div className="flex inset-0 bg-black/50 items-center justify-center p-4 fixed z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold text-gray-900">Chi tiết trận đấu</h2>
          </div>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Court Information */}
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

          {/* Skill Level */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Yêu cầu trình độ</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium">{skillLevelRequired}</p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="border-t p-6 flex justify-end">
          <button
            className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}