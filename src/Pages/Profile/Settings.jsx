import React from "react";
import { useState } from "react";
import Layout from "../../Layouts/Layout";
import Nav from "../../Components/App/Dashboard/Nav";
import Information from "../../Components/App/Profile/Information";
import ChangePass from "../../Components/App/Profile/Change-Pass";

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

          {/* Render Appropriate Tab */}
          {activeTab === "profile" && (
            <Information handleFileChange={handleFileChange} />
          )}
          {activeTab === "password" && <ChangePass />}
        </div>
      </div>
    </Layout>
  );
}