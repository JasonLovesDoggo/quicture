"use client";
import { useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { Download } from "lucide-react";

export const ParallaxScroll = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  const gridRef = useRef(null);
  const [isActiveRef, setIsActiveRef] = useState(true);

  useEffect(() => {
    const updateRefUsage = () => {
      const screenWidth = window.innerWidth;
      setIsActiveRef(screenWidth > 768); // You can change '768' to whatever breakpoint you prefer
    };

    window.addEventListener("resize", updateRefUsage);
    updateRefUsage(); // Call on initial mount

    return () => {
      window.removeEventListener("resize", updateRefUsage);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    container: isActiveRef ? gridRef : undefined,
    offset: ["start start", "end start"],
  });

  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

  // Check if images is indeed an array
  if (!Array.isArray(images)) {
    return null; // Optionally, return an error component or message
  }

  const third = Math.ceil(images.length / 3);

  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);

  return (
    <div
      className={cn("h-[40rem] items-start overflow-y-auto w-full", className)}
      ref={isActiveRef ? gridRef : null}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-5xl mx-auto gap-10 py-32 px-10"
        ref={isActiveRef ? gridRef : null}
      >
        <div className="grid gap-10 relative">
          {firstPart.map((el, idx) => (
            <div key={"grid-1" + idx} className="relative group">
              <CommonPart el={el} />
            </div>
          ))}
        </div>
        <div className="grid gap-10 relative">
          {secondPart.map((el, idx) => (
            <motion.div
              style={{ y: translateSecond }}
              key={"grid-2" + idx}
              className="relative group"
            >
              <CommonPart el={el} />
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10 relative">
          {thirdPart.map((el, idx) => (
            <motion.div
              style={{ y: translateThird }}
              key={"grid-3" + idx}
              className="relative group"
            >
              <CommonPart el={el} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CommonPart = ({ el }: { el: string }) => {
  const handleDownloadOne = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = url.substring(url.lastIndexOf("/") + 1); // Extract file name from URL
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <>
      <Image
        src={el}
        className="h-80 w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"
        height="400"
        width="400"
        alt="thumbnail"
      />
      <Download
        onClick={() => handleDownloadOne(el)}
        className="cursor-pointer absolute inset-0 m-auto w-8 h-8 opacity-0 group-hover:opacity-100 bg-zinc-900 bg-opacity-45 rounded-lg transition duration-200"
        style={{
          top: "10%",
          left: "10%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
};
