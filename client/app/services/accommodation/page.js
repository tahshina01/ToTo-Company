"use client";

import React, { useEffect } from "react";
import HotelCard from "@/components/cards/HotelCard";
import { useState } from "react";
import Loading from "@/components/Loading";
import axios from "axios";
import { FaHome } from "react-icons/fa";
import { useRouter } from "next/navigation";

const ratings = [-1, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

const page = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(-1);
  const router = useRouter();

  useEffect(() => {
    const getHotels = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/hotel/getHotels`,
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

  useEffect(() => {
    let filteredHotels = hotels;
    if (name !== "") {
      filteredHotels = hotels.filter((hotel) =>
        hotel.name.toLowerCase().includes(name.toLowerCase())
      );
    }
    if (location !== "") {
      filteredHotels = filteredHotels.filter((hotel) =>
        hotel.address.toLowerCase().includes(location.toLowerCase())
      );
    }
    if (rating !== 0) {
      filteredHotels = filteredHotels.filter((hotel) => hotel.rating >= rating);
    }
    setFilteredHotels(filteredHotels);
  }, [name, location, rating, hotels]);

  return (
    <div className="w-full overflow-y-auto scrollbar-hide">
      <div
        className={`w-full bg-gray-700 p-4 shadow-md shadow-gray-400 rounded-bl-xl`}
      >
        <div className="flex w-full items-center justify-between px-6 mb-4">
          <p className="text-white text-xl font-bold">
            Find best hotels here during your travel
          </p>
          <div
            className={`flex font-sans text-gray-700 px-3 py-2 rounded-full shadow-md shadow-gray-400 bg-slate-200 hover:bg-slate-300 cursor-pointer items-center w-[13rem]`}
            onClick={() => router.push("/services/accommodation/yourHotels")}
          >
            <FaHome className="text-lg mr-2" />
            <p className="font-bold truncate text-sm">Your Hotels</p>
          </div>
        </div>
        <div className="flex w-full items-center justify-between px-6">
          <input
            type="text"
            placeholder="Search name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-7 w-56 rounded-md pl-3"
          />
          <input
            type="text"
            placeholder="Search location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="h-7 w-56 rounded-md pl-3"
          />
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="h-7 w-56 rounded-md pl-3"
            placeholder="Minimum rating"
          >
            {ratings.map((rating, index) => (
              <option key={index} value={rating}>
                {rating === -1
                  ? "Minimum rating"
                  : `${rating.toFixed(1)} stars`}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div
        className={`px-4 py-5 grid grid-cols-4 gap-x-2 gap-y-5 max-w-[1350px] mx-auto`}
      >
        {filteredHotels.length !== 0 &&
          filteredHotels.map((hotel) => (
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
