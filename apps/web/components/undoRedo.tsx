import { Button } from "@repo/ui/button";
import { Minus, Plus, Redo, Undo,  } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDraw } from "../hooks/useDraw";
import { reDrawShapes } from "../utils/redraw";

const UndoRedo = ({
  className
}:{
  className?:string
}) => {

    const {zoomRef, canvasRef, shapesRef} = useDraw();

    const [zoom, setZoom] = useState<number>(1);

    const callRedraw = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      
      if (!canvas || !ctx) return;

      reDrawShapes(ctx, canvas, shapesRef.current, zoomRef.current)
}


    const handleUndo =() => {

      zoomRef.current = Number(Math.min(zoomRef.current +0.1, 2).toFixed(1));
      setZoom(zoomRef.current)
      callRedraw()

    }

    const handleRedo = () => {
      zoomRef.current = Number(Math.max(zoomRef.current -0.1, 0.1).toFixed(1));
      setZoom(zoomRef.current)
      callRedraw()

    }

  return (
    <div className= {`border dark:bg-gray-950 rounded-2xl px-4  flex gap-8 items-center  ${className} `}>

      <Button
      variant="secondary"
      className=" dark:bg-gray-950  rounded-2xl !px-0 !py-0"
      onClick={handleUndo}
      >

        <Undo />
      </Button>


      <Button
      variant="secondary"
      className=" dark:bg-gray-950  rounded-2xl !px-0 !py-0"
      onClick={handleRedo}
      >
       <Redo />
      </Button>
    </div>
  );
};

export default UndoRedo;
