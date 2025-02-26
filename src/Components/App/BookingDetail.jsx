import { X } from "lucide-react"

export default function BookingDetail() {
  return (
    <div className="flex inset-0 bg-black/50 items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold text-gray-900">Court Booking Details</h2>
            <span className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-full">Upcoming</span>
          </div>
          <button className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Court Information */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Court Information</h3>
            <div className="flex items-start gap-4">
              <image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-t2yTOAY6gMph4XhCuxQDetvJmvcZxg.png"
                alt="Wing Sports Academy"
                width={80}
                height={80}
                className="rounded-lg"
              />
              <div className="flex-1 space-y-4">
                <div>
                  <h4 className="font-medium">Wing Sports Academy</h4>
                  <p className="text-sm text-green-600">Court 1</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Booked On</p>
                    <p className="font-medium">$150 Upto 2 guests</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Price Per Guest</p>
                    <p className="font-medium">$15</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Maximum Number of Guests</p>
                    <p className="font-medium">2</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Appointment Information */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Information</h3>
            <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <p className="text-sm text-gray-500">Booked On</p>
                <p className="font-medium">Mon, Jul 14</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date & Time</p>
                <p className="font-medium">Mon, Jul 14</p>
                <p className="text-sm text-gray-500">05:00 PM - 08:00 PM</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Number of Hours</p>
                <p className="font-medium">2</p>
              </div>
            </div>
          </section>

          {/* Payment Details */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg">
                <div>
                  <p className="text-sm text-gray-500">Court Booking Amount</p>
                  <p className="font-medium">$150</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Additional Guests</p>
                  <p className="font-medium">2</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Amount Additional Guests</p>
                  <p className="font-medium">$30</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Service Charge</p>
                  <p className="font-medium">$20</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg">
                <div>
                  <p className="text-sm text-gray-500">Total Amount Paid</p>
                  <p className="font-medium text-green-600">$180</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Paid On</p>
                  <p className="font-medium">Mon, Jul 14</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Transaction ID</p>
                  <p className="font-medium text-gray-400">#546416</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payment type</p>
                  <p className="font-medium">Wallet</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="border-t p-6 flex justify-end">
          <button
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

