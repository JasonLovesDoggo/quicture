import RoomBody from "@/components/shared/RoomBody";
import React from "react";

const page = () => {
  return (
    <div className="dark md:h-screen h-screen w-full dark:bg-black bg-white   dark:bg-dot-white/[0.2] bg-dot-black/[0.2]overflow-hidden">
      <div className=" relative flex justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <p className="text-3xl font-bold z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 absolute">
          Quickture
        </p>
      </div>
      <RoomBody />
    </div>
  );
};

export default page;
