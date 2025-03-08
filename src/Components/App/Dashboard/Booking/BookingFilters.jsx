import { Search} from "lucide-react";
import React from "react";
export default function BookingFilters() {
    return (
      <div className="mb-6 flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="rounded-lg border pl-10 pr-4 py-2 w-[300px] focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex gap-2">
          <button className="rounded-lg bg-green-600 px-4 py-2 text-white">Courts</button>
          <button className="rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100">Coaches</button>
        </div>
      </div>
    );
  }