import React from "react";
import { Button } from "@/components/ui/button";

const RoomCard = () => {
  return (
    <div className="card lg:card-side bg-base-100 shadow-md border-[0.5px] border-t-[0.7px] border-gray-200 card-hover h-[17.4rem]">
      <img
        src="/accomodation.jpg"
        alt="Album"
        className="w-[23rem] h-full object-cover rounded-l-xl"
      />
      <div className="card-body">
        <h2
          className="card-title text-[1.2rem]"
          style={{ lineHeight: "1.4rem" }}
        >
          New album is released!
        </h2>
        <div className="text-[1rem]">
          <span className="font-semibold">Category : </span>
          Single
        </div>
        <div className="text-[1rem]">
          <span className="font-semibold">Price : </span>
          1000 /- per night
        </div>
        <p className="text-[1rem] line-clamp-3">
          <span className="font-semibold">Description : </span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quis nam
          assumenda. Similique blanditiis repellat hhhhhhhhhhhhhhhhhhhhhhhhhh
          iuhhgtrfder Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Pariatur ut sapiente optio quam minima accusamus provident asperiores
          sunt consequatur molestias iure beatae tempore quo illo facilis
          molestiae neque, nesciunt deserunt?
        </p>
        <div className="card-actions justify-end gap-12">
          <Button className="font-bold">View Details</Button>
          <Button className="font-bold">Book Now</Button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
