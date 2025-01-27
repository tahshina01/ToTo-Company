"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import RoomDialog from "@/components/dialogs/RoomDialog";
import axios from "axios";
import { usePathname } from "next/navigation";
import AddRoomDialog from "@/components/dialogs/AddRoomDialog";
import { jwtDecode } from "jwt-decode";

const RoomCard = ({ dateDiff, room, fromDate, toDate }) => {
  const pathname = usePathname();
  const dialogRef = useRef(null);

  const handlePayment = async () => {
    const hotelId = pathname.split("/").pop();
    const totalAmount = dateDiff * 1000; // Convert to cents
    try {
      const token = localStorage.getItem("token");
      const userId = jwtDecode(token).sub;
      const dataToSend = {
        hotelId,
        roomId: room.id,
        fromDate,
        toDate,
        userId,
        totalAmount,
      };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/hotel/booking`,
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/hotel/payment`,
          { amount: dateDiff * 1000 },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          window.location.href = response.data;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card w-full lg:card-side bg-base-100 shadow-md border-[0.5px] border-t-[0.7px] border-gray-200 card-hover h-[17.4rem] mb-5">
      <img
        src={
          room.images.length > 0
            ? `data:image/jpeg;base64,${room.images[0].data}`
            : "/accomodation.jpg"
        }
        alt="Album"
        className="w-[23rem] h-full object-cover rounded-l-xl"
      />
      <div className="card-body">
        <h2
          className="card-title text-[1.2rem]"
          style={{ lineHeight: "1.4rem" }}
        >
          Room Number : {room.roomNumber}
        </h2>
        <div className="text-[1rem]">
          <span className="font-semibold">Category : </span>
          {room.roomType === "SINGLE"
            ? "Single"
            : room.roomType === "DOUBLE"
            ? "Double"
            : room.roomType === "TRIPLE"
            ? "Triple"
            : room.roomType === "MASTER_SUITE"
            ? "Master Suite"
            : "Pensidential Suite"}
        </div>
        <div className="text-[1rem]">
          <span className="font-semibold">Price : </span>
          {room.price} /- per night
        </div>
        <p className="text-[1rem] line-clamp-3">
          <span className="font-semibold">Description : </span>
          {room.description}
        </p>
        <div className="card-actions justify-end gap-12">
          {!pathname.includes("/yourHotels") && (
            <RoomDialog dateDiff={dateDiff} room={room} />
          )}
          {!pathname.includes("/yourHotels") && (
            <Button className="font-bold" onClick={handlePayment}>
              Book Now
            </Button>
          )}
          {pathname.includes("/yourHotels") && (
            <Button
              className="font-bold"
              onClick={() => {
                dialogRef.current.click();
              }}
            >
              Edit
            </Button>
          )}
          <AddRoomDialog dialogRef={dialogRef} room={room} isEdit={true} />
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
