"use client";

import React, { useEffect } from "react";
import HotelCard from "@/components/cards/HotelCard";
import { useState } from "react";
import Loading from "@/components/Loading";
import axios from "axios";
import { IoMdAddCircle } from "react-icons/io";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

const page = () => {
  const [hotels, setHotels] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getHotels = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = jwtDecode(token).sub;
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/hotel/getHotelsByUserId?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setShowLoading(false);
          setHotels(response.data);
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
            Your Hotels Listed On The Platform
          </p>
          <div
            className={`flex font-sans text-gray-700 px-3 py-2 rounded-full shadow-md shadow-gray-400 bg-slate-200 hover:bg-slate-300 cursor-pointer items-center w-[13rem]`}
            onClick={() =>
              router.push("/services/accommodation/yourHotels/addHotel")
            }
          >
            <IoMdAddCircle className="text-lg mr-2" />
            <p className="font-bold truncate text-sm">Add New Hotel</p>
          </div>
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
