"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import Loading from "@/components/Loading";
import RoomCard from "@/components/cards/RoomCard";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

const page = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [roomType, setRoomType] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [message, setMessage] = useState("");
  const [dateDiff, setDateDiff] = useState(0);
  const roomTypes = [
    "All",
    "Single",
    "Double",
    "Triple",
    "Master suite",
    "Presidential suite",
  ];

  const handleDateChange = (dates) => {
    console.log(dates);
    if (!dates || dates.length !== 2) {
      setFromDate(null);
      setToDate(null);
      setMessage("Please select the date range");
      return;
    }
    if (
      !dates[0] ||
      !dates[1] ||
      !(dates[0].$d instanceof Date) ||
      !(dates[1].$d instanceof Date) ||
      dates[0].$d > dates[1].$d
    ) {
      setFromDate(null);
      setToDate(null);
      setMessage("Invalid date");
      return;
    }
    setFromDate(dates[0]);
    setToDate(dates[1]);
    setMessage("");
    const msInDay = 24 * 60 * 60 * 1000; // Milliseconds in a day
    const differenceInDays = Math.round((dates[1].$d - dates[0].$d) / msInDay);
    setDateDiff(differenceInDays + 1);
  };

  useEffect(() => {
    handleDateChange([]);
  }, []);

  return (
    <div className="w-full overflow-y-auto">
      <div
        className={`w-full flex items-center justify-between bg-gray-700 p-2 pl-4 pr-4 min-h-[4rem] shadow-md shadow-gray-400 rounded-bl-xl`}
      >
        <div className="flex w-full items-center gap-2 px-6">
          <span className="text-white font-bold text-[1rem]">
            Select Date :
          </span>
          <RangePicker format="DD-MM-YYYY" onChange={handleDateChange} />
        </div>
        <div className="flex w-full items-center justify-end gap-2 px-6">
          <span className="text-white font-bold text-[1rem]">
            Select Category :
          </span>
          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="h-7 w-56 rounded-md pl-3"
            placeholder="Minimum rating"
          >
            {roomTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
      {message === "" && (
        <div className={`px-4 py-5 max-w-[1050px] mx-auto`}>
          <RoomCard dateDiff={dateDiff} />
          <div className="mb-5" />
          <RoomCard dateDiff={dateDiff} />
          <div className="mb-5" />
          <RoomCard dateDiff={dateDiff} />
          <div className="mb-5" />
          <RoomCard dateDiff={dateDiff} />
        </div>
      )}
      {message !== "" && (
        <p className="text-md col-span-4 font-serif text-gray-700 w-full mt-[300px] flex justify-center items-center">
          {message}
        </p>
      )}
      {showLoading && (
        <div className="col-span-4">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default page;
