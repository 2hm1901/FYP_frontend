import React from "react";
import { useState } from "react";
import { Pencil } from "lucide-react";
import Layout from "../../Layouts/Layout";
import Nav from "../../Components/App/Dashboard/Nav";

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Layout>
      <Nav />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 transition-all duration-300">
          {/* Tab Navigation */}
          <div className="mb-10 pb-2 flex space-x-2 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-6 py-3 text-center font-semibold rounded-t-lg transition-all duration-300 ${activeTab === "profile"
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab("password")}
              className={`px-6 py-3 text-center font-semibold rounded-t-lg transition-all duration-300 ${activeTab === "password"
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              Change Password
            </button>
          </div>

          {/* Profile Content */}
          {activeTab === "profile" && (
            <div className="rounded-xl bg-gray-50 p-8">
              {/* Photo Upload Section */}
              <div className="mb-10 flex justify-center">
                <div className="relative mx-auto mb-4 h-[200px] w-[200px] group">
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    <div className="flex h-full w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-white p-4 transition-all duration-300 group-hover:border-indigo-400 group-hover:shadow-lg">
                      {photoPreview ? (
                        <img
                          src={photoPreview || "/placeholder.svg"}
                          alt="Profile preview"
                          className="h-full w-full object-contain rounded-xl"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-gray-400">
                          <svg
                            className="mb-3 h-16 w-16 transition-colors duration-300 group-hover:text-indigo-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            ></path>
                          </svg>
                          <span className="text-gray-500 font-medium transition-colors duration-300 group-hover:text-indigo-600">
                            Upload Photo
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="absolute -right-2 -top-2 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500 text-white shadow-md transform transition-transform duration-300 group-hover:scale-110">
                      <Pencil className="h-5 w-5" />
                    </div>
                  </label>
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/jpeg,image/png,image/svg+xml"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <p className="text-center text-sm text-gray-600 font-medium">
                Upload a logo with a minimum size of 150 × 150 pixels (JPG, PNG, SVG).
              </p>

              {/* Form Fields */}
              <div className="grid gap-6 md:grid-cols-3 mt-8">
                {/* Name Field */}
                <div className="flex flex-col">
                  <label htmlFor="name" className="mb-2 font-semibold text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter Name"
                    className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-300"
                  />
                </div>

                {/* Email Field */}
                <div className="flex flex-col">
                  <label htmlFor="email" className="mb-2 font-semibold text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter Email Address"
                    className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-300"
                  />
                </div>

                {/* Phone Field */}
                <div className="flex flex-col">
                  <label htmlFor="phone" className="mb-2 font-semibold text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="Enter Phone Number"
                    className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-300"
                  />
                </div>

                {/* Skill Level Field */}
                <div className="flex flex-col">
                  <label htmlFor="skillLevel" className="mb-2 font-semibold text-gray-700">
                    Skill Level
                  </label>
                  <select
                    id="skillLevel"
                    className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-300"
                  >
                    <option value="">Select Skill Level</option>
                    <option value="Newbie">Newbie</option>
                    <option value="Yếu">Yếu</option>
                    <option value="TBY">TBY</option>
                    <option value="TB-">TB-</option>
                    <option value="TB">TB</option>
                    <option value="TB+">TB+</option>
                    <option value="TB++">TB++</option>
                    <option value="Khá">Khá</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-10 flex justify-end space-x-4">
                <button className="rounded-xl bg-indigo-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-indigo-600 hover:shadow-lg transform hover:-translate-y-0.5">
                  Save Change
                </button>
              </div>
            </div>
          )}

          {/* Placeholder for other tabs */}
          {activeTab === "password" && (
            <div className="rounded-xl bg-gray-50 p-8">
              <h2 className="text-2xl font-semibold text-gray-800">Change Password</h2>
              <p className="text-gray-600 mt-2">Password change form would go here</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}