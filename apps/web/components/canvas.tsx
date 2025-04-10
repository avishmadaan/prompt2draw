"use client";
import React, { useEffect, useState } from "react";
import { useDraw } from "../hooks/useDraw";
import { rectHandleMouseDown, rectHandleMouseMove, rectHandleMouseUp } from "../tools/rect";
import { circleHandleMouseDown, circleHandleMouseMove, circleHandleMouseUp } from "../tools/circle";
import { lineHandleMouseDown, lineHandleMouseMove, lineHandleMouseUp } from "../tools/line";
import { reDrawShapes } from "../utils/redraw";
import { handeHandleMouseDown, handHandleMouseMove } from "../tools/hand";

const Canvas = () => {


  const {canvasRef, isDrawingRef, startPosRef, toolRef, colorRef, shiftPressed, shapesRef, zoomRef, offSet} = useDraw();

  const [dimensions, setDimensions] = useState({ width: 300, height: 150 }); // default fallback

  useEffect(() => {
    console.log("setting dimensions")
    // setDimensions({
    //   width: window.innerWidth,
    //   height: window.innerHeight,
    // });

    const canvas = canvasRef.current;

    if(canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
  }, []);

  // useEffect(() => {
  //   console.log("Shapes have updated:", shapes);
  //     //clear the canvs and preview shapes
  //     const canvas = canvasRef.current;
  //     const ctx = canvas?.getContext("2d");
  //     if (!canvas || !ctx) return;
  //   reDrawShapes(ctx, canvas, shapes)
  // }, [shapes]);


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

      if(toolRef.current == "hand") {
        handeHandleMouseDown(event, canvas, startPosRef, isDrawingRef );
      }

    };
    const handleMouseMove = (event: MouseEvent) => {

      if(toolRef.current == "rect" ) {
        rectHandleMouseMove(event, canvas, ctx, startPosRef, isDrawingRef, colorRef, shiftPressed, shapesRef.current, zoomRef.current)
      } 

      if(toolRef.current == "circle" ) {
        circleHandleMouseMove(event, canvas, ctx, startPosRef, isDrawingRef, colorRef, shiftPressed, shapesRef.current, zoomRef.current)
      } 

      if(toolRef.current == "line" ) {
        lineHandleMouseMove(event, canvas, ctx, startPosRef, isDrawingRef, colorRef, shiftPressed, shapesRef.current, zoomRef.current)
      } 

      if(toolRef.current == "hand" ) {
        handHandleMouseMove(event, canvas, ctx, startPosRef, isDrawingRef, colorRef, shiftPressed, shapesRef.current, zoomRef.current, offSet)
      } 


      
    };

    const handleMouseUp = (event: MouseEvent) => {

      if(toolRef.current == "rect") {
        rectHandleMouseUp(event, canvas, ctx, startPosRef, isDrawingRef, colorRef, shiftPressed,shapesRef.current, shapesRef,zoomRef.current);
      } 

      if(toolRef.current == "circle" ) {
        circleHandleMouseUp(event, canvas, ctx, startPosRef, isDrawingRef, colorRef, shiftPressed, shapesRef.current, shapesRef, zoomRef.current)
      } 
      if(toolRef.current == "line" ) {
        lineHandleMouseUp(event, canvas, ctx, startPosRef, isDrawingRef, colorRef, shiftPressed, shapesRef.current, shapesRef, zoomRef.current)
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
      width={""}
      height={""}
      className={`inset-0 absolute w-full h-full  border-2 !border-yellow-500 `}
    />
  );
};

export default Canvas;
