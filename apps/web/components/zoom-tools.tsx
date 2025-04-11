import { Button } from "@repo/ui/button";
import { Minus, Plus,  } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDraw } from "../hooks/useDraw";

const ZoomTools = ({
  className
}:{
  className?:string
}) => {

    const {zoomRef, canvasRef, shapesRef, reDrawShapes} = useDraw();

    const [zoom, setZoom] = useState<number>(1);

    const callRedraw = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      
      if (!canvas || !ctx) return;

      reDrawShapes()
}


    const handleZoomIn =() => {

      zoomRef.current = Number(Math.min(zoomRef.current +0.1, 2).toFixed(1));
      setZoom(zoomRef.current)
      callRedraw()

    }

    const handleZoomOut = () => {
      zoomRef.current = Number(Math.max(zoomRef.current -0.1, 0.1).toFixed(1));
      setZoom(zoomRef.current)
      callRedraw()

    }

  return (
    <div className= {`border dark:bg-gray-950 rounded-2xl px-4  flex gap-8 items-center  ${className} `}>

      <Button
      variant="secondary"
      className=" dark:bg-gray-950  rounded-2xl !px-0 !py-0"
      onClick={handleZoomOut}
      >

        <Minus />
      </Button>

      <h1 className="">{(zoom*100).toFixed(0) }%</h1>

      <Button
      variant="secondary"
      className=" dark:bg-gray-950  rounded-2xl !px-0 !py-0"
      onClick={handleZoomIn}
      >
       <Plus />
      </Button>
    </div>
  );
};

export default ZoomTools;
