import { X } from "lucide-react";

export default function BookingDetail({
  onClose,
  image,
  name,
  location,
  court,
  date,
  time,
  payment,
}) {
  
  return (
    <div className="flex inset-0 bg-black/50 items-center justify-center p-4 fixed z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold text-gray-900">Chi tiết đặt sân</h2>
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
              <img
                src={image || "/placeholder.svg"}
                alt={name}
                width={80}
                height={80}
                className="rounded-lg"
              />
              <div className="flex-1 space-y-4">
                <div>
                  <h4 className="font-medium">{name}</h4>
                  <p className="text-sm text-green-600">{court}</p>
                </div>
                <div className="grid grid-cols-2 gap-10">
                  <div>
                    <p className="text-sm text-gray-500">Địa chỉ</p>
                    <p className="font-medium">{location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Số người tối đa trên 1 sân</p>
                    <p className="font-medium">8</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Appointment Information */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin cuộc hẹn</h3>
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <p className="text-sm text-gray-500">Ngày & Giờ</p>
                <p className="font-medium">{date}</p>
                <p className="text-sm text-gray-500">{time}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tổng giờ</p>
                <p className="font-medium">2</p>
              </div>
            </div>
          </section>

          {/* Payment Details */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin thanh toán</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg">
                <div>
                  <p className="text-sm text-gray-500">Tổng tiền</p>
                  <p className="font-medium text-green-600">{payment}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Đã thanh toán</p>
                  <p className="font-medium">{date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Mã giao dịch</p>
                  <p className="font-medium text-gray-400">#546416</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phương thức</p>
                  <p className="font-medium">Wallet</p>
                </div>
              </div>
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