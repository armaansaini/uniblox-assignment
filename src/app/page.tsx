"use client";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      Uniblox Assignment
      <Button
        onClick={() => {
          console.log("hello");
        }}
      >
        Click me!
      </Button>
    </div>
  );
}
