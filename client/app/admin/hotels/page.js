"use client";

import React, { useEffect } from "react";
import HotelCard from "@/components/cards/HotelCard";
import { useState } from "react";
import Loading from "@/components/Loading";
import axios from "axios";
import { useRouter } from "next/navigation";

const page = () => {
  const [hotels, setHotels] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getHotels = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/hotel/getUnregisteredHotels`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setShowLoading(false);
          setHotels(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getHotels();
  }, []);

  return (
    <div className="w-full overflow-y-auto scrollbar-hide">
      <div
        className={`w-full bg-gray-700 p-4 shadow-md shadow-gray-400 rounded-bl-xl`}
      >
        <div className="flex w-full items-center justify-between px-6">
          <p className="text-white text-xl font-bold">
            The hotels that have applied for registration
          </p>
        </div>
      </div>
      <div
        className={`px-4 py-5 grid grid-cols-4 gap-x-2 gap-y-5 max-w-[1350px] mx-auto`}
      >
        {hotels.length !== 0 &&
          hotels.map((hotel) => (
            <div key={hotel.id} className="w-full flex justify-center">
              <HotelCard hotel={hotel} />
            </div>
          ))}
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
