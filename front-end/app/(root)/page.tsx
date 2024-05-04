import MainBody from "@/components/shared/MainBody";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <div className="dark md:h-screen h- w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2]overflow-hidden">
      <div className=" relative flex justify-center pt-12">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <p className="text-4xl md:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
          Send Images with Zero Compression
        </p>
      </div>
      <MainBody />
      <Toaster />
    </div>
  );
}
