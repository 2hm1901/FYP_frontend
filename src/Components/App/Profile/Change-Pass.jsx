import React from "react";

export default function ChangePass() {
  return (
    <div className="rounded-xl bg-gray-50 p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Change Password</h2>
        {/* Old Password Field */}
        <div className="flex flex-col mb-4 w-4/6">
          <label htmlFor="oldPassword" className="mb-2 font-semibold text-gray-700">
            Old Password
          </label>
          <input
            type="password"
            id="oldPassword"
            placeholder="Enter Old Password"
            className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-300"
          />
        </div>

        {/* New Password Field */}
        <div className="flex flex-col mb-4 w-4/6">
          <label htmlFor="newPassword" className="mb-2 font-semibold text-gray-700">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            placeholder="Enter New Password"
            className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-300"
          />
        </div>

        {/* Confirm New Password Field */}
        <div className="flex flex-col mb-4 w-4/6">
          <label htmlFor="confirmNewPassword" className="mb-2 font-semibold text-gray-700">
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmNewPassword"
            placeholder="Confirm New Password"
            className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-300"
          />
        </div>

      {/* Action Buttons */}
      <div className="mt-10 flex justify-end space-x-4">
        <button className="rounded-xl bg-indigo-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-indigo-600 hover:shadow-lg transform hover:-translate-y-0.5">
          Save Change
        </button>
      </div>
    </div>
  );
}