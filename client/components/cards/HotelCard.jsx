"use client";

import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useGlobals } from "@/contexts/Globals";
import Accommodation from "@/public/accomodation.jpg";
import EditHotelDialog from "@/components/dialogs/EditHotelDialog";
import AdminHotelDialog from "@/components/dialogs/AdminHotelDialog";

const HotelCard = ({ hotel }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { setToastMessage, setIsLoggedIn } = useGlobals();

  const handleNavigate = () => {
    router.push(`${pathname}/${hotel.id}`);
  };

  return (
    <div
      className={`w-full max-w-[19.4rem] ${
        pathname.includes("/admin") ? "h-[17.2rem]" : "h-[16.8rem]"
      } rounded-lg shadow-md bg-base-100 border-2 border-gray-200 cursor-pointer card-hover`}
      onClick={() => {
        if (!pathname.includes("/yourHotels") && !pathname.includes("/admin")) {
          handleNavigate();
        }
      }}
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
        {hotel.address ? hotel.address : "No Address"}
      </p>
      {!pathname.includes("/yourHotels") && !pathname.includes("/admin") && (
        <div className="mt-1 flex gap-1 w-[5rem] justify-center items-center font-bold text-white bg-green-700 ml-auto rounded-sm text-sm pt-1 pb-1 mr-3 mb-2">
          {hotel.rating === -1 ? (
            <p className="text-[0.75rem] truncate">No Rating</p>
          ) : (
            <>
              {hotel.rating.toFixed(2)} <FaStar />
            </>
          )}
        </div>
      )}
      {pathname.includes("/yourHotels") && (
        <div className="flex items-center w-full justify-between px-3 my-2">
          <button
            className="font-bold text-sm py-1 px-2 bg-gray-600 hover:bg-slate-900 text-white rounded"
            onClick={handleNavigate}
          >
            Details
          </button>
          <EditHotelDialog hotel={hotel} />
        </div>
      )}
      {pathname.includes("/admin") && (
        <div className="flex items-center w-full justify-end px-3 my-2">
          <AdminHotelDialog hotel={hotel} />
        </div>
      )}
    </div>
  );
};

export default HotelCard;
