"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import Spline from "@splinetool/react-spline";
import { cn } from "@/utils/cn";
import { GenerateHash, validateHash } from "../../utils/crypto";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Checkbox } from "../ui/checkbox";
import SlideMotionDiv from "../ui/slide-motion-div";

const MainBody = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex justify-center md:flex-row flex-col", className)}>
      <div className="md:h-[479px] h-[400px] w-full lg:w-1/2">
        <Spline scene="https://prod.spline.design/s5T-Zc838kcifc88/scene.splinecode" />
      </div>
      <UserForm />
    </div>
  );
};

const UserForm = () => {
  const [code, setCode] = useState("");
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const { toast } = useToast();

  const joinRoom = (code: string) => {
    if (!validateHash(code)) {
      alert("Invalid code, please ensure that your code is Correct.");
      return;
    }
    // Navigate to the room using the router
    router.push(`/room/${code}`);
  };

  const createRoom = () => {
    const new_code = GenerateHash();
    setCode(new_code);
    navigator.clipboard.writeText(new_code);
    toast({
      title: "Your code has been copied to the clipboard!",
      description: "Share it with your friends to join the room.",
    });
    // Navigate to the new room
    router.push(`/room/${new_code}`);
  };

  const saveInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };
  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  return (
    <div className="flex justify-center flex-col pb-10 px-5 w-full max-w-[600px]">
      <SlideMotionDiv delay={0.25}>
        <div className="flex relative h-14 w-full max-w-[600px] group">
          <div className="absolute w-full">
            <Input
              className="w-full "
              placeholder="Enter code here"
              value={code}
              onChange={saveInput}
            />
          </div>
          <Button
            className="absolute top-[0.12rem] right-0 h-full z-10"
            onClick={() => joinRoom(code)}
          >
            Join Room
          </Button>
        </div>
      </SlideMotionDiv>
      <SlideMotionDiv delay={0.5}>
        <Button className="h-14 mt-5 w-full max-w-[600px]" onClick={createRoom}>
          Create Room
        </Button>
      </SlideMotionDiv>
      <div className="flex items-center pl-8 mt-2">
        <SlideMotionDiv delay={0.62}>
          <Checkbox
            id="terms"
            checked={isChecked}
            onCheckedChange={handleCheckboxChange}
          />
          <label htmlFor="terms" className="text-sm font-medium pl-2">
            Wanna save images for 7 days?
          </label>
        </SlideMotionDiv>
      </div>
    </div>
  );
};

export default MainBody;
