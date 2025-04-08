"use client";
import React, { useEffect, useState } from "react";
import { useDraw } from "../hooks/useDraw";
import { rectHandleMouseDown, rectHandleMouseMove, rectHandleMouseUp } from "../tools/rect";
import { circleHandleMouseDown, circleHandleMouseMove, circleHandleMouseUp } from "../tools/circle";
import { lineHandleMouseDown, lineHandleMouseMove, lineHandleMouseUp } from "../tools/line";

const Canvas = () => {


  const {canvasRef, isDrawingRef, startPosRef, toolRef, colorRef, shiftPressed} = useDraw();

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
    canvas?.focus();

    const handleMouseDown = (event: MouseEvent) => {

      if(toolRef.current == "rect") {
        rectHandleMouseDown(event, canvas, startPosRef, isDrawingRef );
      }

      if(toolRef.current == "circle") {
        circleHandleMouseDown(event, canvas, startPosRef, isDrawingRef );
      }

      if(toolRef.current == "line") {
        lineHandleMouseDown(event, canvas, startPosRef, isDrawingRef );
      }

    };
    const handleMouseMove = (event: MouseEvent) => {

      if(toolRef.current == "rect" ) {
        rectHandleMouseMove(event, canvas, ctx, startPosRef, isDrawingRef, colorRef, shiftPressed)
      } 

      if(toolRef.current == "circle" ) {
        circleHandleMouseMove(event, canvas, ctx, startPosRef, isDrawingRef, colorRef, shiftPressed)
      } 

      if(toolRef.current == "line" ) {
        lineHandleMouseMove(event, canvas, ctx, startPosRef, isDrawingRef, colorRef, shiftPressed)
      } 
      
    };

    const handleMouseUp = (event: MouseEvent) => {

      if(toolRef.current == "rect") {
        rectHandleMouseUp(event, canvas, ctx, startPosRef, isDrawingRef, colorRef, shiftPressed);
      } 

      if(toolRef.current == "circle" ) {
        circleHandleMouseUp(event, canvas, ctx, startPosRef, isDrawingRef, colorRef, shiftPressed)
      } 
      if(toolRef.current == "line" ) {
        lineHandleMouseUp(event, canvas, ctx, startPosRef, isDrawingRef, colorRef, shiftPressed)
      }


      isDrawingRef.current = false;
      startPosRef.current = null;

    };

    const handleKeyDown = (event:KeyboardEvent) => {
      if(event.key =="Shift") {

        shiftPressed.current = true;
        console.log("shift pressed")
      }
    }
    
    const handleKeyUp = (event:KeyboardEvent) => {
      if(event.key =="Shift") {
        shiftPressed.current = false;
        console.log("shift lifted")
      }
    }

    


    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    
    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
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
