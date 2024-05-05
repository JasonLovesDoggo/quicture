"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { ParallaxScroll } from "../ui/parallax-scroll";
import { Download } from "lucide-react";
import SlideMotionDiv from "../ui/slide-motion-div";

const RoomBody = ({ id }: { id: string }) => {
  const [images, setImages] = useState<string[]>([]);
  // console.log("prev images", images);
  setTimeout(() => {
      // console.log(process.env.NEXT_PUBLIC_BACKEND);
      (async () =>
        setImages(
          await (
            await fetch(process.env.NEXT_PUBLIC_BACKEND + `/list/${id}/`)
          ).json()
        ))();
  }
    , 900);
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.table(e.target.files);
    if (e.target.files) {
      const formData = new FormData(); // Create a new FormData object
      const imgArray = Array.from(e.target.files);

      imgArray.forEach((file: File) => {
        formData.append("files", file);
      });
      const options = {
        method: "POST",
        accept: "application/json",
        body: formData,
      };

      // Send the request with fetch
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_BACKEND! + `/upload-multi/${id}/`,
          options
        );

        if (!response.ok) {
          throw new Error(
            `Failed to upload files: ${response.status} ${response.statusText}`
          );
        }

        // Parse response if needed
        const responseData = await response.text();

        // Print the response
        console.log(responseData);
        setImages(
          await (
            await fetch(process.env.NEXT_PUBLIC_BACKEND + `/list/${id}/`)
          ).json()
        );
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    }
  };
  useEffect(() => {
    // console.log(process.env.NEXT_PUBLIC_BACKEND);
    (async () =>
      setImages(
        await (
          await fetch(process.env.NEXT_PUBLIC_BACKEND + `/list/${id}/`)
        ).json()
      ))();
  }, [id]);

  const handleDownloadAll = () => {
    images.forEach((image) => {
      const link = document.createElement("a");
      link.href = image;
      link.download = image.substring(image.lastIndexOf("/") + 1);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <div className="h-screen flex items-center sm:justify-center">
      {images.length > 0 && (
        <div className="absolute right-16 top-20 cursor-pointer flex gap-1 z-10">
          <Download className="" onClick={handleDownloadAll} />
          Download All
        </div>
      )}
      <ParallaxScroll images={images} />
      <div className="fixed bottom-10">
        <SlideMotionDiv delay={0.5}>
          <Input
            type="file"
            onChange={handleChange}
            multiple
            accept="image/*"
          />
        </SlideMotionDiv>
      </div>
    </div>
  );
};

export default RoomBody;
