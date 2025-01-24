"use client";

import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Loading from "@/components/Loading";
import RoomCard from "@/components/cards/RoomCard";
import { IoMdAddCircle } from "react-icons/io";
import { usePathname } from "next/navigation";
import axios from "axios";
import AddRoomDialog from "@/components/dialogs/AddRoomDialog";

const page = () => {
  const [showLoading, setShowLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [hotelRooms, setHotelRooms] = useState([]);
  const pathname = usePathname();
  const dialogRef = useRef(null);

  useEffect(() => {
    const getRooms = async () => {
      try {
        const token = localStorage.getItem("token");
        const hotelId = pathname.split("/").pop();
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/hotel/getRoomsByHotelId?hotelId=${hotelId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setShowLoading(false);
          if (response.data.length === 0) {
            setMessage("No rooms found for this hotel");
          }
          setHotelRooms(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getRooms();
  }, []);

  return (
    <div className="w-full overflow-y-auto">
      <div
        className={`w-full bg-gray-700 p-4 shadow-md shadow-gray-400 rounded-bl-xl`}
      >
        <div className="flex w-full items-center justify-between px-6">
          <p className="text-white text-xl font-bold">
            The rooms of your hotel
          </p>
          <div
            className={`flex font-sans text-gray-700 px-3 py-2 rounded-full shadow-md shadow-gray-400 bg-slate-200 hover:bg-slate-300 cursor-pointer items-center w-[13rem]`}
            onClick={() => dialogRef.current.click()}
          >
            <IoMdAddCircle className="text-lg mr-2" />
            <p className="font-bold truncate text-sm">Add New Room</p>
          </div>
        </div>
      </div>
      {message === "" && (
        <div className={`px-4 py-5 max-w-[1050px] mx-auto`}>
          {hotelRooms.length !== 0 &&
            hotelRooms.map((room) => (
              <div key={room.id} className="w-full flex justify-center">
                <RoomCard room={room} />
              </div>
            ))}
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
      <AddRoomDialog dialogRef={dialogRef} isEdit={false} />
    </div>
  );
};

export default page;
