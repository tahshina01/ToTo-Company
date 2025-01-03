"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import axios from "axios";
// import { handleUnauthorized } from "@/app/utils/unauthorized";
import { useState } from "react";
import { useGlobals } from "@/contexts/Globals";
import Accommodation from "@/public/accomodation.jpg";

const HotelCard = ({ hotel }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [rating, setRating] = useState(hotel.rating);
  const { setToastMessage, setIsLoggedIn } = useGlobals();

  const handleNavigate = () => {
    router.push(`${pathname}/${hotel.id}`);
  };

  useEffect(() => {
    const getRating = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/review/hotelRating?hotelId=${hotel.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setRating(response.data);
        }
      } catch (error) {
        console.log(error);
        if (error.response.status === 401) {
          handleUnauthorized(setIsLoggedIn, setToastMessage, router);
        }
      }
    };
    // getRating();
  }, []);

  return (
    <div
      className={`w-full max-w-[19.4rem] h-[16.8rem] rounded-lg shadow-md bg-base-100 border-2 border-gray-200 cursor-pointer card-hover`}
      onClick={handleNavigate}
    >
      {hotel.image ? (
        <img
          src={`data:image/jpeg;base64,${hotel.image}`}
          alt="logo"
          className="bg-red-100 w-full h-[10rem] rounded-tl-lg rounded-tr-lg border-b-2 border-b-gray-200"
        />
      ) : (
        <Image
          placeholder="blur"
          src={Accommodation}
          alt="logo"
          className="bg-red-100 w-full h-[10rem] rounded-tl-lg rounded-tr-lg border-b-2 border-b-gray-200"
        />
      )}
      <p className="text-lg font-bold text-gray-700 mt-2 pl-3 pr-3 truncate">
        {hotel.name}
      </p>
      <p className="text-sm text-gray-600 mt-1 pl-3 pr-3 truncate">
        {hotel.location ? hotel.location : "No Address"}
      </p>
      <div className="mt-1 flex gap-1 w-[5rem] justify-center items-center font-bold text-white bg-green-700 ml-auto rounded-sm text-sm pt-1 pb-1 mr-3 mb-2">
        {rating === "" ? (
          <p className="text-[0.75rem] truncate">No Rating</p>
        ) : (
          <>
            {rating.toFixed(2)} <FaStar />
          </>
        )}
      </div>
    </div>
  );
};

export default HotelCard;
