"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import Loading from "@/components/Loading";
import RoomCard from "@/components/cards/RoomCard";

const page = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [roomType, setRoomType] = useState("");
  const roomTypes = [
    "",
    "All",
    "Single",
    "Double",
    "Triple",
    "Master suite",
    "Presidential suite",
  ];

  return (
    <div className="w-full overflow-y-auto">
      <div
        className={`w-full flex items-center justify-between bg-gray-700 p-2 pl-4 pr-4 min-h-[4rem] shadow-md shadow-gray-400 rounded-bl-xl`}
      >
        <div className="flex w-full items-center justify-between px-6">
          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="h-7 w-56 rounded-md pl-3"
            placeholder="Minimum rating"
          >
            {roomTypes.map((type, index) => (
              <option key={index} value={type}>
                {type === "" ? "Select Category" : type}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={`px-4 py-5 max-w-[1050px] mx-auto`}>
        <RoomCard />
      </div>
      {showLoading && (
        <div className="col-span-4">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default page;
