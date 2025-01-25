"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useGlobals } from "@/contexts/Globals";

const AdminHotelDialog = ({ hotel }) => {
  const buttonRef = useRef(null);
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState("right"); // Slide direction
  const imageRef = useRef([]);
  const { setToastMessage } = useGlobals();

  const handleNext = () => {
    setDirection("right");
    setIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrev = () => {
    setDirection("left");
    setIndex((prevIndex) => prevIndex - 1);
  };

  const toggleFullscreen = (imageElement) => {
    if (!document.fullscreenElement) {
      if (imageElement.requestFullscreen) {
        imageElement.requestFullscreen();
      } else if (imageElement.mozRequestFullScreen) {
        imageElement.mozRequestFullScreen();
      } else if (imageElement.webkitRequestFullscreen) {
        imageElement.webkitRequestFullscreen();
      } else if (imageElement.msRequestFullscreen) {
        imageElement.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="font-bold" ref={buttonRef}>
          Details
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] max-h-[96svh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Hotel Details</DialogTitle>
        </DialogHeader>
        <div className="max-w-[400px] flex mx-auto overflow-hidden relative mb-[6px]">
          <div
            className={`w-full h-[250px] flex transition-transform duration-500 ${
              direction === "right" ? "translate-x-0" : "translate-x-[-100%]"
            }`}
            style={{
              transform: `translateX(-${index * 100}%)`,
            }}
          >
            {hotel.documents.map((image, i) => (
              <img
                key={i}
                ref={(element) => (imageRef.current[index] = element)}
                onClick={() => toggleFullscreen(imageRef.current[index])}
                src={`data:image/jpeg;base64,${image.data}`}
                alt={`Slide ${i}`}
                className="min-w-full h-[250px] rounded-md"
              />
            ))}
          </div>
          {index > 0 && (
            <div
              onClick={handlePrev}
              className="text-2xl font-bold rounded-full w-10 h-10 flex justify-center items-center absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-200 cursor-pointer"
            >
              {"<"}
            </div>
          )}
          {index < hotel.documents.length - 1 && (
            <div
              onClick={handleNext}
              className="text-2xl font-bold rounded-full w-10 h-10 flex justify-center items-center absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-200 cursor-pointer"
            >
              {">"}
            </div>
          )}
        </div>
        <div className="text-[1rem]">
          <span className="font-semibold">Name : </span>
          {hotel.name}
        </div>
        <div className="text-[1rem]">
          <span className="font-semibold">Owner : </span>
          {hotel.owner}
        </div>
        <div className="text-[1rem]">
          <span className="font-semibold">Address : </span>
          {hotel.address}
        </div>
        <div className="text-[1rem]">
          <span className="font-semibold">Mobile : </span>
          {hotel.mobile}
        </div>
        <DialogFooter>
          <Button
            className="w-[6rem] font-bold"
            onClick={async () => {
              try {
                const response = await axios.post(
                  `${process.env.NEXT_PUBLIC_SERVER_URL}/hotel/acceptRegistration?id=${hotel.id}`,
                  {},
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
                );
                if (response.status == 200) {
                  setToastMessage("Hotel Accepted");
                  buttonRef.current.click();
                  window.location.reload();
                }
              } catch (error) {
                console.log("Error:", error);
              }
            }}
          >
            Accept
          </Button>
          <Button
            className="w-[6rem] font-bold"
            onClick={async () => {
              try {
                const response = await axios.post(
                  `${process.env.NEXT_PUBLIC_SERVER_URL}/hotel/rejectRegistration?id=${hotel.id}`,
                  {},
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
                );
                if (response.status == 200) {
                  setToastMessage("Hotel Rejected");
                  buttonRef.current.click();
                  window.location.reload();
                }
              } catch (error) {
                console.log("Error:", error);
              }
            }}
          >
            Reject
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdminHotelDialog;
