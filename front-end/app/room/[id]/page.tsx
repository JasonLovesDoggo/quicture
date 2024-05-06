"use client";
import RoomBody from "@/components/shared/RoomBody";
import SlideMotionDiv from "@/components/ui/slide-motion-div";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

export default function Page({ params }: { params: { slug: string } }) {
  const { id } = useParams();
  console.log(params.slug);
  return (
    <div className=" md:h-screen h-screen w-full bg-black bg-dot-white/[0.2] ">
      <div className=" relative flex justify-start pl-7">
        <Link href="/">
          <SlideMotionDiv delay={0.5} fadeDirection="down">
            <p className="text-2xl sm:text-4xl md:text-6xl font-bold z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 mt-8 fixed ">
              Quicture
            </p>
          </SlideMotionDiv>
        </Link>
      </div>
      <RoomBody id={id as string} />
    </div>
  );
}
