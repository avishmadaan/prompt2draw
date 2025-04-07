"use client";
import React, { useEffect, useState } from "react";
import { useDraw } from "../hooks/useDraw";
import { rectHandleMouseDown, rectHandleMouseMove, rectHandleMouseUp } from "../tools/rect";

const Canvas = () => {


  const {canvasRef, isDrawingRef, startPosRef, toolRef, colorRef} = useDraw();

  const [dimensions, setDimensions] = useState({ width: 300, height: 150 }); // default fallback

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);




  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    const handleMouseDown = (event: MouseEvent) => {

      if(toolRef.current == "rect") {
        rectHandleMouseDown(event, canvas, startPosRef, isDrawingRef );
      }

    };
    const handleMouseMove = (event: MouseEvent) => {

      if(toolRef.current == "rect" ) {
        rectHandleMouseMove(event, canvas, ctx, startPosRef, isDrawingRef, colorRef)
      } ;
      
    };

    const handleMouseUp = (event: MouseEvent) => {

      if(toolRef.current == "rect") {
        rectHandleMouseUp(event, canvas, ctx, startPosRef, isDrawingRef, colorRef);
      } ;
      isDrawingRef.current = false;
      startPosRef.current = null;

    };


    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className="inset-0 absolute w-full h-full"
    />
  );
};

export default Canvas;
