import { Button } from "@repo/ui/button";
import { Minus, Plus,  } from "lucide-react";
import React, {  useState } from "react";
import { useDraw } from "../hooks/useDraw";

const ZoomTools = ({
  className
}:{
  className?:string
}) => {

    const {zoomRef, canvasRef, reDrawShapes, } = useDraw();
    const {scaleOffSetRef } = useDraw();

    const [zoom, setZoom] = useState<number>(1);

    const callRedraw = () => {
      // const canvas = canvasRef.current;
      // const ctx = canvas?.getContext("2d");
      
      // if (!canvas || !ctx) return;

      reDrawShapes()
}

    const handleZoomReset = () => {

      zoomRef.current =1;
      setZoom(zoomRef.current);
      setOffSet();
      callRedraw();

      setOffSet();


    }


    const handleZoomIn =() => {

      zoomRef.current = Number(Math.min(zoomRef.current +0.1, 4).toFixed(1));
      setZoom(zoomRef.current)
      setOffSet();

      
      callRedraw()

    }

    const handleZoomOut = () => {
      zoomRef.current = Number(Math.max(zoomRef.current -0.1, 0.1).toFixed(1));
      setZoom(zoomRef.current)
      setOffSet();
      callRedraw()

    }

    const setOffSet = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const widthChanged = Number((((zoomRef.current -1) * canvas.width)/2).toFixed(1));
      const heightChanged = Number((((zoomRef.current -1) * canvas.height)/2).toFixed(1));

      scaleOffSetRef.current = {
        x:widthChanged,
        y:heightChanged
      }



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

      <h1 className="cursor-pointer" onClick={handleZoomReset}>{(zoom*100).toFixed(0) }%</h1>

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
