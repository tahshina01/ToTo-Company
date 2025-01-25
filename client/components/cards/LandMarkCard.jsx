"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import RoomDialog from "@/components/dialogs/RoomDialog";
import axios from "axios";
import { usePathname } from "next/navigation";
import AddRoomDialog from "@/components/dialogs/AddRoomDialog";
import { jwtDecode } from "jwt-decode";

const LandMarkCard = ({ landmark }) => {
  const pathname = usePathname();
  const dialogRef = useRef(null);

  return (
    <div className="card w-full lg:card-side bg-base-100 shadow-md border-[0.5px] border-t-[0.7px] border-gray-200 card-hover h-[17.4rem] mb-5">
      <img
        src={
          room.images.length > 0
            ? `data:image/jpeg;base64,${landmark.images[0].data}`
            : "/landmark.jpg"
        }
        alt="Album"
        className="w-[23rem] h-full object-cover rounded-l-xl"
      />
      <div className="card-body">
        <h2
          className="card-title text-[1.2rem]"
          style={{ lineHeight: "1.4rem" }}
        >
          {landmark.name}
        </h2>
        <div className="text-[1rem]">
          <span className="font-semibold">Category : </span>
          {landmark.type}
        </div>
        <div className="text-[1rem]">
          <span className="font-semibold">Address : </span>
          {landmark.location}
        </div>
        <p className="text-[1rem] line-clamp-3">
          <span className="font-semibold">Description : </span>
          {landmark.description}
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

export default LandMarkCard;
