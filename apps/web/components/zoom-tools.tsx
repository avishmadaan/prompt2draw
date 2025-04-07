import { Button } from "@repo/ui/button";
import { Minus, Plus,  } from "lucide-react";
import React from "react";

const ZoomTools = ({
  className
}:{
  className?:string
}) => {
  return (
    <div className= {`border dark:bg-gray-950 rounded-2xl px-4  flex g items-center  ${className} `}>

      <Button
      variant="secondary"
      className=" dark:bg-gray-950  rounded-2xl px-0 py-0"
      >

        <Minus />
      </Button>

      <h1 className="">100X</h1>

      <Button
      variant="secondary"
      className=" dark:bg-gray-950  rounded-2xl px-0 py-0"
      >
       <Plus />
      </Button>
    </div>
  );
};

export default ZoomTools;
