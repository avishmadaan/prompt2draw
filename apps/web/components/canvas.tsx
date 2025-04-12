"use client";
import React, { useEffect, useRef } from "react";
import { useDraw } from "../hooks/useDraw";
import useRectTool from "../hooks/useRectTool";
import useCircleTool from "../hooks/useCircleTool";
import useLineTool from "../hooks/useLineTool";
import useHandTool from "../hooks/useHandTool";
import useSelectTool from "../hooks/useSelectTool";
import useErasorTool from "../hooks/useErasorTool";
import useTools from "../hooks/useTools";

const Canvas = () => {


  const {canvasRef, isDrawingRef, startPosRef, toolRef, colorRef, shiftPressed, shapesRef, zoomRef, offSet} = useDraw();


  const {setToolSelected, toolSelected} = useTools();

  const { rectHandleMouseDown, rectHandleMouseMove, rectHandleMouseUp} = useRectTool() || {};

  const { circleHandleMouseDown, circleHandleMouseMove, circleHandleMouseUp} = useCircleTool() || {};


  const { lineHandleMouseDown, lineHandleMouseMove, lineHandleMouseUp } = useLineTool() || {};


  const { handeHandleMouseDown, handHandleMouseMove } = useHandTool() || {};

  const { selectHandleMouseDown, selectHandleMouseMove , selectHandleMouseUp} = useSelectTool() || {};

  const { erasorHandleMouseDown, eraserHandleMouseMove} = useErasorTool() || {};


  const previousToolRef = useRef(toolSelected);

  useEffect(() => {
    console.log("setting dimensions")

    const canvas = canvasRef.current;

    if(canvas && canvasRef.current) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

       canvasRef.current.style.cursor= "crosshair"
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

      if(toolRef.current == "line" && lineHandleMouseDown) {

        lineHandleMouseDown(event);
      }

      if(toolRef.current == "hand" && handeHandleMouseDown) {
        handeHandleMouseDown(event );
      }
      if(toolRef.current == "select" && selectHandleMouseDown) {
        selectHandleMouseDown(event );
      }
      if(toolRef.current == "eraser" && erasorHandleMouseDown) {
        erasorHandleMouseDown(event );
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
      if(toolRef.current == "select" && selectHandleMouseMove) {
        selectHandleMouseMove(event)
      } 
      if(toolRef.current == "eraser" && eraserHandleMouseMove) {
        eraserHandleMouseMove(event)
      } 


      
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
      if(toolRef.current == "select" && selectHandleMouseUp ) {
        selectHandleMouseUp(event)
      }


      isDrawingRef.current = false;
      startPosRef.current = null;

    };


    const handleKeyDown = (event:KeyboardEvent) => {

      if(event.key =="Shift") {

        shiftPressed.current = true;
      }

      if(event.key ==" " && !event.repeat) {
        console.log("coming in if")
        previousToolRef.current =toolRef.current;
        setToolSelected("hand");
      }
    }
    
    const handleKeyUp = (event:KeyboardEvent) => {
      if(event.key =="Shift") {
        shiftPressed.current = false;
      }

      if(event.key ==" " ) {
        console.log("coming up")
        setToolSelected(previousToolRef.current);
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
      className={`inset-0 absolute w-full h-full    `}
    />
  );
};

export default Canvas;
