"use client";
import RoomBody from "@/components/shared/RoomBody";
import { useParams } from "next/navigation";
import React from "react";

export default function Page({ params }: { params: { slug: string } }) {
  const { id } = useParams();
  return (
    <div className="dark md:h-screen h-screen w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
      <div className=" relative flex justify-start pl-7">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <p className="text-2xl sm:text-4xl md:text-6xl font-bold z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 fixed ">
          Quickture
        </p>
      </div>
      <RoomBody id={id as string} />
    </div>
  );
}
