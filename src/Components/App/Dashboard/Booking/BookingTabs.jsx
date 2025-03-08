import React from "react";
export default function BookingTabs({ activeTab, setActiveTab }) {
    const tabs = ["Sắp tới", "Đã hoàn thành", "Đã huỷ"];
    return (
      <div className="mb-8 flex gap-2 bg-gray-50 p-2 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`rounded-xl px-6 py-3 ${activeTab === tab ? "bg-[#1C2632] text-white" : "text-gray-600 hover:bg-gray-100"}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    );
  }