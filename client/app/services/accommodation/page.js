"use client";

import React, { useEffect } from "react";
import HotelCard from "@/components/cards/HotelCard";
import { useState } from "react";
import Loading from "@/components/Loading";

const data = [
  { id: 1, image: null, name: "hotel abcd", location: "dhaka", rating: 4.5 },
  {
    id: 2,
    image: null,
    name: "bangla restaura",
    location: "cumilla",
    rating: 4.0,
  },
  { id: 3, image: null, name: "mcdonals", location: "london", rating: 3.9 },
  {
    id: 4,
    image: null,
    name: "american hotel",
    location: "america",
    rating: 4.2,
  },
  { id: 5, image: null, name: "last one", location: "dhaka", rating: 4.5 },
];

const ratings = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

const page = () => {
  const [hotels, setHotels] = useState(data);
  const [showLoading, setShowLoading] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    let filteredHotels = data;
    if (name !== "") {
      filteredHotels = hotels.filter((hotel) =>
        hotel.name.toLowerCase().includes(name.toLowerCase())
      );
    }
    if (location !== "") {
      filteredHotels = filteredHotels.filter((hotel) =>
        hotel.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    if (rating !== 0) {
      filteredHotels = filteredHotels.filter((hotel) => hotel.rating >= rating);
    }
    setHotels(filteredHotels);
  }, [name, location, rating]);

  return (
    <div className="w-full overflow-y-auto scrollbar-hide">
      <div
        className={`w-full flex items-center justify-between bg-gray-700 p-2 pl-4 pr-4 min-h-[4rem] shadow-md shadow-gray-400 rounded-bl-xl`}
      >
        <div className="flex w-full items-center justify-between px-6">
          <input
            type="text"
            placeholder="Search landmarks..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-7 w-56 rounded-md pl-3"
          />
          <input
            type="text"
            placeholder="Search landmarks..."
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
                {rating === 0 ? "Minimum rating" : `${rating.toFixed(1)} stars`}
              </option>
            ))}
          </select>
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
