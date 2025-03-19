import { Button } from "@repo/ui/button";
import { Minus, Plus, ZoomIn, ZoomOut } from "lucide-react";
import React from "react";

const ZoomTools = () => {
  return (
    <div className="border bg-gray-950 rounded-2xl px-4 p-4 flex gap-6 items-center">

      <Button
      variant="secondary"
      className=" !bg-gray-950  rounded-2xl px-0 py-0"
      >

        <Minus />
      </Button>

      <h1 className="">100X</h1>

      <Button
      variant="secondary"
      className=" !bg-gray-950  rounded-2xl px-0 py-0"
      >
       <Plus />
      </Button>
    </div>
  );
};

export default ZoomTools;
