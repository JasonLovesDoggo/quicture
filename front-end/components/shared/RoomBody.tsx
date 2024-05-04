"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { ParallaxScroll } from "../ui/parallax-scroll";

const RoomBody = () => {
  const [images, setImages] = useState<string[]>([]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).filter((file) =>
        file.type.startsWith("image/")
      );
      const imageUrls = filesArray.map((file) => URL.createObjectURL(file));
      setImages(imageUrls);
      // Additional logic to handle the submission can be added here
    }
  };

  return (
    <div className="h-screen flex items-center sm:justify-center">
      <ParallaxScroll images={images} />
      <div className="fixed bottom-10">
        <Input type="file" onChange={handleChange} multiple accept="image/*" />
      </div>
    </div>
  );
};

export default RoomBody;
