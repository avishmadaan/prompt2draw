"use client";
import React, { useEffect } from "react";
import { useDraw } from "../hooks/useDraw";
import { circleHandleMouseDown, circleHandleMouseMove, circleHandleMouseUp } from "../tools/circle";
import { lineHandleMouseDown, lineHandleMouseMove, lineHandleMouseUp } from "../tools/line";
import { handeHandleMouseDown, handHandleMouseMove } from "../tools/hand";
import UseRectTool from "../hooks/useRectTool";

const Canvas = () => {


  const {canvasRef, isDrawingRef, startPosRef, toolRef, colorRef, shiftPressed, shapesRef, zoomRef, offSet} = useDraw();

  const { rectHandleMouseDown, rectHandleMouseMove, rectHandleMouseUp} = UseRectTool() || {};

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



  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    
    if (!canvas || !ctx) return;
    canvas?.focus();

    const handleMouseDown = (event: MouseEvent) => {

      if(toolRef.current == "rect" && rectHandleMouseDown) {
        rectHandleMouseDown(event);
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

      if(toolRef.current == "rect" && rectHandleMouseMove) {
        rectHandleMouseMove(event)
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
      if(toolRef.current == "select" ) {
        handHandleMouseMove(event, canvas, ctx, startPosRef, isDrawingRef, colorRef, shiftPressed, shapesRef.current, zoomRef.current, offSet)
      } 


      
    };

    const handleMouseUp = (event: MouseEvent) => {

      if(toolRef.current == "rect" && rectHandleMouseUp ) {
        rectHandleMouseUp(event);
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
