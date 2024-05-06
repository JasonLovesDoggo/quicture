import MainBody from "@/components/shared/MainBody";
import SlideMotionDiv from "@/components/ui/slide-motion-div";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <div className="md:h-screen h-svh w-full bg-black bg-grid-white/[0.2] md:overflow-hidden overflow-x-hidden">
      <div className=" relative flex items-center justify-center md:pt-12">
        <SlideMotionDiv delay={0.25} fadeDirection="down">
          <p className="text-4xl md:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 px-3 ">
            Send Images with Zero Compression
          </p>
        </SlideMotionDiv>
      </div>
      <MainBody />
      <Toaster />
    </div>
  );
}
