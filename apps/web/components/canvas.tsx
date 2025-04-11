"use client";
import React, { useEffect } from "react";
import { useDraw } from "../hooks/useDraw";
import useRectTool from "../hooks/useRectTool";
import useCircleTool from "../hooks/useCircleTool";
import useLineTool from "../hooks/useLineTool";
import useHandTool from "../hooks/useHandTool";

const Canvas = () => {


  const {canvasRef, isDrawingRef, startPosRef, toolRef, colorRef, shiftPressed, shapesRef, zoomRef, offSet} = useDraw();

  const { rectHandleMouseDown, rectHandleMouseMove, rectHandleMouseUp} = useRectTool() || {};

  const { circleHandleMouseDown, circleHandleMouseMove, circleHandleMouseUp} = useCircleTool() || {};


  const { lineHandleMouseDown, lineHandleMouseMove, lineHandleMouseUp } = useLineTool() || {};


  const { handeHandleMouseDown, handHandleMouseMove } = useHandTool() || {};

  useEffect(() => {
    console.log("setting dimensions")

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

    console.log(toolRef.current)

    const handleMouseDown = (event: MouseEvent) => {

      if(toolRef.current == "rect" && rectHandleMouseDown) {
        rectHandleMouseDown(event);
      }

      if(toolRef.current == "circle" && circleHandleMouseDown) {
        circleHandleMouseDown(event);
      }
      console.log("donwn")
      console.log(lineHandleMouseDown)
      console.log("hello")
      if(toolRef.current == "line" && lineHandleMouseDown) {
        console.log("line tool called")
        lineHandleMouseDown(event);
      }

      if(toolRef.current == "hand" && handeHandleMouseDown) {
        handeHandleMouseDown(event );
      }

    };
    const handleMouseMove = (event: MouseEvent) => {

      if(toolRef.current == "rect" && rectHandleMouseMove) {
        rectHandleMouseMove(event)
      } 

      if(toolRef.current == "circle" && circleHandleMouseMove) {
        circleHandleMouseMove(event)
      } 

      if(toolRef.current == "line" && lineHandleMouseMove ) {
        lineHandleMouseMove(event)
      } 

      if(toolRef.current == "hand" && handHandleMouseMove) {
        handHandleMouseMove(event)
      } 
      // if(toolRef.current == "select" ) {
      //   handHandleMouseMove(event)
      // } 


      
    };

    const handleMouseUp = (event: MouseEvent) => {

      if(toolRef.current == "rect" && rectHandleMouseUp ) {
        rectHandleMouseUp(event);
      } 

      if(toolRef.current == "circle"  && circleHandleMouseUp) {
        circleHandleMouseUp(event)
      } 
      if(toolRef.current == "line" && lineHandleMouseUp ) {
        lineHandleMouseUp(event)
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
