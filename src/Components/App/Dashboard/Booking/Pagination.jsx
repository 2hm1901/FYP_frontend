import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
export default function Pagination() {
    return (
        <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-500">
                Show 
                <select className="mx-2 rounded border px-2 py-1">
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                </select>
            </div>
            <div className="flex items-center gap-2">
                <button className="rounded border p-1"><ChevronLeft className="h-4 w-4" /></button>
                <button className="rounded bg-green-600 px-3 py-1 text-sm text-white">1</button>
                <button className="rounded border p-1"><ChevronRight className="h-4 w-4" /></button>
            </div>
        </div>
    );
}