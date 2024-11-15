"use client";

import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export default function Carousel() {
  return (
    <div className="flex flex-col antialiased bg-white dark:bg-[#1D232A] dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden w-full">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="normal"
      />
    </div>
  );
}

const testimonials = [
  {
    id: 1,
    image: "/tourist_spot_1.jpeg",
  },
  {
    id: 2,
    image: "/tourist_spot_2.jpeg",
  },
  {
    id: 3,
    image: "/tourist_spot_3.jpeg",
  },
  {
    id: 4,
    image: "/tourist_spot_4.jpeg",
  },
  {
    id: 5,
    image: "/tourist_spot_5.jpeg",
  },
  {
    id: 6,
    image: "/tourist_spot_6.jpeg",
  },
  {
    id: 7,
    image: "/tourist_spot_7.jpeg",
  },
  {
    id: 8,
    image: "/tourist_spot_8.jpeg",
  },
  {
    id: 9,
    image: "/tourist_spot_9.jpeg",
  },
  {
    id: 10,
    image: "/tourist_spot_10.jpeg",
  },
  {
    id: 11,
    image: "/tourist_spot_11.jpeg",
  },
  {
    id: 12,
    image: "/tourist_spot_12.jpeg",
  },
  {
    id: 13,
    image: "/tourist_spot_13.jpeg",
  },
  {
    id: 14,
    image: "/tourist_spot_14.jpeg",
  },
];
