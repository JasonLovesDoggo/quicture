"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import Spline from "@splinetool/react-spline";
import { cn } from "@/utils/cn";
import { GenerateHash, validateHash } from "../../utils/crypto";
import { useToast } from "@/components/ui/use-toast";

const MainBody = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "flex justify-around items-center md:flex-row flex-col",
        className
      )}
    >
      <div className="h-[479px] w-full lg:w-1/2">
        <Spline scene="https://prod.spline.design/s5T-Zc838kcifc88/scene.splinecode" />
      </div>
      <UserForm />
    </div>
  );
};

const UserForm = () => {
  const [code, setCode] = useState("");

  const { toast } = useToast();

  const joinRoom = (code: string) => {
    if (!validateHash(code)) {
      alert(
        "Invalid code, please ensure that your code is 32 characters long and only contains alphanumeric characters."
      );
    }
    // Add logic for joining room
  };

  const createRoom = () => {
    setCode(GenerateHash());
    navigator.clipboard.writeText(code);
    toast({
      title: "Your code has been copied to the clipboard!",
      description: "Share it with your friends to join the room.",
    });
  };

  const saveInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  return (
    <div className="flex justify-center items-end flex-col gap-20 pb-10">
      <div className="relative w-[600px]">
        <Input
          className="w-full"
          placeholder="Enter code here"
          value={code}
          onChange={saveInput}
        />
        <Button
          className="absolute right-0 top-0"
          onClick={() => joinRoom(code)}
        >
          Join Room
        </Button>
      </div>
      <Button className="h-14 w-[600px]" onClick={createRoom}>
        Create Room
      </Button>
    </div>
  );
};

export default MainBody;
