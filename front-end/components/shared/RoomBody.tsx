"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const RoomBody = () => {
  const [file, setFile] = useState<File | null>(null);

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      console.log(file);
    }
  };

  return (
    <div className=" h-full flex items-center justify-center">
      <div className="fixed bottom-10 ">
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <Input type="file" onChange={handlechange} multiple />
            <Button type="submit" className="absolute top-0 right-0">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomBody;
