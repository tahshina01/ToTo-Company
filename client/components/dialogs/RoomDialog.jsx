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

const RoomDialog = ({ dateDiff, room }) => {
  const buttonRef = useRef(null);
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState("right"); // Slide direction
  const imageRef = useRef([]);

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
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] max-h-[96svh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Room Details</DialogTitle>
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
            {room.images.map((image, i) => (
              <img
                key={i}
                src={`data:image/jpeg;base64,${image.data}`}
                ref={(element) => (imageRef.current[i] = element)}
                onClick={() => toggleFullscreen(imageRef.current[i])}
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
          {index < room.images.length - 1 && (
            <div
              onClick={handleNext}
              className="text-2xl font-bold rounded-full w-10 h-10 flex justify-center items-center absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-200 cursor-pointer"
            >
              {">"}
            </div>
          )}
        </div>
        <p>{room.description}</p>
        <div className="text-[1rem]">
          <span className="font-semibold">Price : </span>
          {room.price} /- per night
        </div>
        <div className="text-[1rem]">
          <span className="font-semibold">Number of Days : </span>
          {dateDiff} days
        </div>
        <div className="text-[1rem]">
          <span className="font-semibold">Total cost : </span>
          {room.price * dateDiff} /-
        </div>
        <DialogFooter>
          <Button
            className="w-[6rem] font-bold"
            onClick={() => {
              buttonRef.current.click();
            }}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RoomDialog;
